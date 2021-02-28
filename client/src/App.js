import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from './pages/Start';
// import EODForm from './pages/EODForm';
// import ReportView from './pages/ReportView';
import ISIMenu from './pages/ISIMenu'
import ISIManage from './pages/ISIManagement/ISIManage'
import ISIReceive from './pages/ISIManagement/ISIReceive'
import ISIReport from './pages/ISIManagement/ISIReport'
import ISISignOut from './pages/ISIManagement/ISISignOut'
import ISIReceiveReport from './pages/ISIManagement/reports/ISIReceiveReport.jsx'
import ISISignOutReport from './pages/ISIManagement/reports/ISISignOutReport.jsx'

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
                    {/* <Route exact path='/eodform'>
                        <EODForm />
                    </Route> */}

                    {/* Route for the EOD Report Page page */}
                    {/* <Route exact path='/reportview'>
                        <ReportView />
                    </Route> */}

                    {/* Route for the ISI Management page */}
                    <Route exact path='/isifunctions'>
                        <ISIMenu />
                    </Route>

                    {/* Route for the ISI Manage page */}
                    <Route exact path='/isifunctions/isimanage'>
                        <ISIManage />
                    </Route>

                    {/* Route for the ISI Receive page */}
                    <Route exact path='/isifunctions/isireceive'>
                        <ISIReceive />
                    </Route>

                    <Route exact path='/isifunctions/isireceive/isireceivereport'>
                        <ISIReceiveReport />
                    </Route>

                    {/* Route for the ISI Report page */}
                    <Route exact path='/isifunctions/isireport'>
                        <ISIReport />
                    </Route>

                    {/* Route for the ISI Sign Out page */}
                    <Route exact path='/isifunctions/isisignout'>
                        <ISISignOut />
                    </Route>

                    <Route exact path='/isifunctions/isisignout/isireceivereport'>
                        <ISISignOutReport />
                    </Route>


                </Switch>
            </div>
        </Router>
    )
}