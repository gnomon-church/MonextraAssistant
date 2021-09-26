import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import * as AxiosMutations from "../../helpers/AxiosMutations";
import * as AxiosQueries from "../../helpers/AxiosQueries";
import * as ECs from "../../helpers/ErrorCodes";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import Navigation from "../../components/Navigation";

export default function ISIManage() {
	const [rowData, setRowData] = useState([]);
	const [addIsLoading, setAddIsLoading] = useState(true);
	const [rowIndexToUse, setRowIndexToUse] = useState(null);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [showDelDialog, setShowDelDialog] = useState(false);

	// State for new game
	const [gameEditData, setGameEditData] = useState({
		game_id: null,
		ticket_value: null,
		ticket_name: null,
		book_value: null,
		current_game: true,
	});

	const gridApi = useRef();

	const closeAddDialog = () => setShowAddDialog(false);
	const openAddDialog = () => setShowAddDialog(true);

	const closeDelDialog = () => setShowDelDialog(false);
	const openDelDialog = () => setShowDelDialog(true);

	const onGridReady = (params) => {
		gridApi.current = params.api;
		gridApi.current.sizeColumnsToFit();
	};

	// Define the columns for the ag-grid
	const columnDefs = [
		{
			headerName: "Game Number",
			field: "game_id",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			floatingFilter: true,
			filter: true,
			headerTooltip: "ISI game Number",
		},
		{
			headerName: "Ticket Value",
			field: "ticket_value",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			headerTooltip: "ISI ticket Value",
		},
		{
			headerName: "Ticket Name",
			field: "ticket_name",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			floatingFilter: true,
			filter: true,
			headerTooltip: "ISI ticket name",
		},
		{
			headerName: "Book Value",
			field: "book_value",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			headerTooltip: "ISI book value",
		},
		{
			headerName: "Current Game?",
			field: "current_game",
			colId: "params",
			cellRenderer: (params) => {
				return `<input type='checkbox' disabled ${
					params.value ? "checked" : ""
				} />`;
			},
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			headerTooltip: "Is this a current ISI game?",
		},
		{
			headerName: "",
			field: "button_field",
			cellRenderer: "cellControlButtons",
			cellStyle: { "text-align": "right" },
			suppressMovable: true,
		},
	];

	const frameworkComponents = {
		cellControlButtons: cellControlButtons,
	};

	useEffect(() => {
		document.title = "Manage ISI Types - Mona";
		fetchData();
	}, []);

	// Get data from the API and set it
	function fetchData() {
		axios(AxiosQueries.allGameTypes())
			.then((res) => res.data)
			.then((rows) => {
				if (rows.data === null) {
					alert(ECs.Errors[rows.errors[0].message]);
				} else {
					return rows.data.gameTypes.map((book) => {
						return {
							game_id: book.game_id,
							ticket_value: book.ticket_value,
							ticket_name: book.ticket_name,
							book_value: book.book_value,
							current_game: book.current_game,
						};
					});
				}
			})
			.then((books) => setRowData(books))
			.then(() => gridApi.current.hideOverlay())
			.then(() => setAddIsLoading(false));
	}

	// Render the edit and delete buttons in each cell
	function cellControlButtons(props) {
		return (
			<span>
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={() => {
						let data = gridApi.current.getDisplayedRowAtIndex(
							props.node.rowIndex
						).data;
						gameEditData.game_id = data.game_id;
						gameEditData.ticket_value = data.ticket_value;
						gameEditData.book_value = data.book_value;
						gameEditData.ticket_name = data.ticket_name;
						gameEditData.current_game = data.current_game;
						setGameEditData({ ...gameEditData });
						openAddDialog();
					}}
				>
					Edit
				</Button>{" "}
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={() => {
						setRowIndexToUse(props.node.rowIndex);
						openDelDialog();
					}}
				>
					Delete
				</Button>
			</span>
		);
	}

	// Delete an existing game type
	function gameDelete() {
		closeDelDialog();
		setAddIsLoading(true);
		gridApi.current.showLoadingOverlay();
		axios(
			AxiosMutations.removeGameType(
				gridApi.current.getDisplayedRowAtIndex(rowIndexToUse).data.game_id
			)
		)
			.then((res) => res.data)
			.then((rows) => {
				if (rows.data === null) {
					alert(ECs.Errors[rows.errors[0].message]);
				} else {
					console.log("Success!");
				}
			})
			.then(() => fetchData())
			.then(() => setRowIndexToUse(null));
	}

	// Add a new game type
	function gameAdd() {
		closeAddDialog();
		setAddIsLoading(true);
		gridApi.current.showLoadingOverlay();
		gameEditData.ticket_name = gameEditData.ticket_name.toUpperCase();
		setGameEditData({ ...gameEditData });
		axios(AxiosMutations.createGameType(gameEditData))
			.then(() => fetchData())
			.then(() => {
				gameEditData.game_id = null;
				gameEditData.ticket_value = null;
				gameEditData.book_value = null;
				gameEditData.ticket_name = null;
				gameEditData.current_game = true;
				setGameEditData({ ...gameEditData });
			});
	}

	// Check in real-time that data entered is numeric only
	function numberValidator(event) {
		let re = /^[0-9]*$/;
		let val = re.exec(event.target.value);

		if (val !== null) {
			event.target.value = val[0];
			gameEditData[event.target.name] = event.target.value;
			setGameEditData({ ...gameEditData });
		} else {
			event.target.value = gameEditData[event.target.name];
		}
	}

	function valueUpdater(event) {
		gameEditData[event.target.name] = event.target.value;
		setGameEditData({ ...gameEditData });
	}

	function toggleCurrentGame(event) {
		gameEditData["current_game"] = event.target.checked;
		setGameEditData({ ...gameEditData });
	}

	const GameData = () => {
		if (rowIndexToUse !== null) {
			return (
				<span>
					<i>
						{
							gridApi.current.getDisplayedRowAtIndex(rowIndexToUse).data
								.ticket_value
						}{" "}
						{
							gridApi.current.getDisplayedRowAtIndex(rowIndexToUse).data
								.ticket_name
						}{" "}
						(
						{gridApi.current.getDisplayedRowAtIndex(rowIndexToUse).data.game_id}
						)
					</i>
				</span>
			);
		} else {
			return <span>UNKOWN</span>;
		}
	};

	return (
		<div>
			<Navigation proceed="false" from="/isimenu" />
			<div className="add-isi-button">
				<Button
					variant="outline-danger"
					onClick={!addIsLoading ? openAddDialog : null}
				>
					{addIsLoading ? "Loading..." : "Add ISI Game"}
				</Button>
			</div>

			{/* Modal for adding ISI books */}
			<Modal
				show={showAddDialog}
				onHide={closeAddDialog}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>ISI Game Details</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Game Number</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type="text"
							onChange={numberValidator}
							name="game_id"
							placeholder={gameEditData.game_id}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Ticket Value</InputGroup.Text>
							<InputGroup.Text>$</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type="text"
							onChange={numberValidator}
							name="ticket_value"
							defaultValue={gameEditData.ticket_value}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Book Value</InputGroup.Text>
							<InputGroup.Text>$</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type="text"
							onChange={numberValidator}
							name="book_value"
							defaultValue={gameEditData.book_value}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Ticket Name</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type="text"
							onChange={valueUpdater}
							name="ticket_name"
							defaultValue={gameEditData.ticket_name}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text>Current Game?</InputGroup.Text>
						</InputGroup.Prepend>
						<InputGroup.Append>
							<InputGroup.Checkbox
								defaultChecked={gameEditData.current_game}
								onChange={(event) => toggleCurrentGame(event)}
							></InputGroup.Checkbox>
						</InputGroup.Append>
					</InputGroup>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							gameEditData.game_id = null;
							gameEditData.ticket_value = null;
							gameEditData.book_value = null;
							gameEditData.ticket_name = null;
							gameEditData.current_game = true;
							setGameEditData({ ...gameEditData });
							closeAddDialog();
						}}
					>
						Close
					</Button>
					<Button variant="success" onClick={gameAdd}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal for deleting ISI books */}
			<Modal
				show={showDelDialog}
				onHide={closeDelDialog}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Delete Game?</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Are you sure you want to delete the <GameData /> game?
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={closeDelDialog}>
						Cancel
					</Button>
					<Button variant="danger" onClick={gameDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>

			<div
				className="ag-theme-alpine"
				style={{
					width: "100%",
				}}
			>
				<AgGridReact
					domLayout={"autoHeight"}
					columnDefs={columnDefs}
					defaultColDef={{
						sortable: true,
					}}
					gridOptions={{
						suppressNoRowsOverlay: true,
					}}
					rowData={rowData}
					animateRows={true}
					onGridReady={onGridReady}
					frameworkComponents={frameworkComponents}
				></AgGridReact>
			</div>
		</div>
	);
}
