import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from './pages/Start.jsx'
import EODForm from './pages/EODForm.jsx'
import ReportView from './pages/ReportView.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

// export default class App extends Component {
//     componentDidMount() {
//         document.title = 'Monextra Assistant'
//     }

//     render() {
//         return (
//             <Router>
//                 <div className="App">
//                     <Switch>
//                         {/* Route for start page */}
//                         <Route exact path='/'>
//                             <Start />
//                         </Route>

//                         {/* Route for the eodform page */}
//                         <Route exact path='/eodform'>
//                             <EODForm />
//                         </Route>

//                         {/* Route for the pdfview page */}
//                         <Route exact path='/reportview' component={ReportView} />
//                         {/* <ReportView />
//                         </Route> */}
//                     </Switch>
//                 </div>
//             </Router>
//         )
//     }
// }

export default function App() {
    return (
        <Router>
            {/* <div className="App">
                <Switch> */}
                    {/* Route for start page */}
                    <Route exact path='/'>
                        <Start />
                    </Route>

                    {/* Route for the eodform page */}
                    <Route exact path='/eodform'>
                        <EODForm />
                    </Route>

                    {/* Route for the pdfview page */}
                    <Route exact path='/reportview' component={ReportView} />
                    {/* <ReportView />
                        </Route> */}
                {/* </Switch>
            </div> */}
        </Router>
    )
}