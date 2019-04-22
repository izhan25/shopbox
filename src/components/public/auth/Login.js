import React, { Component } from 'react';
import Loader from '../../layout/LoaderForPublic';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import GoogleSigninBtn from '../layout/GoogleSigninBtn';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2';


class Login extends Component {

    state = {
        email: '',
        password: '',

        error: '',
        showLoader: false,
    }

    componentDidMount() {
        scrollToTop();
    }

    onChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        // Allowing Inputs
        this.setState({ [name]: value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        // Validating
        if (email === '' && password === '') {
            Swal.fire('Fill Form');
            return false;
        };

        // showing Loader
        this.setState({
            showLoader: true,
            error: ''
        })

        const { firebase } = this.props;

        firebase
            .login({
                email,
                password
            })
            .then(user => this.setState({ showLoader: false, error: '' }))
            .catch(err => {
                this.setState({
                    error: 'Invalid Credentials',
                    showLoader: false
                })
            });

    }

    signinWithGoogle = () => {
        const { firebase, firestore } = this.props;
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                // const token = result.credential.accessToken;
                const user = result.user;

                const newCustomer = {
                    userName: user.displayName,
                    fullName: user.displayName,
                    email: user.email,
                    contact: user.phoneNumber,
                    photoURL: user.photoURL,
                    password: null,
                    birthDate: null,
                    address: null
                }

                // checking if the user exist in database
                const db = firebase.firestore();

                db.collection('customers').where('email', '==', newCustomer.email).get().then(querySnapshot => {
                    if (querySnapshot) {
                        // logging if user exist
                        console.log('user exists')
                    }
                    else {
                        // storing to firestore if user is new
                        firestore.add({ collection: 'customers' }, newCustomer).then(console.log('user saved'));
                    }
                })
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;

                Swal.fire({
                    type: 'error',
                    title: 'Oops!',
                    html: 'Something went wrong!'
                })

                console.log('errorCode =>', errorCode);
                console.log('errorMessage =>', errorMessage);
                console.log('email =>', email);
                console.log('credential =>', credential);
            });
    }

    render() {
        const { categories } = this.props;
        const { error, showLoader } = this.state;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="login" categories={categories} history={this.props.history} />

                    <div className="bg-white">
                        <Grid container className="d-flex justify-content-center">
                            <Grid item xs={11} sm={7} md={5} >
                                <div className="row">
                                    <div className="col-md-12">
                                        {
                                            error !== ''
                                                ? <div className="alert alert-danger text-center" style={{ marginTop: '50px' }}>
                                                    {error}
                                                </div>
                                                : null
                                        }
                                        {
                                            showLoader
                                                ? <div style={{ marginTop: '50px' }}>
                                                    <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
                                                    <br />
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className="card mt-5 rounded-left rounded-right">
                                    <h4 className="card-header bg-white text-center font-pink font-weight-bold">
                                        <i className="fas fa-lock mr-1" />Login
                                    </h4>
                                    <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" name="email" onChange={this.onChange} className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" name="password" onChange={this.onChange} className="form-control" />
                                            </div>

                                            <input type="submit" onClick={this.onSubmit} value="Submit" className="btn btn-pink d-flex mx-auto justify-content-center rounded-right rounded-left col-md-6" />


                                        </form>
                                        <GoogleSigninBtn action={this.signinWithGoogle} />
                                    </div>
                                    <div className="card-footer bg-white text-center">
                                        Don't have an account?
                                        <Link to="/register" className="btn btn-link font-pink font-weight-bold">Signup</Link>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Footer categories={categories} />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

export default compose(
    firebaseConnect(),
    firestoreConnect(props => {
        return [
            {
                collection: 'categories',
                limit: 3
            }
        ]
    }),
    connect(
        (state, props) => (
            {
                categories: state.firestore.ordered.categories,
                cart: state.cart,
                auth: state.firebase.auth
            }
        ),
    )
)(Login);