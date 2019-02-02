import React, { Component } from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Dashboard from './components/dashboard/Dashboard';
import Public from './components/public/Public';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Public} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
