import React, { Component } from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Route Protection
import { UserIsAuthenticated, UserIsNotAuthenticated, CustomerIsAuthenticated, CustomerIsNotAuthenticated } from './helpers/auth';


// Components
import Public from './components/public/Public';
import ProductsPublic from './components/public/products/Products';
import ProductsPublicDetails from './components/public/products/ProductDetails';
import AboutPublic from './components/public/about/About';
import ContactPublic from './components/public/contact/Contact';
import Cart from './components/public/cart/Cart';
import Login from './components/public/auth/Login';
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
import LoginPublic from './components/public/auth/Login';
import Display from './components/dashboard/display/Display';
import ProfilePublic from './components/public/dashboard/Profile';
import OrdersPublic from './components/public/dashboard/Orders';
import NotFound from './components/layout/NotFound';
import Register from './components/public/auth/Register';
import ForgotPassword from './components/public/auth/ForgotPassword.js';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Public} />
              <Route exact path="/products" component={ProductsPublic} />
              <Route exact path="/products/category/:id" component={ProductsPublic} />
              <Route exact path="/product/:id" component={ProductsPublicDetails} />
              <Route exact path="/about" component={AboutPublic} />
              <Route exact path="/contact" component={ContactPublic} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/login" component={CustomerIsNotAuthenticated(LoginPublic)} />
              <Route exact path="/login/reset-password" component={ForgotPassword} />
              <Route exact path="/profile" component={CustomerIsAuthenticated(ProfilePublic)} />
              <Route exact path="/orders" component={CustomerIsAuthenticated(OrdersPublic)} />
              <Route exact path="/register" component={Register} />

              <Route exact path="/dashboard/login" component={UserIsNotAuthenticated(Login)} />
              <Route exact path="/dashboard" component={UserIsAuthenticated(Dashboard)} />
              <Route exact path="/dashboard/products/:category?/:productType?" component={UserIsAuthenticated(Products)} />
              <Route exact path="/dashboard/product/add" component={UserIsAuthenticated(AddProduct)} />
              <Route exact path="/dashboard/product/edit/:id" component={UserIsAuthenticated(EditProduct)} />
              <Route exact path="/dashboard/product/:id" component={UserIsAuthenticated(ProductDetails)} />
              <Route exact path="/dashboard/categories" component={UserIsAuthenticated(Categories)} />
              <Route exact path="/dashboard/customers" component={UserIsAuthenticated(Customers)} />
              <Route exact path="/dashboard/customer/:id" component={UserIsAuthenticated(CustomerDetails)} />
              <Route exact path="/dashboard/orders" component={UserIsAuthenticated(Orders)} />
              <Route exact path="/dashboard/order/:id" component={UserIsAuthenticated(OrderDetails)} />
              <Route exact path="/dashboard/profile" component={UserIsAuthenticated(Profile)} />
              <Route exact path="/dashboard/display" component={UserIsAuthenticated(Display)} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
