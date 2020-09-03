import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar bg='danger' className='justify-content-between' >
            <Button variant='dark' href='/'>Back</Button>

            <Button variant='success' href='#'>Generate Report</Button>
        </Navbar>
    )
}