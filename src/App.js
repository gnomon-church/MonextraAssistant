import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Start from './pages/Start.jsx'
import EODForm from './pages/EODForm.jsx'

export default function App() {
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