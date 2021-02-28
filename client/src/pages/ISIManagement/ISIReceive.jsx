import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Modal,
	Button,
	InputGroup,
	FormControl,
	Navbar,
} from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

let missingBook = '';
let shipmentBooks = [];
let shipmentData = {
	shipment_id: '',
	date_received: '',
};

export default function ISIReceive() {
	let history = useHistory();

	// State for generic modal text
	const [genericModalText, setGenericModalText] = useState('');

	// Modal states and control functions.
	// const [shipmentIdModal, setShipmentIdModal] = useState(true);
	const [shipmentIdModal, setShipmentIdModal] = useState(() => {
		// Check if shipment data has been put into localStorage.
		if (localStorage.getItem('shipmentData') === null) {
			// If it his not, show the add shipment modal.
			return true;
		} else {
			// If it has, do not show the add shipment modal.
			return false;
		}
	});
	const closeShipmentIdModal = () => setShipmentIdModal(false);
	const openShipmentIdModal = () => setShipmentIdModal(true);

	const [genericModal, setGenericModal] = useState(false);
	const closeGenericModal = () => setGenericModal(false);
	const openGenericModal = () => setGenericModal(true);

	// Data picker state.
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Button loading state.
	const [addIsLoading, setAddIsLoading] = useState(false);

	// Row data state.
	const [rowData, setRowData] = useState([]);

	// Shipment modal needed state
	const [shipmentModalNeeded, setShipmentModalNeeded] = useState(false);

	// Ref for grid
	const gridApi = useRef();

	// Ref for isi number input field
	const isiInput = useRef(null);

	useEffect(() => {
		// Set page title
		document.title = 'Receive ISI - Mona';
		setRowData(shipmentBooks);
	}, []);

	const onGridReady = (params) => {
		gridApi.current = params.api;
		gridApi.current.sizeColumnsToFit();
		gridApi.current.setHeaderHeight(0);
	};

	const columnDefs = [
		{
			headerName: 'Book Number',
			field: 'book_number',
			valueFormatter: bookNumberFormatter,
		},
		{
			headerName: 'Ticket Value',
			field: 'ticket_value',
		},
		{
			headerName: 'Ticket Name',
			field: 'ticket_name',
		},
		{
			headerName: '',
			field: 'button_field',
			cellRenderer: 'cellControlButtons',
			cellStyle: { 'text-align': 'right' },
		},
	];

	const frameworkComponents = {
		cellControlButtons: cellControlButtons,
	};

	function cellControlButtons(props) {
		return (
			<span>
				<Button
					variant='outline-secondary'
					size='sm'
					onClick={() => {
						let bookNumber = gridApi.current.getDisplayedRowAtIndex(
							props.node.rowIndex
						).data.book_number;
						shipmentBooks = shipmentBooks.filter((item) => {
							return item.book_number !== bookNumber;
						});
						gridApi.current.setRowData(shipmentBooks);
					}}
				>
					Remove
				</Button>
			</span>
		);
	}

	function bookNumberFormatter(params) {
		return params.value.replace(/(\d{4})(\d{6})/, '$1-$2');
	}

	function proceedToReport() {
		if (shipmentBooks.length === 0) {
			setGenericModalText('No books have been entered.');
			openGenericModal();
		} else {
			localStorage.setItem(
				'shipmentBooks',
				JSON.stringify(shipmentBooks)
			);
			history.push('/isifunctions/isireceive/isireceivereport');
		}
	}

	function shipmentAdd() {
		if (selectedDate === null) {
			closeShipmentIdModal();
			setShipmentModalNeeded(true);
			setGenericModalText('No date provided');
			openGenericModal();
		} else if (shipmentData.shipment_id === '') {
			closeShipmentIdModal();
			setShipmentModalNeeded(true);
			setGenericModalText('No shipment ID provided');
			openGenericModal();
		} else {
			setAddIsLoading(true);
			shipmentData.date_received =
				selectedDate.getFullYear() +
				'-' +
				(selectedDate.getMonth() + 1) +
				'-' +
				selectedDate.getDate();

			axios
				.post('/api/shipment-details-upload', shipmentData)
				.then(() => {
					setShipmentIdModal(false);
					setAddIsLoading(false);
					localStorage.setItem(
						'shipmentData',
						JSON.stringify(shipmentData)
					);
					console.log(shipmentData);
				})
				.catch((err) => {
					if (err.response.data.err_type === 'already_exists') {
						closeShipmentIdModal();
						setShipmentModalNeeded(true);
						setGenericModalText(
							'Shipment ' +
								shipmentData.shipment_id +
								' has already been added.'
						);
						openGenericModal();
					}
				});
		}
	}

	// Ensure that only numbers are entered in corresponding input boxes
	function numberValidator(event) {
		let reg = /^[0-9]*$/;
		let val = reg.exec(event.target.value);

		if (val !== null) {
			event.target.value = val[0];
			shipmentData[event.target.name] = event.target.value;
		} else {
			event.target.value = shipmentData[event.target.name];
		}
	}

	function booksArrChecker(bookNumber) {
		for (let i = 0; i < shipmentBooks.length; i++) {
			if (shipmentBooks[i].book_number === bookNumber) {
				return true;
			} else {
				return false;
			}
		}
	}

	function gridSetter(bookNumber) {
		let gameNumReg = /^[0-9]{4}/;
		let gameNumVal = gameNumReg.exec(bookNumber);

		let bookNumReg = /^[0-9]{4}[0-9]{6}/;
		let bookNumVal = bookNumReg.exec(bookNumber);

		console.log(shipmentBooks);

		if (!booksArrChecker(bookNumber)) {
			if (gameNumVal !== null) {
				axios
					.get('/api/isi-game-details/' + gameNumVal[0])
					.then((res) => res.data.rows)
					.then((rows) =>
						rows.map((game) => {
							return {
								ticket_value: game.ticket_value,
								ticket_name: game.ticket_name,
							};
						})
					)
					.then((games) => {
						shipmentBooks.push({
							book_number: bookNumVal[0],
							ticket_name: games[0].ticket_name,
							ticket_value: games[0].ticket_value,
						});
						gridApi.current.setRowData(shipmentBooks);
					})
					.catch((err) => {
						if (err.response.data.err_type === 'not_exists') {
							missingBook = gameNumVal[0];
							setGenericModalText(
								'Game number ' +
									missingBook +
									' does not exist. Please add it into the system through the Manage page.'
							);
							openGenericModal();
						}
					});
			}
		} else {
			setGenericModalText(
				'Book ' + bookNumber + ' has already been entered.'
			);
			openGenericModal();
		}
	}

	return (
		<div>
			<Navbar bg='danger' className='justify-content-between' expand='lg'>
				<Button
					variant='dark'
					onClick={() => {
						shipmentData = {};
						shipmentBooks = [];
						localStorage.clear();
						history.push('/isifunctions');
					}}
				>
					Back
				</Button>
				<Button variant='success' onClick={proceedToReport}>
					Proceed
				</Button>
			</Navbar>

			{/* Modal for adding isi shipment */}
			<Modal
				show={shipmentIdModal}
				onHide={closeShipmentIdModal}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Enter Shipment Details</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>
						Please ensure that any new ISI games have been added
						into the system through the Manage page before receiving
						a shipment.
					</p>
					<InputGroup className='mb-3'>
						<InputGroup.Prepend>
							<InputGroup.Text>Received Date</InputGroup.Text>
						</InputGroup.Prepend>
						<DatePicker
							className='form-control'
							selected={selectedDate}
							dateFormat='dd/MM/yyyy'
							onChange={(date) => setSelectedDate(date)}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Prepend>
							<InputGroup.Text>Shipment ID</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type='text'
							onChange={numberValidator}
							name='shipment_id'
							defaultValue={shipmentData.shipment_id}
						/>
					</InputGroup>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => {
							shipmentData = {};
							shipmentBooks = [];
							localStorage.clear();
							history.push('/isifunctions');
						}}
					>
						Cancel
					</Button>
					<Button
						variant='success'
						onClick={!addIsLoading ? shipmentAdd : null}
					>
						{addIsLoading ? 'Adding...' : 'Add Shipment'}
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Generic single button modal */}
			<Modal
				show={genericModal}
				onHide={closeGenericModal}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Body>{genericModalText}</Modal.Body>

				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							closeGenericModal();
							setGenericModalText('');
							setAddIsLoading(false);
							if (shipmentModalNeeded === true) {
								openShipmentIdModal();
								setShipmentModalNeeded(false);
							}
						}}
					>
						Okay
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='enter-isi-book'>
				<InputGroup className='mb-3'>
					<InputGroup.Prepend>
						<InputGroup.Text>
							Scan / Enter ISI Book Number
						</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type='text'
						ref={isiInput}
						onKeyUp={(event) => {
							if (event.key === 'Enter') {
								gridSetter(isiInput.current.value);
								isiInput.current.value = '';
							}
						}}
					/>
					<InputGroup.Append>
						<Button
							onClick={() => {
								gridSetter(isiInput.current.value);
								isiInput.current.value = '';
							}}
							variant='outline-success'
						>
							Add
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>

			<div
				className='ag-theme-alpine'
				style={{
					width: '100%',
				}}
			>
				<AgGridReact
					domLayout={'autoHeight'}
					columnDefs={columnDefs}
					rowData={rowData}
					animateRows={true}
					onGridReady={onGridReady}
					gridOptions={{
						suppressNoRowsOverlay: true,
					}}
					frameworkComponents={frameworkComponents}
				></AgGridReact>
			</div>
		</div>
	);
}
