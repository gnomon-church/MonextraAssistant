import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import axios from 'axios'

import Start from './pages/Start.jsx'
import EODForm from './pages/EODForm.jsx'
import ReportView from './pages/ReportView.jsx'

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
                    <Route exact path='/reportview' component={ReportView} />
                    {/* <ReportView />
                    </Route> */}
                </Switch>
            </div>
        </Router>
    )
}
}

export default App;