import React, { Component } from 'react';
import { Accordion, Card, Form, InputGroup, FormControl, Button, OverlayTrigger, Tooltip, Navbar } from 'react-bootstrap';
import axios from 'axios'

import './EODForm.css'

let date = new Date()
let today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

export default class EODForm extends Component {
    state = {
        store: "",
        date: today,
        staff: "",
        usedPayouts: 0.00,
        putAside: 0.00,
        hundreds: 0.00,
        fifties: 0.00,
        twenties: 0.00,
        tens: 0.00,
        fives: 0.00,
        coins: 0.00,
        cashActual: 0.00,
        cashRegister: 0.00,
        cashDiff: 0.00,
        eftposOne: 0.00,
        eftposTwo: 0.00,
        eftposThree: 0.00,
        eftposPrev: 0.00,
        eftposActual: 0.00,
        eftposRegister: 0.00,
        eftposDiff: 0.00,
        epayActual: 0.00,
        epayRegister: 0.00,
        epayDiff: 0.00,
        lottoGross: 0.00,
        isiCommission: 0.00,
        isiNet: 0.00,
        lottoActual: 0.00,
        lottoRegister: 0.00,
        lottoDiff: 0.00,
        isiDiff: 0.00,
        totalPrizes: 0.00,
        isiCash: 0.00,
        lottoPayActual: 0.00,
        lottoPayRegister: 0.00,
        lottoPayDiff: 0.00,
        isiFree: 0.00,
        isiPayActual: 0.00,
        isiPayRegister: 0.00,
        isiPayDiff: 0.00,
        totalDiff: 0.00
    }

    calculator() {
        let cashActual_var = (Number(this.state['putAside']) +
            Number(this.state['hundreds']) +
            Number(this.state['fifties']) +
            Number(this.state['twenties']) +
            Number(this.state['tens']) +
            Number(this.state['fives']) +
            Number(this.state['coins']) -
            Number(this.state['usedPayouts'])).toFixed(2)
        let eftposActual_var = ((Number(this.state['eftposOne']) +
            Number(this.state['eftposTwo']) +
            Number(this.state['eftposThree'])) -
            Number(this.state['eftposPrev'])).toFixed(2)
        let lottoActual_var = (Number(this.state['lottoGross']) -
            Number(this.state['isiNet']) -
            Number(this.state['isiCommission'])).toFixed(2)
        let lottoPayActual_var = (Number(this.state['totalPrizes']) - Number(this.state['isiCash'])).toFixed(2)
        let isiPayActual_var = (Number(this.state['isiFree']) + Number(this.state['isiCash'])).toFixed(2)

        this.setState({
            cashActual: cashActual_var,
            eftposActual: eftposActual_var,
            lottoActual: lottoActual_var,
            lottoPayActual: lottoPayActual_var,
            isiPayActual: isiPayActual_var,

        }, () => {
            let cashDiff_var = (Number(this.state['cashActual']) - Number(this.state['cashRegister'])).toFixed(2)
            let eftposDiff_var = (Number(this.state['eftposActual']) - Number(this.state['eftposRegister'])).toFixed(2)
            let epayDiff_var = (Number(this.state['epayRegister']) - Number(this.state['epayActual'])).toFixed(2)
            let lottoDiff_var = (Number(this.state['lottoRegister']) - Number(this.state['lottoActual'])).toFixed(2)
            let lottoPayDiff_var = (Number(this.state['lottoPayActual']) - Number(this.state['lottoPayRegister'])).toFixed(2)
            let isiPayDiff_var = (Number(this.state['isiPayActual']) - Number(this.state['isiPayRegister'])).toFixed(2)

            this.setState({
                cashDiff: cashDiff_var,
                eftposDiff: eftposDiff_var,
                epayDiff: epayDiff_var,
                lottoDiff: lottoDiff_var,
                lottoPayDiff: lottoPayDiff_var,
                isiPayDiff: isiPayDiff_var
            }, () => {
                let totalDiff_var = (((Number(this.state['cashActual']) + Number(this.state['eftposActual']) + Number(this.state['isiPayActual']) + Number(this.state['lottoPayActual'])) - (Number(this.state['cashRegister']) + Number(this.state['eftposRegister']) + Number(this.state['isiPayRegister']) + Number(this.state['lottoPayRegister']))) + Number(this.state['epayDiff']) + Number(this.state['isiDiff']) + Number(this.state['lottoDiff'])).toFixed(2)

                this.setState({
                    totalDiff: totalDiff_var
                })
            })
        })
    }

    numberParse(event) {
        let re = /^-?[0-9]*[.]*[0-9]{0,2}$/;
        let val = re.exec(event.target.value);

        if (val !== null) {
            event.target.value = val[0];
            this.handleChange(event);
        } else {
            event.target.value = this.state[event.target.name]
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.calculator();
        })
    }

    viewReport = () => {
        axios.post('/api/figures-upload', this.state)

        localStorage.date = this.state.date;
        localStorage.store = this.state.store;

        let download_url = '/api/figures-download/' + this.state.store + '/' + this.state.date

        axios.get(download_url)
            .then((res) => console.log(res.data.rows)); 
    }

    Navigation = (props) => {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' href='/'>Back</Button>
                <Button /* href='/reportview' */ onClick={this.viewReport} variant='success'>Finish</Button>
            </Navbar>
        )
    }

    InputHelp = (props) => {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='text'
                    placeholder={props.data}
                    name={props.fieldName}
                    onChange={this.numberParse.bind(this)}
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
                        <Button variant='outline-secondary' tabIndex="-1">?</Button>
                    </OverlayTrigger>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    InputHelpDisabled = (props) => {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl disabled
                    placeholder={props.data}
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
                        <Button variant='outline-secondary' tabIndex="-1">?</Button>
                    </OverlayTrigger>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    InputNoHelp = (props) => {
        return (
            <InputGroup className='mb-3'>
                <InputGroup.Prepend>
                    <InputGroup.Text>{props.label}</InputGroup.Text>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl type='text'
                    name={props.fieldName}
                    onChange={this.numberParse.bind(this)}
                    placeholder={props.data}
                />
            </InputGroup>
        )
    }

    InputNoHelpDisabled = (props) => {
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

    render() {
        return (
            <div>
                <div className='fixed-top'>
                    <this.Navigation />
                </div>

                <div className='main-content'>
                    <Form>
                        <Form.Group controlId='basicDetails'>
                            <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Store</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    name='store'
                                    onChange={this.handleChange.bind(this)}
                                    as='select'
                                    className='mr-sm-2'
                                    id='inlineFormCustomSelect'
                                    custom
                                >
                                    <option>Select...</option>
                                    <option value='Plaza'>Nextra Morayfield Plaza News</option>
                                    <option value='Village'>Nextra Morayfield Village News</option>
                                </Form.Control>
                            </InputGroup>

                            <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Date</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type='text'
                                    placeholder={this.state['date']}
                                    name='date'
                                    onChange={this.handleChange.bind(this)}
                                />
                            </InputGroup>

                            <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id='basic-addon1'>Staff</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type='text'
                                    name='staff'
                                    placeholder={this.state.staff}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </InputGroup>
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
                                    <this.InputHelp label='Payouts Used' tooltip='Payout money used (if any)' fieldName='usedPayouts' />
                                    <this.InputHelp label='Put Aside' tooltip='Money put aside for payouts / money put in safe (if any)' fieldName='putAside' />
                                    <this.InputNoHelp label="$100's" fieldName='hundreds' />
                                    <this.InputNoHelp label="$50's" fieldName='fifties' />
                                    <this.InputNoHelp label="$20's" fieldName='twenties' />
                                    <this.InputNoHelp label="$10's" fieldName='tens' />
                                    <this.InputNoHelp label="$5's" fieldName='fives' />
                                    <this.InputNoHelp label='Coins' fieldName='coins' />
                                    <this.InputNoHelpDisabled label='Total' fieldName='cashActual' data={this.state.cashActual} />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Cash in drawer figure from register' fieldName='cashRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='cashDiff' data={this.state.cashDiff} />
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
                                    <this.InputHelp label='Terminal 1' tooltip='Total of the first eftpos terminal' fieldName='eftposOne' />
                                    <this.InputHelp label='Terminal 2' tooltip='Total of the second eftpos terminal' fieldName='eftposTwo' />
                                    <this.InputHelp label='Terminal 3' tooltip='Total of the third eftpos terminal (if applicable)' fieldName='eftposThree' />
                                    <this.InputHelp label='Previous Day' tooltip='Total of any eftpos machines used after 6:30pm on the previous day' fieldName='eftposPrev' />
                                    <this.InputNoHelpDisabled label='Total' fieldName='eftposActual' data={this.state.eftposActual} />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Eftpos figure from the register' fieldName='eftposRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='eftposDiff' data={this.state.eftposDiff} />
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
                                    <this.InputHelp label='Actual' tooltip='Actual figure from epay terminal report' fieldName='epayActual' />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Epay figure from the register' fieldName='epayRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='epayDiff' data={this.state.epayDiff} />
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
                                    <this.InputHelp label='Gross Sales' tooltip='Gross sales figure from the lotto report' fieldName='lottoGross' />
                                    <this.InputHelp label='ISI Commission' tooltip='Instants commission figure from the lotto report' fieldName='isiCommission' />
                                    <this.InputHelp label='ISI Net Sales' tooltip='Instants net sales figure from the lotto report' fieldName='isiNet' />
                                    <this.InputNoHelpDisabled label='Total' fieldName='lottoActual' data={this.state.lottoActual} />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Lotto sales figure from the register' fieldName='lottoRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='lottoDiff' data={this.state.lottoDiff} />
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
                                    <this.InputHelp label='Difference' tooltip='Difference between ISI c/o less sales, and ISI count' fieldName='isiDiff' />
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
                                    <this.InputHelp label='Total Prizes Paid' tooltip='Total prizes paid figure from the lotto report' fieldName='totalPrizes' />
                                    <this.InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isiCash' data={this.state.isiCash} />
                                    <this.InputNoHelpDisabled label='Total' fieldName='lottoPayActual' data={this.state.lottoPayActual} />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Lotto payouts figure from the register' fieldName='lottoPayRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='lottoPayDiff' data={this.state.lottoPayDiff} />
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
                                    <this.InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isiCash' data={this.state.isiCash} />
                                    <this.InputHelp label='Total Free Instants' tooltip='Total free instants figure from the lotto report' fieldName='isiFree' />
                                    <this.InputNoHelpDisabled label='Total' fieldName='isiPayActual' data={this.state.isiPayActual} />
                                    <hr />
                                    <this.InputHelp label='Register' tooltip='Instant Scratch-It figure from the register' fieldName='isiPayRegister' />
                                    <hr />
                                    <this.InputNoHelpDisabled label='Difference' fieldName='isiPayDiff' data={this.state.isiPayDiff} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                    <hr />

                    <InputGroup className='mb-3'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Total Under / Over</InputGroup.Text>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl disabled
                            placeholder={this.state.totalDiff}
                        />
                    </InputGroup>
                </div>
            </div>
        )
    }
}