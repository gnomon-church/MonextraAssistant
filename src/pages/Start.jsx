import React, { Component } from 'react';
import { Card, CardDeck, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Start.css'

export default class Start extends Component {
    render() {
        return (
            <div id='card-deck-set'>
                <CardDeck>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>End of Day Form</Card.Title>
                            <Card.Text>
                                Use this form the complete the End of Day
                        </Card.Text>
                            <Button href='/eodform' variant="danger">Begin!</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>ISI Reconciliation Form</Card.Title>
                            <Card.Text>
                                This is not yet a working function, please do not try to use it!
                        </Card.Text>
                            <Button variant="danger" disabled>Begin!</Button>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}