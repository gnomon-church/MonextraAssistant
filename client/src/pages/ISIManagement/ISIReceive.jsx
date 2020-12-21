import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { AgGridReact } from 'ag-grid-react';
// import axios from 'axios'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import Navigation from '../../components/Navigation'

export default function ISIReceive() {
    let history = useHistory()

    const [showShipmentIdDialog, setShowShipmentIdDialog] = useState(true);
    const [startDate, setStartDate] = useState(new Date());

    const closeShipmentIdDialog = () => setShowShipmentIdDialog(false);
    const openShipmentIdDialog = () => setShowShipmentIdDialog(true);

    useEffect(() => {
        document.title = 'Receive ISI - Mona';
    }, []);

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
                            <InputGroup.Text>Shipment ID</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type='text'
                            // onChange={}
                            name='ticket_name'
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