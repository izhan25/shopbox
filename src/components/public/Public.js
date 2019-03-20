import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../layout/logo/sampleLogo.jpg'
import Header from './layout/Header';
// import '../../App.css';

export default class Public extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
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
