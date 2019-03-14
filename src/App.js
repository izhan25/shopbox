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
import Public from './components/public/Public';
import Dashboard from './components/dashboard/Dashboard';
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
import Login from './components/dashboard/auth/Login';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Public} />
              <Route exact path="/dashboard/login" component={UserIsNotAuthenticated(Login)} />
              <Route exact path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/dashboard/products" component={UserIsAuthenticated(Products)} />
              <Route exact path="/dashboard/product/add" component={UserIsAuthenticated(AddProduct)} />
              <Route exact path="/dashboard/product/edit/:id" component={UserIsAuthenticated(EditProduct)} />
              <Route exact path="/dashboard/product/:id" component={UserIsAuthenticated(ProductDetails)} />
              <Route exact path="/dashboard/categories" component={UserIsAuthenticated(Categories)} />
              <Route exact path="/dashboard/customers" component={UserIsAuthenticated(Customers)} />
              <Route exact path="/dashboard/customer/:id" component={UserIsAuthenticated(CustomerDetails)} />
              <Route exact path="/dashboard/orders" component={UserIsAuthenticated(Orders)} />
              <Route exact path="/dashboard/order/:id" component={UserIsAuthenticated(OrderDetails)} />
              <Route exact path="/dashboard/profile" component={UserIsAuthenticated(Profile)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
