import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Loader from '../../layout/Loader';

class Login extends Component {

    state = {
        email: '',
        password: '',
        responseText: '',
        showLoader: false
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({ showLoader: true, responseText: '' })

        const { firebase } = this.props;
        const { email, password } = this.state;

        firebase
            .login({
                email,
                password
            })
            .catch(err => {
                const responseText = <div className="alert alert-danger text-center">
                    Invalid Credentials
                </div>
                this.setState({ responseText, showLoader: false })
            });
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {
        const { responseText, showLoader } = this.state;
        return (
            <React.Fragment>
                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-4 mx-auto">
                        {
                            showLoader
                                ? <Loader />
                                : null
                        }
                        {
                            responseText !== ''
                                ? responseText
                                : null
                        }
                        <div className="card mt-2">
                            <div className="card-body">
                                <h3 className="text-center">
                                    <span className="text-warning">
                                        <i className="fas fa-lock"></i> Login
                                </span>
                                </h3>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            required
                                        />
                                    </div>
                                    <input type="submit" value="Login" className="btn btn-gray btn-block rounded-left rounded-right" />
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default compose(
    firebaseConnect(),
    connect()
)(Login);