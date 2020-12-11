import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Navigation from '../../components/Navigation'

export default function ISIManage() {
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    useEffect(() => {
        document.title = 'Manage ISI Types - Mona';

        axios.get('/api/isi-book-types-download')
            .then((res) => (res.data.rows))
            .then((rows) =>
                rows.map((book) => {
                    return {
                        book_id: book.book_id,
                        ticket_value: book.ticket_value,
                        ticket_name: book.ticket_name,
                        book_value: book.book_value,
                        current_game: book.current_game,
                    };
                })
            )
            .then((books) => setRowData(books))
    }, []);

    const columnDefs = [
        {
            headerName: "Book Number",
            field: "book_id",
        },
        {
            headerName: "Ticket Value",
            field: "ticket_value",
        },
        {
            headerName: "Ticket Name",
            field: "ticket_name",
        },
        {
            headerName: "Book Value",
            field: "book_value",
        },
        {
            headerName: "Current Game?",
            field: "current_game",
        },
    ];

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };



    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />

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
                    rowData={rowData}
                    animateRows={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    )
}