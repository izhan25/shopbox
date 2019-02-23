import React, { Component } from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Public from './components/public/Public';
import Dashboard from './components/dashboard/Dashboard';
import Products from './components/dashboard/products/Products';
import ProductDetails from './components/dashboard/products/ProductDetails';
import Users from './components/dashboard/users/Users';
import Orders from './components/dashboard/orders/Orders';
import Profile from './components/dashboard/profile/Profile';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Public} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/dashboard/products" component={Products} />
              <Route exact path="/dashboard/product/:id" component={ProductDetails} />
              <Route exact path="/dashboard/users" component={Users} />
              <Route exact path="/dashboard/orders" component={Orders} />
              <Route exact path="/dashboard/profile" component={Profile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
