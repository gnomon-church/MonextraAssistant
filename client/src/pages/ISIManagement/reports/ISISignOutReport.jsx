import React, { useState } from 'react';
import { Button, Navbar, ButtonGroup, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import PrintTable from '../../../components/PrintTable';

let today = new Date();
let formattedDate =
	today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export default function PDFReport() {
	let history = useHistory();

	const [showSuccessDialog, setShowSuccessDialog] = useState(false);

	const closeSuccessDialog = () => setShowSuccessDialog(false);
	const openSuccessDialog = () => setShowSuccessDialog(true);

	let dataToPost = [];
	let tableData = [];

	let signOutBooks = JSON.parse(localStorage.getItem('signOutBooks'));

	let dataHeaders = ['NO.', 'NAME', 'SIGNED OUT'];

	let idReg = /^[0-9]{4}/;
	let bookReg = /^[0-9]{4}([0-9]{6})/;

	let totalCount = 0;

	for (let i = 0; i < signOutBooks.length; i++) {
		let gameID = idReg.exec(signOutBooks[i].book_number)[0];
		let bookNumber = bookReg.exec(signOutBooks[i].book_number)[1];
		let ticketValName =
			'$' +
			parseFloat(
				signOutBooks[i].ticket_value.replace(/\$|,/g, '')
			).toFixed() +
			' ' +
			signOutBooks[i].ticket_name;

		let arrIndex = tableData.findIndex(
			(element) => element.game_id === gameID
		);
		if (arrIndex === -1) {
			let count = 1;
			totalCount += 1;
			tableData.push({
				game_id: gameID,
				ticket_name: ticketValName,
				qty: count,
			});
		} else {
			let count = tableData[arrIndex].qty + 1;
			totalCount += 1;
			tableData[arrIndex].qty = count;
		}

		dataToPost[i] = { game_id: gameID, book_number: bookNumber };
	}

	tableData.sort((a, b) => (a.game_id > b.game_id ? 1 : -1));
	tableData.push({ game_id: '', ticket_name: 'TOTAL', qty: totalCount });

	function receiveShipment() {
		axios
			.post(
				'/api/sign-out-isi/?sign_out_date=' + formattedDate,
				dataToPost
			)
			.then(() => {
				openSuccessDialog();
				localStorage.clear();
			});
	}

	return (
		<div>
			<Navbar bg='danger' className='justify-content-between' expand='lg'>
				<Button
					variant='dark'
					onClick={() => history.push('/isifunctions/isisignout')}
				>
					Back
				</Button>
				<ButtonGroup className='mr-2'>
					<Button variant='secondary' onClick={() => window.print()}>
						Print
					</Button>
					<Button variant='success' onClick={() => receiveShipment()}>
						Sign Out Books
					</Button>
				</ButtonGroup>
			</Navbar>

			{/* Modal for confirming that a shipment has been added */}
			<Modal
				show={showSuccessDialog}
				onHide={closeSuccessDialog}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Body>Books successfully signed out.</Modal.Body>

				<Modal.Footer>
					<Button
						variant='danger'
						onClick={() => {
							closeSuccessDialog();
							localStorage.clear();
							history.push('/isifunctions');
						}}
					>
						Okay
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='print-content'>
				<h3 className='section-heading'>INSTANT SIGN OUT DETAIL</h3>
				<PrintTable data={tableData} headers={dataHeaders} />
			</div>
		</div>
	);
}
