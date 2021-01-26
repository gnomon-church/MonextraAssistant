import React, { useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

import Navigation from '../../components/Navigation'

export default function ISIReport() {
    useEffect(() => {
        document.title = 'ISI Reports - Mona';
    }, []);

    let history = useHistory();

    return (
        <div>
            <Navigation proceed='false' from='/isifunctions' />

            <div id='card-deck-set'>
                <CardDeck>
                    <Card onClick={() => { history.push(null) }} className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                        <Card.Body>
                            <Card.Text>Stock In Safe</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>

                <br />

                <CardDeck>
                    <Card onClick={() => { history.push(null) }} className='card-list' style={{ width: '18rem', cursor: "pointer" }}>
                        <Card.Body>
                        <Card.Text>Sales Data</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>

                <br />

            </div>
        </div>
    )
}