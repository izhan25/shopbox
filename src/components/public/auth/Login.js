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
import { addCustomer } from '../../../actions/customerActions';
import { setLoginErrorMsg } from '../../../actions/cartActions';
import classnames from 'classnames';


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

        const { firebase, firestore, addCustomer, history, cart, setLoginErrorMsg } = this.props;

        firebase
            .login({
                email,
                password
            })
            .then(user => {
                this.setState({ showLoader: false, error: '' });

                // populating redux state with customer details
                firestore.get({ collection: 'customers', where: ['email', '==', email] })
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            addCustomer({ ...doc.data(), id: doc.id });
                        });

                        if (cart.loginError.error) {
                            // Re setting loginError in redux-store
                            setLoginErrorMsg(false, '');
                            history.push('/cart');
                        }
                    }

                    );

            })
            .catch(err => {
                this.setState({
                    error: 'Invalid Credentials',
                    showLoader: false
                })
            });

    }

    signinWithGoogle = () => {
        const { firebase, firestore, addCustomer } = this.props;
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
                    password: "",
                    birthDate: {
                        date: "",
                        month: "",
                        year: ""
                    },
                    address: "",
                    gender: "",
                    createdAt: new Date()
                }

                // checking if the user exist in database
                const db = firebase.firestore();

                db.collection('customers').where('email', '==', newCustomer.email).get().then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        // logging if user exist
                        console.log('user exists');

                        let customer = null;
                        querySnapshot.forEach(doc => {
                            customer = {
                                id: doc.id,
                                ...doc.data()
                            }
                        });


                        // saving customer to state
                        addCustomer(customer);
                    }
                    else {
                        // storing to firestore if user is new
                        firestore.add({ collection: 'customers' }, newCustomer).then(res => {
                            // saving customer to state
                            addCustomer({ ...newCustomer, id: res.id });

                            console.log('user added');
                        });


                    }
                })
            })
            .catch(error => {
                let errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;

                Swal.fire({
                    type: 'error',
                    title: 'Oops!',
                    html: `<div>Something went wrong!</div>
                <div>Kindly Try Again</div>`
                })

                console.log('errorCode =>', errorCode);
                console.log('errorMessage =>', errorMessage);
                console.log('email =>', email);
                console.log('credential =>', credential);
            });
    }

    render() {
        const { categories, cart: { loginError } } = this.props;
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
                                            loginError.error
                                                ? <div className="alert alert-danger text-center" style={{ marginTop: '50px' }}>
                                                    {loginError.msg}
                                                </div>
                                                : null
                                        }
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
                                <div className={classnames('card rounded-left rounded-right', { 'mt-5': !loginError.error })}>
                                    <h4 className="card-header bg-white text-center font-pink font-weight-bold">
                                        <i className="fas fa-lock mr-1" />Login
                    </h4>
                                    <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" name="email" onChange={this.onChange} className="form-control form-control-pink" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" name="password" onChange={this.onChange} className="form-control form-control-pink" />
                                            </div>

                                            <input type="submit" onClick={this.onSubmit} value="Submit" className="btn btn-pink d-flex mx-auto justify-content-center rounded-right rounded-left col-md-6" />


                                        </form>
                                        <GoogleSigninBtn action={this.signinWithGoogle} />

                                    </div>
                                    <div className="card-footer bg-white  text-center">
                                        <div className="row">
                                            <span className="col-md-8">
                                                Don't have an account?
                        <Link to="/register" className="btn btn-link font-pink font-weight-bold">Signup</Link>
                                            </span>
                                            <Link to="login/reset-password" className="col-md-4 btn btn-default btn-sm float-right rounded-left rounded-right font-pink">Forgot Password</Link>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Footer categories={categories} />
                </React.Fragment >
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
        { addCustomer, setLoginErrorMsg }
    ),
)(Login);