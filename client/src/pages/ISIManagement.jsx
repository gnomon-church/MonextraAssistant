import React, { Component, Link } from "react";
import { Card, CardDeck } from "react-bootstrap";

export default class ISIManagement extends Component {

    render() {
        return (
            <div id='card-deck-set'>
                <CardDeck>
                        <Card as='a' href='www.google.com' style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title>End of Day Form</Card.Title>
                                <Card.Text>
                                    Complete the End of Day report.
                            </Card.Text>

                            </Card.Body>
                        </Card>

                </CardDeck>
            </div>
        )
    }
}