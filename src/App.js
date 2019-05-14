import React, { Component } from 'react';
import './App.css';

// Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Route Protection
import { CustomerIsAuthenticated, CustomerIsNotAuthenticated } from './helpers/auth';


// Components
import Public from './components/public/Public';
import ProductsPublic from './components/public/products/Products';
import ProductsPublicDetails from './components/public/products/ProductDetails';
import AboutPublic from './components/public/about/About';
import ContactPublic from './components/public/contact/Contact';
import Cart from './components/public/cart/Cart';
import LoginPublic from './components/public/auth/Login';
import ProfilePublic from './components/public/dashboard/Profile';
import OrdersPublic from './components/public/dashboard/Orders';
import NotFound from './components/layout/NotFound';
import Register from './components/public/auth/Register';
import ForgotPassword from './components/public/auth/ForgotPassword.js';
import OrderDetailsPublic from './components/public/dashboard/OrderDetails';


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
              <Route exact path="/login/reset-password" component={ForgotPassword} />
              <Route exact path="/login" component={CustomerIsNotAuthenticated(LoginPublic)} />
              <Route exact path="/profile" component={CustomerIsAuthenticated(ProfilePublic)} />
              <Route exact path="/orders" component={CustomerIsAuthenticated(OrdersPublic)} />
              <Route exact path="/orders/:id" component={CustomerIsAuthenticated(OrderDetailsPublic)} />
              <Route exact path="/register" component={Register} />


              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
