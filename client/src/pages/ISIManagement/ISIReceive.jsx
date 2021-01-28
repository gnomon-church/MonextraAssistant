import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
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

    // Modal control states.
    const [showShipmentIdDialog, setShowShipmentIdDialog] = useState(() => {
        // Check if shipment data has been put into localStorage.
        if (localStorage.getItem('shipmentData') === null) {
            // If it his not, show the add shipment dialog.
            return true;
        } else {
            // If it has, do not show the add shipment dialog.
            return false;
        }
    });
    const [showExistsDialog, setShowExistsDialog] = useState(false);
    const [showNotExistsDialog, setShowNotExistsDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    // Modal control functions.
    const closeShipmentIdDialog = () => setShowShipmentIdDialog(false);
    const openShipmentIdDialog = () => setShowShipmentIdDialog(true);
    const closeExistsDialog = () => setShowExistsDialog(false);
    const openExistsDialog = () => setShowExistsDialog(true);
    const closeNotExistsDialog = () => setShowNotExistsDialog(false);
    const openNotExistsDialog = () => setShowNotExistsDialog(true);
    const closeSuccessDialog = () => setShowSuccessDialog(false);
    const openSuccessDialog = () => setShowSuccessDialog(true);

    // Data picker state.
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Button loading state.
    const [addIsLoading, setAddIsLoading] = useState(false);

    // Row data state.
    const [rowData, setRowData] = useState([]);

    // Ref for grid
    const gridApi = useRef();

    // Ref for isi number input field
    const isiInput = useRef(null);

    useEffect(() => {
        // Set page title
        document.title = 'Receive ISI - Mona';
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
        return params.value.replace(
            /(\d{4})(\d{6})(\d{3})(\d{1})/,
            '$1-$2-$3•$4'
        );
    }

    function proceedToReport() {
        localStorage.setItem('shipmentData', JSON.stringify(shipmentData));
        localStorage.setItem('shipmentBooks', JSON.stringify(shipmentBooks));

        localStorage.setItem(
            'dataHeaders',
            JSON.stringify(['NO.', 'NAME', 'RECEIVED'])
        );

        history.push('/isifunctions/isisignout/isireceivereport');
    }

    function shipmentAdd() {
        if (selectedDate === null) {
            alert('No date provided');
        } else if (shipmentData.shipment_id === '') {
            alert('No shipment ID provided');
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
                .then(() => setShowShipmentIdDialog(false))
                .then(() => setAddIsLoading(false))
                // .then(shipmentData.shipment_id = '')
                .catch((err) => {
                    if (err.response.data.err_type === 'already_exists') {
                        closeShipmentIdDialog();
                        openExistsDialog();
                    }
                });
        }
    }

    // Ensure that only numbers are entered in corresponding input boxes
    function numberValidator(event) {
        let re = /^[0-9]*$/;
        let val = re.exec(event.target.value);

        if (val !== null) {
            event.target.value = val[0];
            shipmentData[event.target.name] = event.target.value;
        } else {
            event.target.value = shipmentData[event.target.name];
        }
    }

    function gridSetter(bookNumber) {
        let reg = /^[0-9]{4}/;
        let val = reg.exec(bookNumber);

        if (val !== null) {
            axios
                .get('/api/isi-game-details/' + val[0])
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
                        book_number: bookNumber,
                        ticket_name: games[0].ticket_name,
                        ticket_value: games[0].ticket_value,
                    });
                    gridApi.current.setRowData(shipmentBooks);
                })
                .catch((err) => {
                    if (err.response.data.err_type === 'not_exists') {
                        missingBook = val[0];
                        openNotExistsDialog();
                    }
                });
        }
    }

    const messageDialog = (props) => {
        return (
            <div>
                {/* Generic single button modal */}
                <Modal
                    show={showSuccessDialog}
                    onHide={closeSuccessDialog}
                    backdrop='static'
                    keyboard={false}
                >
                    <Modal.Body>
                        Shipment <i>{shipmentData.shipment_id}</i> has been
                        received successfully
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant='danger'
                            onClick={() => {
                                closeSuccessDialog();
                                history.push('/isifunctions');
                            }}
                        >
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };

    return (
        <div>
            <Navbar bg='danger' className='justify-content-between' expand='lg'>
                <Button
                    variant='dark'
                    onClick={() => {
                        shipmentData.shipment_id = '';
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
                show={showShipmentIdDialog}
                onHide={closeShipmentIdDialog}
                backdrop='static'
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
                            shipmentData.shipment_id = '';
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

            {/* Modal for shipment that already exists */}
            <Modal
                show={showExistsDialog}
                onHide={closeExistsDialog}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Body>
                    Shipment <i>{shipmentData.shipment_id}</i> has already been
                    added.
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            closeExistsDialog();
                            openShipmentIdDialog();
                            setAddIsLoading(false);
                        }}
                    >
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for game that does not exist */}
            <Modal
                show={showNotExistsDialog}
                onHide={closeNotExistsDialog}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Body>
                    Game number <i>{missingBook}</i> does not exist. Please add
                    it into the system through the <b>Manage</b> page.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' onClick={closeNotExistsDialog}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for shipment received successfully */}
            <Modal
                show={showSuccessDialog}
                onHide={closeSuccessDialog}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Body>
                    Shipment <i>{shipmentData.shipment_id}</i> has been received
                    successfully
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={() => {
                            closeSuccessDialog();
                            history.push('/isifunctions');
                        }}
                    >
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for shipment received successfully */}
            <Modal
                show={showSuccessDialog}
                onHide={closeSuccessDialog}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Body>
                    Shipment <i>{shipmentData.shipment_id}</i> has been received
                    successfully
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={() => {
                            closeSuccessDialog();
                            history.push('/isifunctions');
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
