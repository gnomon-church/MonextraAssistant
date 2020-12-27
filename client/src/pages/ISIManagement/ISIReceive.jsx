import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { AgGridReact } from 'ag-grid-react';
// import axios from 'axios'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Navigation from '../../components/Navigation'

let shipment_data = {
    shipment_id: '',
    date_received: '',
}

export default function ISIReceive() {
    let history = useHistory()

    const [showShipmentIdDialog, setShowShipmentIdDialog] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const closeShipmentIdDialog = () => setShowShipmentIdDialog(false);
    const openShipmentIdDialog = () => setShowShipmentIdDialog(true);

    useEffect(() => {
        document.title = 'Receive ISI - Mona';
    }, []);

    // Ensure that only numbers are entered in corresponding input boxes
    function numberValidator(event) {
        let re = /^[0-9]*$/;
        let val = re.exec(event.target.value);

        if (val !== null) {
            event.target.value = val[0]
            shipment_data[event.target.name] = event.target.value
        } else {
            event.target.value = shipment_data[event.target.name]
        }
    }

    return (
        <div>
            <Navigation proceed='true' from='/isimenu' label='Receive Shipment' />

            {/* Modal for deleting ISI books */}
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
                        // customInput={
                        //     <div>
                        //     <FormControl type='text'
                        //         value={selectedDate}
                        //         name='date'
                        //     />
                        //     </div>
                        // } 
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
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => history.push('/isimenu')}>Cancel</Button>
                    <Button variant="danger" /* onClick={ } */>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}