import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import logo from '../layout/logo/sampleLogo.jpg'
import './assets/css/main.css';


import Header from './layout/Header';

class Public extends Component {

    render() {

        return (
            <React.Fragment>
                <Header />
                <br /><br /><br /><br />
                <div className="container">
                    <div className="card mt-5">
                        <div className="card-body">
                            <img src={logo} alt="Loading..." className="img-fluid" style={{ width: '600px', margin: 'auto', display: 'block' }} />
                            <hr />
                            <h4 className="text-center">currently in development</h4>
                        </div>
                    </div>
                    <Link to="/dashboard" className="btn btn-gray btn-sm float-right">
                        <i className="fas fa-arrow-circle-right"></i> Go To Dashboard
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'categories',
        }
    ]),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
    })),
)(Public);