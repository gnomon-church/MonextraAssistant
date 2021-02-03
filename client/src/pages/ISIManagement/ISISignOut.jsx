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
    const [genericModal, setGenericModal] = useState(false);
    const closeGenericModal = () => setGenericModal(false);
    const openGenericModal = () => setGenericModal(true);

    // Row data state.
    const [rowData, setRowData] = useState([]);

    // Ref for grid
    const gridApi = useRef();

    // Ref for isi number input field
    const isiInput = useRef(null);

    useEffect(() => {
        // Set page title
        document.title = 'Sign Out ISI - Mona';
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
        return params.value.replace(
            /(\d{4})(\d{6})(\d{3})(\d{1})/,
            '$1-$2-$3•$4'
        );
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

            localStorage.setItem(
                'dataHeaders',
                JSON.stringify(['NO.', 'NAME', 'RECEIVED'])
            );

            history.push('/isifunctions/isisignout/isireceivereport');
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
                        setGenericModalText(
                            'Game number ' +
                                missingBook +
                                ' does not exist. Please add it into the system through the Manage page.'
                        );
                        openGenericModal();
                    }
                });
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
