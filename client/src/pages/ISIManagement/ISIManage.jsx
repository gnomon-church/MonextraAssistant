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
import UpdateGameModal from "../../components/UpdateGameModal";

export default function ISIManage() {
	const [rowData, setRowData] = useState([]);
	const [addIsLoading, setAddIsLoading] = useState(true);
	const [rowIndexToUse, setRowIndexToUse] = useState(null);

	// State for new game
	const [gameEditData, setGameEditData] = useState({
		game_id: null,
		ticket_value: null,
		ticket_name: null,
		book_value: null,
		current_game: true,
	});

	const gridApi = useRef();

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
			headerTooltip: "ISI game number",
		},
		{
			headerName: "Ticket Value",
			field: "ticket_value",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			headerTooltip: "ISI ticket value",
			valueFormatter: (params) => {
				return "$" + params.value;
			},
		},
		{
			headerName: "Game Name",
			field: "game_name",
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			floatingFilter: true,
			filter: true,
			headerTooltip: "ISI ticket name",
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
			headerName: "Promo Game?",
			field: "promo_game",
			colId: "params",
			cellRenderer: (params) => {
				return `<input type='checkbox' disabled ${
					params.value ? "checked" : ""
				} />`;
			},
			cellStyle: { "text-align": "center" },
			suppressMovable: true,
			headerTooltip: "Is this a promotional ISI game?",
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
							game_name: book.game_name,
							current_game: book.current_game,
							promo_game: book.promo_game,
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
					}}
				>
					Edit
				</Button>{" "}
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={() => {
						setRowIndexToUse(props.node.rowIndex);
					}}
				>
					Delete
				</Button>
			</span>
		);
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
			{/* Page navigation bar */}
			<Navigation proceed="false" from="/isimenu" />
			<div className="add-isi-button">
				<Button
					variant="outline-danger"
					// onClick={!addIsLoading ? openAddDialog : null}
				>
					{addIsLoading ? "Loading..." : "Add ISI Game"}
				</Button>
			</div>

			{/* AG Grid */}
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
