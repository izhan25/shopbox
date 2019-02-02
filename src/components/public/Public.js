import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../layout/logo/sampleLogo.png'

export default class Public extends Component {
    render() {
        return (
            <div className="container">
                <div className="card mt-5">
                    <div className="card-body">
                        <img src={logo} alt="Loading..." style={{ width: '300px', margin: 'auto', display: 'block' }} />
                        <hr />
                        <h4 className="text-center">currently in development</h4>
                    </div>
                </div>
                <Link to="/dashboard" className="btn btn-primary btn-sm float-right">
                    <i className="fas fa-arrow-circle-right"></i> Go To Dashboard
                </Link>
            </div>
        )
    }
}
