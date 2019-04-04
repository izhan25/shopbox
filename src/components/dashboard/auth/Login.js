import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Loader from '../../layout/Loader';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        showLoader: false,
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            showLoader: true,
            error: ''
        })

        const { firebase } = this.props;
        const { email, password } = this.state;

        firebase
            .login({
                email,
                password
            })
            .catch(err => {
                this.setState({
                    error: 'Invalid Credentials',
                    showLoader: false
                })
            });
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value });
    render() {
        const { error, showLoader } = this.state;
        return (
            <React.Fragment>
                <div className="row" style={{ marginTop: '50px' }}>
                    <div className="col-md-4 mx-auto">
                        {
                            error !== ''
                                ? <div className="alert alert-danger text-center">
                                    {error}
                                </div>
                                : null
                        }
                        {
                            showLoader
                                ? <div >
                                    <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
                                    <br />
                                </div>
                                : null
                        }
                        <div className="card">
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