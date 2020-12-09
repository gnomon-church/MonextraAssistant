import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from './pages/Start';
import EODForm from './pages/EODForm';
import ReportView from './pages/ReportView';
import ISIManagement from './pages/ISIManagement'

class App extends Component {
  state = {
    response: {}
  };
  
  componentDidMount() {
    document.title = 'Monextra Assistant'

    // axios.get('/api/say-something').then((res) => {
    //   const response = res.data;
    //   this.setState({response});
    // });
  }

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

                    {/* Route for the pdfview page */}
                    <Route exact path='/reportview'>
                        <ReportView />
                    </Route>

                    {/* Route for the isimanagement page */}
                    <Route exact path='/isimanagement'>
                        <ISIManagement />
                    </Route>

                </Switch>
            </div>
        </Router>
    )
}
}

export default App;