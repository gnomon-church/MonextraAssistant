import React, { Component } from 'react';
import { Accordion, Card, Form, InputGroup, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Navigation from '../components/Navigation.jsx'
import './EODForm.css'

let jsonData = '{"store": "",\
        "date": "",\
        "staff": "",\
        "used payouts": "",\
        "put aside": "",\
        "100": "",\
        "50": "",\
        "20": "",\
        "10": "",\
        "5": "",\
        "coins": "",\
        "cash actual": "",\
        "cash register": "",\
        "cash diff": "",\
        "eftpos 1": "",\
        "eftpos 2": "",\
        "eftpos 3": "",\
        "eftpos prev": "",\
        "eftpos actual": "",\
        "eftpos diff": "",\
        "epay actual": "",\
        "epay register": "",\
        "epay diff": "",\
        "lotto gross": "",\
        "isi commission": "",\
        "isi net": "",\
        "lotto actual": "",\
        "lotto register": "",\
        "lotto diff": "",\
        "isi diff": "",\
        "total prizes": "",\
        "isi cash": "",\
        "lotto pay actual": "",\
        "lotto pay register": "",\
        "lotto pay diff": "",\
        "isi free": "",\
        "isi pay actual": "",\
        "isi pay register": "",\
        "isi pay diff": ""}';
let dataObj = JSON.parse(jsonData);

function calculator() {
    dataObj['cash actual'] = Number(dataObj['used payouts']) + 
                                Number(dataObj['put aside']) + 
                                Number(dataObj['100']) + 
                                Number(dataObj['50']) + 
                                Number(dataObj['20']) + 
                                Number(dataObj['10']) + 
                                Number(dataObj['5']) + 
                                Number(dataObj['coins'])
}

function numberParse(event) {
    let re = /^[0-9]*[\.]*[0-9]{0,2}$/;
    let val = re.exec(event.target.value);

    if (val !== null) {
        event.target.value = val[0];
        handleChange(event);
    } else {
        event.target.value = dataObj[event.target.name]
    }
}

function handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    dataObj[fieldName] = fieldVal
    calculator()
    console.log(dataObj['cash actual'])
}


const InputHelp = (props) => {
    return (
        <InputGroup className='mb-3'>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.label}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text'
                name={props.fieldName}
                onChange={numberParse.bind(this)}
            />
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

const InputHelpDisabled = (props) => {
    return (
        <InputGroup className='mb-3'>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.label}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled
                placeholder='temp placeholder'
            />
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

const InputNoHelp = (props) => {
    return (
        <InputGroup className='mb-3'>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.label}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl type='text'
                name={props.fieldName}
                onChange={numberParse.bind(this)}
            />
        </InputGroup>
    )
}

const InputNoHelpDisabled = (props) => {
    return (
        <InputGroup className='mb-3'>
            <InputGroup.Prepend>
                <InputGroup.Text>{props.label}</InputGroup.Text>
                <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl disabled
                placeholder={props.data}
            />
        </InputGroup>
    )
}

export default class EODForm extends Component {
    state = {
        
    }

    render() {
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
                                    name='staff'
                                    onChange={handleChange.bind(this)}
                                    as='select'
                                    className='mr-sm-2'
                                    id='inlineFormCustomSelect'
                                    custom
                                >
                                    <option value='Nextra Morayfield Plaza News'>Nextra Morayfield Plaza News</option>
                                    <option value='Nextra Morayfield Village News'>Nextra Morayfield Village News</option>
                                </Form.Control>
                            </InputGroup>

                            <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Date</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type='text'
                                    name='date'
                                    onChange={handleChange.bind(this)}
                                />
                            </InputGroup>

                            <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Staff</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type='text'
                                    name='staff'
                                    onChange={handleChange.bind(this)}
                                />
                            </InputGroup>

                            {/* <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Test Input Box</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type='text'
                                    name='username'
                                    placeholder='enter'
                                    defaultValue='Test'
                                    onChange={this.handleChange.bind(this)} />
                            </InputGroup>
                            <Button onClick={this.anotherTestFunc}>Test</Button> */}
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
                                    <InputHelp label='Payouts Used' tooltip='Payout money used (if any)' fieldName='used payouts' />
                                    <InputHelp label='Put Aside' tooltip='Money put aside for payouts / money put in safe (if any)' fieldName='put aside' />
                                    <InputNoHelp label="$100's" fieldName='100' />
                                    <InputNoHelp label="$50's" fieldName='50' />
                                    <InputNoHelp label="$20's" fieldName='20' />
                                    <InputNoHelp label="$10's" fieldName='10' />
                                    <InputNoHelp label="$5's" fieldName='5' />
                                    <InputNoHelp label='Coins' fieldName='coins' />
                                    <InputNoHelpDisabled label='Total' fieldName='cash actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Cash in drawer figure from register' fieldName='cash register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='cash diff' data={dataObj['cash actual']} />
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
                                    <InputHelp label='Terminal 1' tooltip='Total of the first eftpos terminal' fieldName='eftpos 1' />
                                    <InputHelp label='Terminal 2' tooltip='Total of the second eftpos terminal' fieldName='eftpos 2' />
                                    <InputHelp label='Terminal 3' tooltip='Total of the third eftpos terminal (if applicable)' fieldName='eftpos 3' />
                                    <InputHelp label='Previous Day' tooltip='Total of any eftpos machines used after 6:30pm on the previous day' fieldName='eftpos prev' />
                                    <InputNoHelpDisabled label='Total' fieldName='eftpos actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Eftpos figure from the register' fieldName='eftpos register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='eftpos diff' />
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
                                    <InputHelp label='Actual' tooltip='Actual figure from epay terminal report' fieldName='epay actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Epay figure from the register' fieldName='epay register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='epay diff' />
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
                                    <InputHelp label='Gross Sales' tooltip='Gross sales figure from the lotto report' fieldName='lotto gross' />
                                    <InputHelp label='ISI Commission' tooltip='Instants commission figure from the lotto report' fieldName='isi commission' />
                                    <InputHelp label='ISI Net Sales' tooltip='Instants net sales figure from the lotto report' fieldName='isi net' />
                                    <InputNoHelpDisabled label='Total' fieldName='lotto actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Lotto sales figure from the register' fieldName='lotto register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='lotto diff' />
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
                                    <InputHelp label='Difference' tooltip='Difference between ISI c/o less sales, and ISI count' fieldName='isi diff' />
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
                                    <InputHelp label='Total Prizes Paid' tooltip='Total prizes paid figure from the lotto report' fieldName='total prizes' />
                                    <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isi cash' />
                                    <InputNoHelpDisabled label='Total' fieldName='lotto pay actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Lotto payouts figure from the register' fieldName='lotto pay register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='lotto pay diff' />
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
                                    <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isi cash' />
                                    <InputHelp label='Total Free Instants' tooltip='Total free instants figure from the lotto report' fieldName='isi free' />
                                    <InputNoHelpDisabled label='Total' fieldName='isi pay actual' />
                                    <hr />
                                    <InputHelp label='Register' tooltip='Instant Scratch-It figure from the register' fieldName='isi pay register' />
                                    <hr />
                                    <InputNoHelpDisabled label='Difference' fieldName='isi pay diff' />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        )
    }
}