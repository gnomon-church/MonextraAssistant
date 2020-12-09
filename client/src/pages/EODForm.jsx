// import React from 'react';
// import { Accordion, Card, Form, InputGroup, FormControl, Button, OverlayTrigger, Tooltip, Navbar } from 'react-bootstrap';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';

// import "react-datepicker/dist/react-datepicker.css";

// import '../styles/style.css';

// let date = new Date();
// let today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

// var figures = {
//     store: "",
//     date: today,
//     staff: "",
//     usedPayouts: 0.00,
//     putAside: 0.00,
//     hundreds: 0.00,
//     fifties: 0.00,
//     twenties: 0.00,
//     tens: 0.00,
//     fives: 0.00,
//     coins: 0.00,
//     cashActual: 0.00,
//     cashRegister: 0.00,
//     cashDiff: 0.00,
//     eftposOne: 0.00,
//     eftposTwo: 0.00,
//     eftposThree: 0.00,
//     eftposPrev: 0.00,
//     eftposActual: 0.00,
//     eftposRegister: 0.00,
//     eftposDiff: 0.00,
//     epayActual: 0.00,
//     epayRegister: 0.00,
//     epayDiff: 0.00,
//     lottoGross: 0.00,
//     isiCommission: 0.00,
//     isiNet: 0.00,
//     lottoActual: 0.00,
//     lottoRegister: 0.00,
//     lottoDiff: 0.00,
//     isiDiff: 0.00,
//     totalPrizes: 0.00,
//     isiCash: 0.00,
//     lottoPayActual: 0.00,
//     lottoPayRegister: 0.00,
//     lottoPayDiff: 0.00,
//     isiFree: 0.00,
//     isiPayActual: 0.00,
//     isiPayRegister: 0.00,
//     isiPayDiff: 0.00,
//     totalDiff: 0.00
// };


// export default function EODForm() {
//     // constructor(props) {
//     //     super(props);
//     //     state = {
//     //         startDate: today,
//     //         datePickerIsOpen: false,
//     //     };
//     //     dateSet = dateSet.bind(this)
//     //     openDatePicker = openDatePicker.bind(this);
//     // }


//     function calculator() {
//         let cashActual_var = (Number(figures['putAside']) +
//             Number(figures['hundreds']) +
//             Number(figures['fifties']) +
//             Number(figures['twenties']) +
//             Number(figures['tens']) +
//             Number(figures['fives']) +
//             Number(figures['coins']) -
//             Number(figures['usedPayouts'])).toFixed(2)
//         let eftposActual_var = ((Number(figures['eftposOne']) +
//             Number(figures['eftposTwo']) +
//             Number(figures['eftposThree'])) -
//             Number(figures['eftposPrev'])).toFixed(2)
//         let lottoActual_var = (Number(figures['lottoGross']) -
//             Number(figures['isiNet']) -
//             Number(figures['isiCommission'])).toFixed(2)
//         let lottoPayActual_var = (Number(figures['totalPrizes']) - Number(figures['isiCash'])).toFixed(2)
//         let isiPayActual_var = (Number(figures['isiFree']) + Number(figures['isiCash'])).toFixed(2)



//         let cashDiff_var = (Number(figures['cashActual']) - Number(figures['cashRegister'])).toFixed(2)
//         let eftposDiff_var = (Number(figures['eftposActual']) - Number(figures['eftposRegister'])).toFixed(2)
//         let epayDiff_var = (Number(figures['epayRegister']) - Number(figures['epayActual'])).toFixed(2)
//         let lottoDiff_var = (Number(figures['lottoRegister']) - Number(figures['lottoActual'])).toFixed(2)
//         let lottoPayDiff_var = (Number(figures['lottoPayActual']) - Number(figures['lottoPayRegister'])).toFixed(2)
//         let isiPayDiff_var = (Number(figures['isiPayActual']) - Number(figures['isiPayRegister'])).toFixed(2)


//         let totalDiff_var = (((Number(figures['cashActual']) + Number(figures['eftposActual']) + Number(figures['isiPayActual']) + Number(figures['lottoPayActual'])) - (Number(figures['cashRegister']) + Number(figures['eftposRegister']) + Number(figures['isiPayRegister']) + Number(figures['lottoPayRegister']))) + Number(figures['epayDiff']) + Number(figures['isiDiff']) + Number(figures['lottoDiff'])).toFixed(2)


//         figures.cashActual = cashActual_var;
//         figures.eftposActual = eftposActual_var;
//         figures.lottoActual = lottoActual_var;
//         figures.lottoPayActual = lottoPayActual_var;
//         figures.isiPayActual = isiPayActual_var;

//         figures.cashDiff = cashDiff_var;
//         figures.eftposDiff = eftposDiff_var;
//         figures.epayDiff = epayDiff_var;
//         figures.lottoDiff = lottoDiff_var;
//         figures.lottoPayDiff = lottoPayDiff_var;
//         figures.isiPayDiff = isiPayDiff_var;

//         figures.totalDiff = totalDiff_var;

//     }

//     function numberParse(event) {
//         let re = /^-?[0-9]*[.]*[0-9]{0,2}$/;
//         let val = re.exec(event.target.value);

//         if (val !== null) {
//             event.target.value = val[0];
//             handleChange(event);
//         } else {
//             event.target.value = figures[event.target.name]
//         }
//     }

//     function handleChange(event) {
//         setState({ [event.target.name]: event.target.value }, () => {
//             calculator();
//         })
//     }

//     function viewReport() {
//         axios.post('/api/figures-upload', figures)

//         localStorage.date = figures.date;
//         localStorage.store = figures.store;

//         let download_url = '/api/figures-download/' + figures.store + '/' + figures.date

//         // axios.get(download_url)
//         //     .then((res) => console.log(res.data.rows)); 
//     }

//     const Navigation = (props) => {
//         return (
//             <Navbar bg='danger' className='justify-content-between'>
//                 <Button variant='dark' href='/'>Back</Button>
//                 <Button /* href='/reportview' */ onClick={viewReport} variant='success'>Finish</Button>
//             </Navbar>
//         )
//     }

//     const InputHelp = (props) => {
//         return (
//             <InputGroup className='mb-3'>
//                 <InputGroup.Prepend>
//                     <InputGroup.Text>{props.label}</InputGroup.Text>
//                     <InputGroup.Text>$</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <FormControl type='text'
//                     placeholder={props.data}
//                     name={props.fieldName}
//                     onChange={numberParse.bind(this)}
//                 />
//                 <InputGroup.Append>
//                     <OverlayTrigger
//                         placement='left'
//                         delay={{ show: 250, hide: 400 }}
//                         overlay={
//                             <Tooltip id='button-tooltip' {...props}>
//                                 {props.tooltip}
//                             </Tooltip>
//                         }
//                     >
//                         <Button variant='outline-secondary' tabIndex="-1">?</Button>
//                     </OverlayTrigger>
//                 </InputGroup.Append>
//             </InputGroup>
//         )
//     }

//     const InputHelpDisabled = (props) => {
//         return (
//             <InputGroup className='mb-3'>
//                 <InputGroup.Prepend>
//                     <InputGroup.Text>{props.label}</InputGroup.Text>
//                     <InputGroup.Text>$</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <FormControl disabled
//                     placeholder={props.data}
//                 />
//                 <InputGroup.Append>
//                     <OverlayTrigger
//                         placement='left'
//                         delay={{ show: 250, hide: 400 }}
//                         overlay={
//                             <Tooltip id='button-tooltip' {...props}>
//                                 {props.tooltip}
//                             </Tooltip>
//                         }
//                     >
//                         <Button variant='outline-secondary' tabIndex="-1">?</Button>
//                     </OverlayTrigger>
//                 </InputGroup.Append>
//             </InputGroup>
//         )
//     }

//     const InputNoHelp = (props) => {
//         return (
//             <InputGroup className='mb-3'>
//                 <InputGroup.Prepend>
//                     <InputGroup.Text>{props.label}</InputGroup.Text>
//                     <InputGroup.Text>$</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <FormControl type='text'
//                     name={props.fieldName}
//                     onChange={numberParse.bind(this)}
//                     placeholder={props.data}
//                 />
//             </InputGroup>
//         )
//     }

//     const InputNoHelpDisabled = (props) => {
//         return (
//             <InputGroup className='mb-3'>
//                 <InputGroup.Prepend>
//                     <InputGroup.Text>{props.label}</InputGroup.Text>
//                     <InputGroup.Text>$</InputGroup.Text>
//                 </InputGroup.Prepend>
//                 <FormControl disabled
//                     placeholder={props.data}
//                 />
//             </InputGroup>
//         )
//     };

//     function dateSet(date) {
//         setState({
//             startDate: date
//         });
//     };

//     function openDatePicker() {
//         setState({
//             datePickerIsOpen: !state.datePickerIsOpen
//         });
//     };

//     return (
//         <div>
//             <div className='fixed-top'>
//                 <Navigation />
//             </div>

//             <div className='main-content'>
//                 <Form>
//                     <Form.Group controlId='basicDetails'>
//                         <InputGroup className='mb-3'>
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text id='basic-addon1'>Store</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 name='store'
//                                 onChange={handleChange.bind(this)}
//                                 as='select'
//                                 className='mr-sm-2'
//                                 id='inlineFormCustomSelect'
//                                 custom
//                             >
//                                 <option>Select...</option>
//                                 <option value='Plaza'>Nextra Morayfield Plaza News</option>
//                                 <option value='Village'>Nextra Morayfield Village News</option>
//                             </Form.Control>
//                         </InputGroup>

//                         <InputGroup className='mb-3'>
//                             <InputGroup.Prepend>
//                                 {/* <InputGroup.Text id='basic-addon1'>Date</InputGroup.Text> */}
//                                 <Button variant='danger' onClick={openDatePicker}>Select Date</Button>

//                             </InputGroup.Prepend>
//                             <DatePicker
//                                 onChange={(date) => dateSet(date)}
//                                 onClickOutside={openDatePicker}
//                                 onSelect={openDatePicker}
//                                 open={state.datePickerIsOpen}
//                                 selected={startDate}
//                                 customInput={
//                                     <FormControl type='text'
//                                         placeholder={startDate}
//                                         name='date'
//                                         onClick={openDatePicker}
//                                     // onChange={handleChange.bind(this)}
//                                     />
//                                 }
//                             />

//                         </InputGroup>



//                         <InputGroup className='mb-3'>
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text id='basic-addon1'>Staff</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <FormControl type='text'
//                                 name='staff'
//                                 placeholder={figures.staff}
//                                 onChange={handleChange.bind(this)}
//                             />
//                         </InputGroup>
//                     </Form.Group>
//                 </Form>

//                 <Accordion>
//                     {/* cash section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='0'>
//                             <b>CASH</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='0'>
//                             <Card.Body>
//                                 <InputHelp label='Payouts Used' tooltip='Payout money used (if any)' fieldName='usedPayouts' />
//                                 <InputHelp label='Put Aside' tooltip='Money put aside for payouts / money put in safe (if any)' fieldName='putAside' />
//                                 <InputNoHelp label="$100's" fieldName='hundreds' />
//                                 <InputNoHelp label="$50's" fieldName='fifties' />
//                                 <InputNoHelp label="$20's" fieldName='twenties' />
//                                 <InputNoHelp label="$10's" fieldName='tens' />
//                                 <InputNoHelp label="$5's" fieldName='fives' />
//                                 <InputNoHelp label='Coins' fieldName='coins' />
//                                 <InputNoHelpDisabled label='Total' fieldName='cashActual' data={figures.cashActual} />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Cash in drawer figure from register' fieldName='cashRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='cashDiff' data={figures.cashDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* eftpos section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='1'>
//                             <b>EFTPOS</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='1'>
//                             <Card.Body>
//                                 <InputHelp label='Terminal 1' tooltip='Total of the first eftpos terminal' fieldName='eftposOne' />
//                                 <InputHelp label='Terminal 2' tooltip='Total of the second eftpos terminal' fieldName='eftposTwo' />
//                                 <InputHelp label='Terminal 3' tooltip='Total of the third eftpos terminal (if applicable)' fieldName='eftposThree' />
//                                 <InputHelp label='Previous Day' tooltip='Total of any eftpos machines used after 6:30pm on the previous day' fieldName='eftposPrev' />
//                                 <InputNoHelpDisabled label='Total' fieldName='eftposActual' data={figures.eftposActual} />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Eftpos figure from the register' fieldName='eftposRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='eftposDiff' data={figures.eftposDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* epay section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='2'>
//                             <b>EPAY</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='2'>
//                             <Card.Body>
//                                 <InputHelp label='Actual' tooltip='Actual figure from epay terminal report' fieldName='epayActual' />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Epay figure from the register' fieldName='epayRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='epayDiff' data={figures.epayDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* lotto section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='3'>
//                             <b>LOTTO</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='3'>
//                             <Card.Body>
//                                 <InputHelp label='Gross Sales' tooltip='Gross sales figure from the lotto report' fieldName='lottoGross' />
//                                 <InputHelp label='ISI Commission' tooltip='Instants commission figure from the lotto report' fieldName='isiCommission' />
//                                 <InputHelp label='ISI Net Sales' tooltip='Instants net sales figure from the lotto report' fieldName='isiNet' />
//                                 <InputNoHelpDisabled label='Total' fieldName='lottoActual' data={figures.lottoActual} />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Lotto sales figure from the register' fieldName='lottoRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='lottoDiff' data={figures.lottoDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* scratchies section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='4'>
//                             <b>INSTANT SCRATCH-ITS</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='4'>
//                             <Card.Body>
//                                 <InputHelp label='Difference' tooltip='Difference between ISI c/o less sales, and ISI count' fieldName='isiDiff' />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* lotto payouts section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='5'>
//                             <b>LOTTO PAYOUTS</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='5'>
//                             <Card.Body>
//                                 <InputHelp label='Total Prizes Paid' tooltip='Total prizes paid figure from the lotto report' fieldName='totalPrizes' />
//                                 <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isiCash' data={figures.isiCash} />
//                                 <InputNoHelpDisabled label='Total' fieldName='lottoPayActual' data={figures.lottoPayActual} />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Lotto payouts figure from the register' fieldName='lottoPayRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='lottoPayDiff' data={figures.lottoPayDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>

//                     {/* scratchies payouts section */}
//                     <Card>
//                         <Accordion.Toggle as={Card.Header} eventKey='6'>
//                             <b>SCRATCHIE PAYOUTS</b>
//                         </Accordion.Toggle>
//                         <Accordion.Collapse eventKey='6'>
//                             <Card.Body>
//                                 <InputHelp label='Instants Cash' tooltip='Instants cash figure from the lotto report' fieldName='isiCash' data={figures.isiCash} />
//                                 <InputHelp label='Total Free Instants' tooltip='Total free instants figure from the lotto report' fieldName='isiFree' />
//                                 <InputNoHelpDisabled label='Total' fieldName='isiPayActual' data={figures.isiPayActual} />
//                                 <hr />
//                                 <InputHelp label='Register' tooltip='Instant Scratch-It figure from the register' fieldName='isiPayRegister' />
//                                 <hr />
//                                 <InputNoHelpDisabled label='Difference' fieldName='isiPayDiff' data={figures.isiPayDiff} />
//                             </Card.Body>
//                         </Accordion.Collapse>
//                     </Card>
//                 </Accordion>

//                 <hr />

//                 <InputGroup className='mb-3'>
//                     <InputGroup.Prepend>
//                         <InputGroup.Text>Total Under / Over</InputGroup.Text>
//                         <InputGroup.Text>$</InputGroup.Text>
//                     </InputGroup.Prepend>
//                     <FormControl disabled
//                         placeholder={figures.totalDiff}
//                     />
//                 </InputGroup>
//             </div>
//         </div>
//     )
// }