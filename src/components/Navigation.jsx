import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { TestFunc } from '../pages/EODForm'

export default function Navigation() {
    return (
        <Navbar bg='danger' className='justify-content-between'>
            <Button variant='dark' href='/'>Back</Button>
            <Button variant='success' onClick={TestFunc}>Finish</Button>
        </Navbar>
    )
}