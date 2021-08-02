import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ISIManage from './pages/ISIManagement/ISIManage';
import ISIReceive from './pages/ISIManagement/ISIReceive';
import ISIReport from './pages/ISIManagement/ISIReport';
import ISISignOut from './pages/ISIManagement/ISISignOut';
import ISIReceiveReport from './pages/ISIManagement/reports/ISIReceiveReport';
import ISISignOutReport from './pages/ISIManagement/reports/ISISignOutReport';
import ISIStockInSafe from './pages/ISIManagement/reports/ISIStockInSafe';
// import EODForm from './pages/EODForm';
// import ReportView from './pages/ReportView';
import ISIMenu from './pages/ISIMenu';
import Start from './pages/Start';

export default function App() {
	return (
		<Router>
			<div className='App'>
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
					<Route exact path='/isimenu'>
						<ISIMenu />
					</Route>

					{/* Route for the ISI Manage page */}
					<Route exact path='/isimenu/isimanage'>
						<ISIManage />
					</Route>

					{/* Route for the ISI Receive page */}
					<Route exact path='/isimenu/isireceive'>
						<ISIReceive />
					</Route>

					<Route exact path='/isimenu/isireceive/isireceivereport'>
						<ISIReceiveReport />
					</Route>

					{/* Route for the ISI Sign Out page */}
					<Route exact path='/isimenu/isisignout'>
						<ISISignOut />
					</Route>

					<Route exact path='/isimenu/isisignout/isireceivereport'>
						<ISISignOutReport />
					</Route>

					{/* Route for the ISI Report page */}
					<Route exact path='/isimenu/isireport'>
						<ISIReport />
					</Route>

					{/* Route for ISI Stock In Safe Report */}
					<Route exact path='/isimenu/isireport/stockinsafe'>
						<ISIStockInSafe />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
