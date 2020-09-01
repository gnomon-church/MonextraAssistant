import React from 'react';
import { Accordion, Card, Form, FormGroup, InputGroup, FormControl, Button, OverlayTrigger, Tooltip, CardColumns } from 'react-bootstrap';

import Navigation from '../components/Navigation.jsx'
import './EODForm.css'

function EODForm() {
    const eft1 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Total of the first eftpos terminal
        </Tooltip>
    );

    const eft2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Total of the second eftpos terminal
        </Tooltip>
    );

    const eft3 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Total of the third eftpos terminal (if applicable)
        </Tooltip>
    );

    const eft4 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Total of any eftpos machines used after 6:30pm on the previous day
        </Tooltip>
    );

    const eft5 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Total of all terminals less the previous day (automatically calculated)
        </Tooltip>
    );

    const eft6 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Register eftpos figure
        </Tooltip>
    );

    const eft7 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Difference between total and register (automatically calculated)
        </Tooltip>
    );

    const epay1 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Actual figure from epay machine report
        </Tooltip>
    );

    const epay2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Register epay figure
        </Tooltip>
    );

    const epay3 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Difference between actual and register (automatically calculated)
        </Tooltip>
    );

    return (
        <div>
            <Navigation />

            <div className='main-content'>
                <Form>
                    <Form.Group controlId="basicDetails">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Store</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                <option value="0">Nextra Morayfield Plaza News</option>
                                <option value="1">Nextra Morayfield Village News</option>
                            </Form.Control>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Staff</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl />
                        </InputGroup>
                    </Form.Group>
                </Form>

                <Accordion>
                    {/* cash section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>CASH</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Payouts Used</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Put Aside</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$100's</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$50's</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$20's</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$10's</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$5's</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Coins</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Total</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Register</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Difference</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                </InputGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* eftpos section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <b>EFTPOS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Terminal 1</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft1}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Terminal 2</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft2}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Terminal 3</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft3}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Previous Day</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft4}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Total</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft5}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Register</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft6}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Difference</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                    <InputGroup.Append>
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={eft7}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* epay section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                            <b>EPAY</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Actual</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay1}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Register</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay2}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Difference</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay3}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* lotto section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                            <b>LOTTO</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Gross Sales</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay2}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Commission</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay2}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Net Sales</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay2}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Register</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={epay2}
                                    >
                                        <Button variant="outline-secondary">?</Button>
                                    </OverlayTrigger>
                                </InputGroup>
                                <hr />
                                <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Difference</InputGroup.Text>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl disabled />
                                        <OverlayTrigger
                                            placement="left"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={epay2}
                                        >
                                            <Button variant="outline-secondary">?</Button>
                                        </OverlayTrigger>
                                    </InputGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* scratchies section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="4">
                            <b>SCRATCHIES</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Difference</InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                </InputGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* lotto payouts section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="5">
                            <b>LOTTO PAYOUTS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* scratchies payouts section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="6">
                            <b>SCRATCHIE PAYOUTS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    )
}

export default EODForm;