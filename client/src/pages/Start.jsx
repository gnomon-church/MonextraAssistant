import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { Card, CardDeck } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

export default function Start() {
    useEffect(() => {
        document.title = 'Home - Mona';
    }, []);

    let history = useHistory();

    return (
        <div id='card-deck-set'>
            {/* <CardDeck>
                    <Card as='a' href='/eodform' className='card-list' style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>End of Day Form</Card.Title>
                            <Card.Text>
                                Complete the End of Day report.
                        </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card as='a' href='' className='card-list' style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Access Previous EOD</Card.Title>
                            <Card.Text>
                                This is not yet a working function, please do not try to use it!
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>

                <br /> */}

            <CardDeck>
                <Card onClick={() => {history.push('/isifunctions')}} className='card-list' style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>ISI Management</Card.Title>
                        <Card.Text>
                            Manage the ISI stock.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>


        </div>
    );
}