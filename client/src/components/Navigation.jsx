import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default class Navigation extends Component {
    render() {
        if (this.props.proceed === 'true') {
            return (
                <Navbar bg='danger' className='justify-content-between'>
                    <Button variant='dark' href={this.props.from}>Back</Button>
                    <Button variant='success' href={this.props.to}>Finish</Button>
                </Navbar>
            )
        } else if (this.props.proceed === 'false') {
            return (
                <Navbar bg='danger' className='justify-content-between'>
                    <Button variant='dark' href={this.props.from}>Back</Button>
                </Navbar>
            )
        }
    }
}