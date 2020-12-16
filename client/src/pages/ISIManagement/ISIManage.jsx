import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Navigation from '../../components/Navigation'

export default function ISIManage() {
    const [rowData, setRowData] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);

    const gridApi = useRef()

    let new_book_data = {
        game_id: '',
        ticket_value: '',
        ticket_name: '',
        ticket_qty: '',
        current_game: true,
        book_value: ''
    }

    const handleCloseAddDialog = () => setShowAddDialog(false);
    const handleShowAddDialog = () => setShowAddDialog(true);

    useEffect(() => {
        document.title = 'Manage ISI Types - Mona';
        fetchData()
    }, []);

    function fetchData() {
        setRowData([])
        axios.get('/api/isi-game-types-download')
            .then((res) => (res.data.rows))
            .then((rows) =>
                rows.map((book) => {
                    return {
                        game_id: book.game_id,
                        ticket_value: book.ticket_value,
                        ticket_name: book.ticket_name,
                        book_value: book.book_value,
                        current_game: book.current_game,
                    };
                })
            )
            .then((books) => setRowData(books))
    }


    const columnDefs = [
        {
            headerName: "Game Number",
            field: "game_id",
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
            colId: 'params',
            cellRenderer: params => {
                return `<input type='checkbox' disabled ${params.value ? 'checked' : ''} />`;
            }
        },
        {
            headerName: "",
            field: "test_field",
            cellRenderer: 'cellControlButtons',
        }
    ];

    const frameworkComponents = {
        cellControlButtons: cellControlButtons,
    }

    // function getRowNodeId(rowData) {
    //     return rowData.game_id
    // }


    function cellControlButtons(props) {
        return (
            <span>
                <Button variant='outline-secondary' size='sm' onClick={() => editGame(props.node.rowIndex)}>Edit</Button>{' '}
                <Button variant='outline-secondary' size='sm' onClick={() => deleteGame(props.node.rowIndex)}>Delete</Button>
            </span>
        );
    }

    function deleteGame(rowIndex) {
        let rowValues = gridApi.current.getDisplayedRowAtIndex(rowIndex)
    }

    function editGame(rowIndex) {
        let rowValues = gridApi.current.getDisplayedRowAtIndex(rowIndex);
        console.log(rowValues.data)
    }

    function calculateBookValue() {
        new_book_data['book_value'] = new_book_data['ticket_value'] * new_book_data['ticket_qty']
    }

    function numberValidator(event) {
        let re = /^[0-9]*$/;
        let val = re.exec(event.target.value);

        if (val !== null) {
            event.target.value = val[0]
            new_book_data[event.target.name] = event.target.value
            calculateBookValue()
        } else {
            event.target.value = new_book_data[event.target.name]
        }
    }

    function valueUpdater(event) {
        new_book_data[event.target.name] = event.target.value;
    }

    function gameAdd() {
        // let params = {
        //     force: false,
        //     suppressFlash: false,
        // }

        axios.post('/api/isi-game-types-upload', new_book_data)
            .then(() => fetchData())
            // .then(() => handleCloseAddDialog())
        handleCloseAddDialog();
        // fetchData();
        
    }

    const onGridReady = (params) => {
        gridApi.current = params.api
        gridApi.current.sizeColumnsToFit();

    };

    return (
        <div>
            <Navigation proceed='false' from='/isimenu' />
            <Button variant="outline-danger" onClick={handleShowAddDialog}>Add ISI Game</Button>
            <Button variant="outline-danger" onClick={fetchData}>Refresh Grid</Button>

            {/* Modal for adding ISI books */}
            <Modal
                show={showAddDialog}
                onHide={handleCloseAddDialog}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Add ISI Game Type</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Game Number</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            onChange={numberValidator}
                            name='game_id'
                        />
                    </InputGroup>

                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Ticket Value</InputGroup.Text>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            onChange={numberValidator}
                            name='ticket_value'
                        />
                    </InputGroup>

                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Ticket Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            onChange={valueUpdater}
                            name='ticket_name'
                        />
                    </InputGroup>

                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Tickets per Book</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            onChange={numberValidator}
                            name='ticket_qty'
                        />
                    </InputGroup>

                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Current Game?</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Append>
                            <InputGroup.Checkbox defaultChecked='true'></InputGroup.Checkbox>
                        </InputGroup.Append>

                    </InputGroup>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddDialog}>Close</Button>
                    <Button variant="success" onClick={gameAdd}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for adding ISI books */}
            {/* <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Add ISI Game Type</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={gameAdd}>Delete</Button>
                </Modal.Footer>
            </Modal> */}

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
                    frameworkComponents={frameworkComponents}
                ></AgGridReact>
            </div>
        </div>
    )
}