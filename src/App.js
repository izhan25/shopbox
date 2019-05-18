import React, { Component } from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App text-center">
          <h1 className="mt-3">This is Master Branch</h1>
          <a href="https://github.com/izhan25/shopbox/tree/store">Public Repository</a>
          <br />
          <a href="https://github.com/izhan25/shopbox/tree/admin">Dashboard Repository</a>

        </div>
      </Provider>
    );
  }
}

export default App;
