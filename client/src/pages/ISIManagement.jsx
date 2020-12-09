import React, { Component, Link } from "react";
import { Card, CardDeck } from "react-bootstrap";

import Navigation from '../components/Navigation'

import '../styles/central_styles.css';
import '../styles/ISIManagement.css';

export default class ISIManagement extends Component {

    render() {
        return (
            <div>
                <Navigation proceed='false' from='/' />
                <div id='card-deck-set'>
                    <CardDeck>
                        <Card as='a' href='www.google.com' className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>Receive</Card.Title>
                                <Card.Text>
                                    Receive shipments of ISI books.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br />

                    <CardDeck>
                        <Card as='a' href='www.google.com' className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>Sign Out</Card.Title>
                                <Card.Text>
                                    Sign ISI books out of the safe
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br />

                    <CardDeck>
                        <Card as='a' href='www.google.com' className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>Reports</Card.Title>
                                <Card.Text>
                                    Generate and view various ISI reports
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br />

                    <CardDeck>
                        <Card as='a' href='www.google.com' className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>Manage</Card.Title>
                                <Card.Text>
                                    Manage ISI book types
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </CardDeck>
                </div>
            </div>
        )
    }
}