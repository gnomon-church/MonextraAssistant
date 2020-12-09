import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default class Navigation extends Component {
    render() {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' href='/'>Back</Button>
                <Button variant='success' href={this.props.href}>Finish</Button>
            </Navbar>
        )
    }
}