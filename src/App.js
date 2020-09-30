import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from './pages/Start.jsx'
import EODForm from './pages/EODForm.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        {/* Route for start page */}
                        <Route exact path='/'>
                            <Start />
                        </Route>

                        {/* Route for the eodform page */}
                        <Route exact path='/eodform'>
                            <EODForm />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}