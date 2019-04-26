import React, { Component } from 'react';
import Loader from '../../layout/LoaderForPublic';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Grid, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Firebase_EmailValidator, addCustomer } from '../../../actions/customerActions';
import Swal from 'sweetalert2';
import classnames from 'classnames';

class Register extends Component {

    state = {
        id: '',
        userName: '', userNameError: false, userNameMsg: '',
        fullName: '', fullNameError: false, fullNameMsg: '',
        contact: '', contactError: false, contactMsg: '',
        birthDate: '', birthDateError: false, birthDateMsg: '',
        address: '', addressError: false, addressMsg: '',
        gender: '', genderError: false, genderMsg: '',
        email: '', emailError: false, emailMsg: '',
        password: '', passwordError: false, passwordMsg: '',
        rePassword: '', rePasswordError: false, rePasswordMsg: '',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/shopbox-35ae7.appspot.com/o/customers%2Ficon-header-01.png?alt=media&token=0d657180-a5da-4c8b-88b4-8d0bb668adbe',
        submitForm: true
    }

    componentDidMount() {
        scrollToTop();
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        // setting state
        this.setState({
            [name]: value,
        });

        // Validating inputs
        switch (name) {
            case 'password':
                if (value.length === 0) {
                    this.setState({ passwordError: true, passwordMsg: 'Password is Required', submitForm: false });
                }
                else {
                    this.setState({ passwordError: false, passwordMsg: '', submitForm: true });
                }
                break;
            case 'rePassword':
                if (value !== this.state.password) {
                    this.setState({ rePasswordError: true, rePasswordMsg: 'Password does not match', submitForm: false });
                }
                else {
                    this.setState({ rePasswordError: false, rePasswordMsg: '', submitForm: true });
                }
                break;
            case 'email':
                if (value === '') {
                    this.setState({ emailError: true, emailMsg: 'Email is Required', submitForm: false });
                }

                else {
                    this.setState({ emailError: false, emailMsg: '', submitForm: true });
                }
                break;
            case 'userName':
                if (value === '') {
                    this.setState({ userNameError: true, userNameMsg: 'Name is Required', submitForm: false });
                }
                else if (!isNaN(value)) {
                    this.setState({ userNameError: true, userNameMsg: 'Name Field Cannot Have Digits', submitForm: false });
                }
                else if (value.length > 30) {
                    this.setState({ userNameError: true, userNameMsg: 'Please Provide A Real Name', submitForm: false });
                }
                else if (value.length < 3) {
                    this.setState({ userNameError: true, userNameMsg: 'This is too short', submitForm: false });
                }
                else {
                    this.setState({ userNameError: false, userNameMsg: '', submitForm: true });
                }
                break;

            case 'contact':
                if (isNaN(value)) {
                    this.setState({ contactError: true, contactMsg: 'Contact Must Contain Only Digits', submitForm: false });
                }
                else if (value.length > 11 || value.length < 11) {
                    this.setState({ contactError: true, contactMsg: 'Invalid Contact', submitForm: false });
                }
                else if (value.length === 11) {
                    this.setState({ contactError: false, contactMsg: '', submitForm: true });
                }
                else {
                    this.setState({ contactError: false, contactMsg: '', submitForm: true });
                }
                break;

            case 'fullName':
                if (value === '') {
                    this.setState({ fullNameError: true, fullNameMsg: 'Name is Required', submitForm: false });
                }
                else if (!isNaN(value)) {
                    this.setState({ fullNameError: true, fullNameMsg: 'Name Field Cannot Have Digits', submitForm: false });
                }
                else if (value.length > 30) {
                    this.setState({ fullNameError: true, fullNameMsg: 'Please Provide A Real Name', submitForm: false });
                }
                else if (value.length < 5) {
                    this.setState({ fullNameError: true, fullNameMsg: 'This is too short', submitForm: false });
                }
                else {
                    this.setState({ fullNameError: false, fullNameMsg: '', submitForm: true });
                }
                break;
            case 'address':
                if (value === '') {
                    this.setState({ addressError: true, addressMsg: 'Address is Required', submitForm: false });
                }
                else if (value.length < 3) {
                    this.setState({ addressError: true, addressMsg: 'Address is too short', submitForm: false });
                }
                else {
                    this.setState({ addressError: false, addressMsg: '', submitForm: true });
                }
                break;

            default:
                // do nothing
                break;
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { firebase, firestore, addCustomer } = this.props;
        const { userName, fullName, contact, birthDate, address, gender, email, photoURL, password } = this.state;

        const newCustomer = { userName, fullName, contact, birthDate, address, gender, email, photoURL, password };

        Firebase_EmailValidator(email, result => {
            switch (result) {
                case true:
                    this.setState({ emailError: true, emailMsg: 'Email is already in use', submitForm: false });
                    break;
                case false:
                    this.setState({ emailError: false, emailMsg: '', submitForm: true });
                    break;
                default:
                    // do nothing
                    break;
            }
        });

        firestore
            .add({ collection: 'customers' }, newCustomer)
            .then(res => {

                const newlyCreatedCustomer = { ...newCustomer, id: res.id };

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(newCustomer.email, newCustomer.password)
                    .then(cred => {
                        addCustomer(newlyCreatedCustomer);
                        Swal.fire({ type: 'success', text: 'Signup Complete' });

                        const currentUser = firebase.auth().currentUser;
                        currentUser.updateProfile({
                            displayName: userName,
                            photoURL
                        });

                    })
                    .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;

                        console.log('errorCode => ', errorCode);
                        console.log('errorMessage => ', errorMessage);

                        Swal.fire({ type: 'error', text: errorMessage });
                    });

            })
            .catch(error => {
                Swal.fire({ type: 'error', text: 'Oops! Something went wrong...' });
                console.log(error);
            });



    }

    render() {
        const { categories } = this.props;
        const {
            userName, userNameError, userNameMsg,
            fullName, fullNameError, fullNameMsg,
            contact, contactError, contactMsg,
            birthDate, birthDateError, birthDateMsg,
            address, addressError, addressMsg,
            gender, genderError, genderMsg,
            email, emailError, emailMsg,
            password, passwordError, passwordMsg,
            rePassword, rePasswordError, rePasswordMsg,
            submitForm
        } = this.state;

        if (categories) {
            return (
                <div className="bg-white">
                    <Header activePage="register" categories={categories} history={this.props.history} />
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7">
                            <div className="card mt-3" style={{ marginBottom: '100px' }}>
                                <div className="card-header">
                                    <h3 className="float-left mt-2">Registration</h3>
                                </div>
                                <div className="card-body">
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <form onSubmit={this.onSubmit} name="editForm">
                                                <InputRow
                                                    name="userName"
                                                    label="Username"
                                                    onChange={this.onChange}
                                                    defaultValue={userName}
                                                    validation={{ error: userNameError, msg: userNameMsg }}
                                                />
                                                <InputRow
                                                    name="fullName"
                                                    label="Full name"
                                                    onChange={this.onChange}
                                                    defaultValue={fullName}
                                                    validation={{ error: fullNameError, msg: fullNameMsg }}
                                                />
                                                <InputRow
                                                    name="contact"
                                                    label="Contact"
                                                    onChange={this.onChange}
                                                    defaultValue={contact}
                                                    validation={{ error: contactError, msg: contactMsg }}
                                                />

                                                <div className="form-group mt-3">
                                                    <label className="text-muted">
                                                        <small>Gender</small>
                                                    </label>
                                                    <div className="form-control form-control-pink" style={{ height: '60px' }}>
                                                        <RadioGroup
                                                            aria-label="Gender"
                                                            name="gender"
                                                            className="d-inline"
                                                            value={gender}
                                                            onChange={this.onChange}
                                                        >
                                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                        </RadioGroup>
                                                    </div>
                                                    {
                                                        genderError
                                                            ? <small className="text-danger error">
                                                                {genderMsg}
                                                            </small>
                                                            : null
                                                    }
                                                </div>

                                                <InputRow
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    onChange={this.onChange}
                                                    defaultValue={email}
                                                    validation={{ error: emailError, msg: emailMsg }}
                                                />

                                                <InputRow
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    onChange={this.onChange}
                                                    defaultValue={password}
                                                    validation={{ error: passwordError, msg: passwordMsg }}
                                                />

                                                <InputRow
                                                    name="rePassword"
                                                    label="Re-Enter Password"
                                                    type="password"
                                                    onChange={this.onChange}
                                                    defaultValue={rePassword}
                                                    validation={{ error: rePasswordError, msg: rePasswordMsg }}
                                                />


                                                <InputRow
                                                    name="birthDate"
                                                    label="Date of Birth"
                                                    type="date"
                                                    onChange={this.onChange}
                                                    defaultValue={birthDate}
                                                    validation={{ error: birthDateError, msg: birthDateMsg }}
                                                />

                                                <div className="form-group">
                                                    <label className="text-muted">
                                                        <small>Address</small>
                                                    </label>
                                                    <textarea
                                                        name="address"
                                                        defaultValue={address}
                                                        onChange={this.onChange}
                                                        className="form-control form-control-pink"
                                                    />
                                                    {
                                                        addressError
                                                            ? <small className="text-danger error">
                                                                {addressMsg}
                                                            </small>
                                                            : null
                                                    }
                                                </div>

                                                {
                                                    submitForm
                                                        ? <input
                                                            type="submit"
                                                            value="Save Changes"
                                                            className="btn btn-pink float-right rounded-right rounded-left"
                                                        />
                                                        : <input
                                                            type="submit"
                                                            value="Save Changes"
                                                            className="btn btn-pink float-right rounded-right rounded-left"
                                                            disabled
                                                        />
                                                }
                                                <input
                                                    type="reset"
                                                    onClick={this.resetState}
                                                    value="Reset Form"
                                                    className="btn btn-secondary mr-2 float-right rounded-right rounded-left"
                                                />
                                            </form>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer categories={categories} />
                </div>
            )
        }
        else {
            return <Loader />
        }
    }
}
const InputRow = ({ type = 'text', label, name, onChange, defaultValue, validation }) => {
    const { error, msg } = validation;
    return (
        <div className="form-group mt-2">
            <label className="text-muted">
                <small>{label}</small>
            </label>
            <input
                type={type}
                name={name}
                className={classnames('form-control form-control-pink', {
                    'border border-danger': error
                })}
                onChange={onChange} defaultValue={defaultValue}
                autoComplete="off"
                required
            />
            {
                error
                    ? <small className="text-danger error">
                        {msg}
                    </small>
                    : null
            }
        </div>
    )
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
                auth: state.firebase.auth
            }
        ),
        { addCustomer }
    ),
)(Register);