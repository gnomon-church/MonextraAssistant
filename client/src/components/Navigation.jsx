import React from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Button } from 'react-bootstrap';

export default function Navigation(props) {

    let history = useHistory();

    if (props.proceed === 'true') {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' onClick={() => {history.push(props.from)}}>Back</Button>
                <Button variant='success' onClick={() => {history.push(props.to)}}>Finish</Button>
            </Navbar>
        )
    } else if (props.proceed === 'false') {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' onClick={() => {history.push(props.from)}}>Back</Button>
            </Navbar>
        )
    }
}