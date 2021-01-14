import React from 'react';
import { Button, Navbar, ButtonGroup } from 'react-bootstrap';

import PrintTable from '../components/PrintTable'

export default function PDFReport() {
    let tableData = JSON.parse(localStorage.getItem('dataToReport'));
    let tableHeaders = JSON.parse(localStorage.getItem('dataHeaders'))

    return (
        <div>
            <Navbar bg='danger' className='justify-content-between' expand='lg'>
                <Button variant='dark' onClick={null}>Back</Button>
                <ButtonGroup className="mr-2">
                    <Button variant='secondary' onClick={() => window.print()}>Print</Button>
                    <Button variant='success' onClick={null}>Receive Shipment</Button>
                </ButtonGroup>
            </Navbar>

            <div className="print-content">
                <h3 className='section-heading'>INSTANT ORDER DETAIL</h3>
                <PrintTable data={tableData} headers={tableHeaders} />
            </div>
        </div>
    )
}