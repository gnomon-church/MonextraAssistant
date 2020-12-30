import React, { useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Navigation from '../../components/Navigation'

let shipmentData = {
    shipment_id: '',
    date_received: '',
};

let bookToAdd = '';

let shipmentBooks = [];

export default function ISIReceive() {
    let history = useHistory()

    // CHANGE ME BACK TO TRUE FOR ACTUAL PRODUCTION
    const [showShipmentIdDialog, setShowShipmentIdDialog] = useState(false);
    const [showExistsDialog, setShowExistsDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [addIsLoading, setAddIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);

    const gridApi = useRef()

    const closeShipmentIdDialog = () => setShowShipmentIdDialog(false);
    const openShipmentIdDialog = () => setShowShipmentIdDialog(true);
    const closeExistsDialog = () => setShowExistsDialog(false);
    const openExistsDialog = () => setShowExistsDialog(true);

    useEffect(() => {
        document.title = 'Receive ISI - Mona';
    }, []);

    const onGridReady = (params) => {
        gridApi.current = params.api
        gridApi.current.sizeColumnsToFit();
        // gridApi.current.setHeaderHeight(0);
    };

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
        }
    ];

    function shipmentAdd() {
        setAddIsLoading(true);
        shipmentData['date_received'] = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();
        axios.post('/api/shipment-details-upload', shipmentData)
            .then(() => setShowShipmentIdDialog(false))
            .then(() => setAddIsLoading(false))
            .then(shipmentData.shipment_id = '')
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

    async function bookArrayPusher(bookNumber) {
        shipmentBooks.push({ game_id: bookNumber })
    }

    function gridSetter(bookNumber) {
        bookArrayPusher(bookNumber)
            .then(() => gridApi.current.setRowData(shipmentBooks))
    }

    return (
        <div>
            <Navigation proceed='true' from='/isimenu' label='Receive Shipment' />

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

            <div className='enter-isi-book'>
                <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Scan / Enter ISI Book Number</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type='text'
                        onKeyUp={(event) => {
                            bookToAdd = event.target.value
                            if (event.key === 'Enter') {
                                gridSetter(bookToAdd)
                            }
                        }}
                    />
                    <InputGroup.Append>
                        <Button onClick={() => gridSetter(bookToAdd)} variant="outline-success">Add</Button>
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
                ></AgGridReact>
            </div>
        </div>
    )
}