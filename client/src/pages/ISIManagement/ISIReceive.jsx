import React, { useEffect, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl, Navbar } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

let bookToAdd = '';
let missingBook = ''
let shipmentBooks = [];
let shipmentData = {
    shipment_id: '',
    date_received: '',
};

export default function ISIReceive() {
    let history = useHistory()

    // CHANGE ME BACK TO TRUE FOR ACTUAL PRODUCTION
    const [showShipmentIdDialog, setShowShipmentIdDialog] = useState(false);
    const [showExistsDialog, setShowExistsDialog] = useState(false);
    const [showNotExistsDialog, setShowNotExistsDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addIsLoading, setAddIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);

    // const [isiInput, setIsiInput] = useState();

    const gridApi = useRef();
    const isiInput = useRef(null);

    const closeShipmentIdDialog = () => setShowShipmentIdDialog(false);
    const openShipmentIdDialog = () => setShowShipmentIdDialog(true);
    const closeExistsDialog = () => setShowExistsDialog(false);
    const openExistsDialog = () => setShowExistsDialog(true);
    const closeNotExistsDialog = () => setShowNotExistsDialog(false);
    const openNotExistsDialog = () => setShowNotExistsDialog(true);
    const closeSuccessDialog = () => setShowSuccessDialog(false);
    const openSuccessDialog = () => setShowSuccessDialog(true);

    useEffect(() => {
        document.title = 'Receive ISI - Mona';
    }, []);

    const onGridReady = (params) => {
        gridApi.current = params.api
        gridApi.current.sizeColumnsToFit();
        gridApi.current.setHeaderHeight(0);
    };

    const columnDefs = [
        {
            headerName: "Book Number",
            field: "book_number",
            valueFormatter: bookNumberFormatter,
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
            headerName: "",
            field: "button_field",
            cellRenderer: 'cellControlButtons',
            cellStyle: { 'text-align': 'right' }
        }
    ];

    const frameworkComponents = {
        cellControlButtons: cellControlButtons,
    };

    function cellControlButtons(props) {
        return (
            <span>
                <Button variant='outline-secondary' size='sm' onClick={() => {
                    let bookNumber = gridApi.current.getDisplayedRowAtIndex(props.node.rowIndex).data.book_number;
                    shipmentBooks = shipmentBooks.filter((item) => {
                        return item.book_number !== bookNumber
                    })
                    gridApi.current.setRowData(shipmentBooks);
                }}
                >Remove</Button>
            </span>
        );
    }

    function bookNumberFormatter(params) {
        return params.value.replace(/(\d{4})(\d{6})(\d{3})(\d{1})/, "$1-$2-$3•$4")
    }

    function receiveShipment() {
        let idReg = /^[0-9]{4}/;
        let bookReg = /^[0-9]{4}([0-9]{6})/;

        let dataToPost = []

        for (let i = 0; i < shipmentBooks.length; i++) {
            let gameID = idReg.exec(shipmentBooks[i].book_number)[0]
            let bookNumber = bookReg.exec(shipmentBooks[i].book_number)[1]

            dataToPost[i] = { game_id: gameID, book_number: bookNumber }
        }

        axios.post('/api/receive-isi-shipment/?shipment_id=' + shipmentData.shipment_id, dataToPost)
            .then(() => openSuccessDialog())
            .then(() => {
                shipmentData = {};
                shipmentBooks = [];
            })
    }

    function shipmentAdd() {
        setAddIsLoading(true);
        shipmentData['date_received'] = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();
        axios.post('/api/shipment-details-upload', shipmentData)
            .then(() => setShowShipmentIdDialog(false))
            .then(() => setAddIsLoading(false))
            // .then(shipmentData.shipment_id = '')
            .catch((err) => {
                if (err.response.data.err_type === 'already_exists') {
                    closeShipmentIdDialog()
                    openExistsDialog()
                }
            })
    }

    // Ensure that only numbers are entered in corresponding input boxes
    function numberValidator(event) {
        let re = /^[0-9]*$/;
        let val = re.exec(event.target.value);

        if (val !== null) {
            event.target.value = val[0]
            shipmentData[event.target.name] = event.target.value
        } else {
            event.target.value = shipmentData[event.target.name]
        }
    }

    function gridSetter(bookNumber) {
        let reg = /^[0-9]{4}/;
        let val = reg.exec(bookNumber);

        if (val !== null) {
            axios.get('/api/isi-game-details/' + val[0])
                .then((res) => (res.data.rows))
                .then((rows) =>
                    rows.map((game) => {
                        return {
                            ticket_value: game.ticket_value,
                            ticket_name: game.ticket_name,
                        };
                    })
                )
                .then((games) => {
                    shipmentBooks.push({ book_number: bookNumber, ticket_name: games[0].ticket_name, ticket_value: games[0].ticket_value });
                    gridApi.current.setRowData(shipmentBooks);
                })
                .catch((err) => {
                    if (err.response.data.err_type === 'not_exists') {
                        missingBook = val[0];
                        openNotExistsDialog();
                    }
                })
        }
    }

    return (
        <div>
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' onClick={() => { history.push('/isimenu') }}>Back</Button>
                <Button variant='success' onClick={receiveShipment}>Receive Shipment</Button>
            </Navbar>

            {/* Modal for adding isi shipment */}
            <Modal
                show={showShipmentIdDialog}
                onHide={closeShipmentIdDialog}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter Shipment Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Received Date</InputGroup.Text>
                        </InputGroup.Prepend>
                        <DatePicker
                            className='form-control'
                            selected={selectedDate}
                            dateFormat='dd/MM/yyyy'
                            onChange={(date) => (setSelectedDate(date))}
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
                    <Button variant="secondary" onClick={() => {
                        shipmentData.shipment_id = ''
                        history.push('/isimenu')
                    }}>Cancel</Button>
                    <Button variant="danger" onClick={!addIsLoading ? shipmentAdd : null}>{addIsLoading ? 'Adding...' : 'Add Shipment'}</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for shipment that already exists */}
            <Modal
                show={showExistsDialog}
                onHide={closeExistsDialog}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Shipment <i>{shipmentData.shipment_id}</i> has already been added. Would you like to edit this shipment instead?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        closeExistsDialog();
                        openShipmentIdDialog();
                        setAddIsLoading(false);
                    }}>Cancel</Button>
                    <Button variant="danger" onClick={closeExistsDialog}>Edit</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for game that does not exist */}
            <Modal
                show={showNotExistsDialog}
                onHide={closeNotExistsDialog}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Game number <i>{missingBook}</i> does not exist. Please add it into the system through the <b>Manage</b> page.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={closeNotExistsDialog}>Okay</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for shipment received successfully */}
            <Modal
                show={showSuccessDialog}
                onHide={closeSuccessDialog}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    Shipment <i>{shipmentData.shipment_id}</i> has been received successfully
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={() => {
                        closeSuccessDialog();
                        history.push('/isimenu')
                    }}>Okay</Button>
                </Modal.Footer>
            </Modal>

            <div className='enter-isi-book'>
                <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Scan / Enter ISI Book Number</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type='text'
                        ref={isiInput}
                        onKeyUp={(event) => {
                            console.log(isiInput.current.value)
                            if (event.key === 'Enter') {
                                gridSetter(isiInput.current.value)
                                isiInput.current.value = ''
                            }
                        }}
                    />
                    <InputGroup.Append>
                        <Button onClick={() => {
                            gridSetter(isiInput.current.value);
                            isiInput.current.value = ''
                        }} variant="outline-success">Add</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>

            <div
                className="ag-theme-alpine"
                style={{
                    width: "100%",
                }}
            >
                <AgGridReact
                    domLayout={"autoHeight"}
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
    )
}