import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar bg='danger'>
            <Button variant='dark' href='/'>Back</Button>
        </Navbar>
    )
}