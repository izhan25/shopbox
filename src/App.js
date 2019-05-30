import React, { Component } from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Route Protection
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';


// Components
import Login from './components/dashboard/auth/Login';
import Dashboard from './components/dashboard/Dashboard'; // Dashboard
import Products from './components/dashboard/products/Products';
import ProductDetails from './components/dashboard/products/ProductDetails';
import AddProduct from './components/dashboard/products/AddProduct';
import EditProduct from './components/dashboard/products/EditProduct';
import Categories from './components/dashboard/categories/Categories';
import Customers from './components/dashboard/customers/Customers';
import CustomerDetails from './components/dashboard/customers/CustomerDetails';
import Orders from './components/dashboard/orders/Orders';
import OrderDetails from './components/dashboard/orders/OrderDetails';
import Profile from './components/dashboard/profile/Profile';
import Display from './components/dashboard/display/Display';
import NotFound from './components/layout/NotFound';
import CustomerQueries from './components/dashboard/queries/CustomerQueries'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
              <Route exact path="/products/:category?/:productType?" component={UserIsAuthenticated(Products)} />
              <Route exact path="/product/add" component={UserIsAuthenticated(AddProduct)} />
              <Route exact path="/product/edit/:id" component={UserIsAuthenticated(EditProduct)} />
              <Route exact path="/product/:id" component={UserIsAuthenticated(ProductDetails)} />
              <Route exact path="/categories" component={UserIsAuthenticated(Categories)} />
              <Route exact path="/customers" component={UserIsAuthenticated(Customers)} />
              <Route exact path="/customer/:id" component={UserIsAuthenticated(CustomerDetails)} />
              <Route exact path="/orders" component={UserIsAuthenticated(Orders)} />
              <Route exact path="/order/:id" component={UserIsAuthenticated(OrderDetails)} />
              <Route exact path="/profile" component={UserIsAuthenticated(Profile)} />
              <Route exact path="/display" component={UserIsAuthenticated(Display)} />
              <Route exact path="/queries" component={UserIsAuthenticated(CustomerQueries)} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
