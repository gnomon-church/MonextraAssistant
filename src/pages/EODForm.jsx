import React from 'react';
import { Accordion, Card, Form, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Navigation from '../components/Navigation.jsx'
import './EODForm.css'

export function TestFunc() {
    // let testVar = 'test';
    console.log(EODForm.inputTest.value);
}

function EODForm() {
    function InputHelp(props) {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl />
                <InputGroup.Append>
                    <OverlayTrigger
                        placement='left'
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip id='button-tooltip' {...props}>
                                {props.tooltip}
                            </Tooltip>
                        }
                    >
                        <Button variant='outline-secondary'>?</Button>
                    </OverlayTrigger>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    function InputHelpDisabled(props) {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl disabled/>
                <InputGroup.Append>
                    <OverlayTrigger
                        placement='left'
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip id='button-tooltip' {...props}>
                                {props.tooltip}
                            </Tooltip>
                        }
                    >
                        <Button variant='outline-secondary'>?</Button>
                    </OverlayTrigger>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    function InputNoHelp(props) {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl />
            </InputGroup>
        )
    }

    function InputNoHelpDisabled(props) {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl disabled />
            </InputGroup>
        )
    }

    function anotherTestFunc() {
        console.log(this.inputTest.value);
    }


    const InputFieldHelp = ({inputText, popupVar, inputRef, ...props}) =>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{inputText}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl {...props} inputRef={inputRef} />
            <InputGroup.Append>
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={popupVar}
                >
                    <Button variant="outline-secondary">?</Button>
                </OverlayTrigger>
            </InputGroup.Append>
        </InputGroup>

    const InputFieldNoHelp = ({inputText, inputRef, ...props}) =>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text>{inputText}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl {...props} inputRef={inputRef} />
        </InputGroup>

    function testFunction() {
        console.log('button worked')
        console.log(this.inputTest.value)
    }

    return (
        <div>
            <div className='fixed-top'>
                <Navigation />
            </div>

            <div className='main-content'>
                <Form>
                    <Form.Group controlId='basicDetails'>
                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>Store</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                custom
                            >
                                <option value='0'>Nextra Morayfield Plaza News</option>
                                <option value='1'>Nextra Morayfield Village News</option>
                            </Form.Control>
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>Staff</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl/>
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>Test Input Box</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl inputRef={(input) => this.inputTest = input} />
                        </InputGroup>
                        <Button onClick={anotherTestFunc}>Test</Button>
                    </Form.Group>
                </Form>

                <Accordion>
                    {/* cash section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='0'>
                            <b>CASH</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body>
                                <InputHelp label='Payouts Used' tooltip='Payout money used (if any)' />
                                <InputHelp label='Put Aside' tooltip='Money put aside for payouts / money put in safe (if any)' />
                                <InputNoHelp label="$100's"/>
                                <InputNoHelp label="$50's"/>
                                <InputNoHelp label="$20's"/>
                                <InputNoHelp label="$10's"/>
                                <InputNoHelp label="$5's"/>
                                <InputNoHelp label='Coins' />
                                <InputNoHelpDisabled label='Total' />       
                                <hr />
                                <InputHelp label='Register' tooltip='Cash in drawer figure from register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* eftpos section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='1'>
                            <b>EFTPOS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='1'>
                            <Card.Body>
                                <InputHelp label='Terminal 1' tooltip='Total of the first eftpos terminal' />
                                <InputHelp label='Terminal 2' tooltip='Total of the second eftpos terminal' />
                                <InputHelp label='Terminal 3' tooltip='Total of the third eftpos terminal (if applicable)' />
                                <InputHelp label='Previous Day' tooltip='Total of any eftpos machines used after 6:30pm on the previous day' />
                                <InputNoHelpDisabled label='Total' />
                                <hr />
                                <InputHelp label='Register' tooltip='Eftpos figure from the register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* epay section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='2'>
                            <b>EPAY</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='2'>
                            <Card.Body>
                                <InputHelp label='Actual' tooltip='Actual figure from epay terminal report' />
                                <hr />
                                <InputHelp label='Register' tooltip='Epay figure from the register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* lotto section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='3'>
                            <b>LOTTO</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='3'>
                            <Card.Body>
                                <InputHelp label='Gross Sales' tooltip='Gross sales figure from the lotto report' />
                                <InputHelp label='ISI Commission' tooltip='Instants commission figure from the lotto report' />
                                <InputHelp label='ISI Net Sales' tooltip='Instants net sales figure from the lotto report' />
                                <InputNoHelpDisabled label='Total'/>
                                <hr />
                                <InputHelp label='Register' tooltip='Lotto sales figure from the register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference'/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* scratchies section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='4'>
                            <b>INSTANT SCRATCH-ITS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='4'>
                            <Card.Body>
                                <InputHelp label='Difference' tooltip='Difference between ISI c/o less sales, and ISI count' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* lotto payouts section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='5'>
                            <b>LOTTO PAYOUTS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='5'>
                            <Card.Body>
                                <InputHelp label='Total Prizes Paid' tooltip='Total prizes paid figure from the lotto report' />
                                <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' />
                                <InputNoHelpDisabled label='Total' />
                                <hr />
                                <InputHelp label='Register' tooltip='Lotto payouts figure from the register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>

                    {/* scratchies payouts section */}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey='6'>
                            <b>SCRATCHIE PAYOUTS</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='6'>
                            <Card.Body>
                                <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' />
                                <InputHelp label='Total Free Instants' tooltip='Total free instants figure from the lotto report' />
                                <InputNoHelpDisabled label='Total' />
                                <hr />
                                <InputHelp label='Register' tooltip='Instant Scratch-It figure from the register' />
                                <hr />
                                <InputNoHelpDisabled label='Difference' />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    )
}

export default EODForm;