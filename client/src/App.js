import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from './pages/Start';
import EODForm from './pages/EODForm';
import ReportView from './pages/ReportView';
import ISIMenu from './pages/ISIMenu'
import ISIManage from './pages/ISIManagement/ISIManage'
import ISIReceive from './pages/ISIManagement/ISIReceive'
import ISIReport from './pages/ISIManagement/ISIReport'
import ISISignOut from './pages/ISIManagement/ISISignOut'

export default function App() {

    return (
        <Router>
            <div className="App">
                <Switch>
                    {/* Route for Start page */}
                    <Route exact path='/'>
                        <Start />
                    </Route>

                    {/* Route for the EOD Form page */}
                    <Route exact path='/eodform'>
                        <EODForm />
                    </Route>

                    {/* Route for the EOD Report Page page */}
                    <Route exact path='/reportview'>
                        <ReportView />
                    </Route>

                    {/* Route for the ISI Management page */}
                    <Route exact path='/isimenu'>
                        <ISIMenu />
                    </Route>

                    {/* Route for the ISI Manage page */}
                    <Route exact path='/isimanage'>
                        <ISIManage />
                    </Route>

                    {/* Route for the ISI Receive page */}
                    <Route exact path='/isireceive'>
                        <ISIReceive />
                    </Route>

                    {/* Route for the ISI Report page */}
                    <Route exact path='/isireport'>
                        <ISIReport />
                    </Route>

                    {/* Route for the ISI Sign Out page */}
                    <Route exact path='/isisignout'>
                        <ISISignOut />
                    </Route>


                </Switch>
            </div>
        </Router>
    )
}