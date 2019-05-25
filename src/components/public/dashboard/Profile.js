import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import Loader from '../../layout/LoaderForPublic';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateCustomer, Firebase_EmailValidator } from '../../../actions/customerActions';
import { Grid, IconButton, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import classnames from 'classnames';
import Swal from 'sweetalert2';
import Options from '../layout/Options';


class Profile extends Component {

    state = {
        id: '',
        userName: '', userNameError: false, userNameMsg: '',
        fullName: '', fullNameError: false, fullNameMsg: '',
        contact: '', contactError: false, contactMsg: '',
        address: '', addressError: false, addressMsg: '',
        gender: '', genderError: false, genderMsg: '',
        email: '', emailError: false, emailMsg: '',
        photoURL: '',
        loadProps: true,
        editting: false,
        submitForm: true,

        birthDate: '',
        birthMonth: '',
        birthYear: '',
        birthDateError: false, birthDateMsg: '',
    }

    static getDerivedStateFromProps(props, state) {
        const { customer } = props;

        if (customer && state.loadProps) {
            const { id, userName, fullName, contact, address, gender, email, photoURL, birthDate: { date, month, year } } = customer;

            return {
                id, userName, fullName, contact, address, gender, email, photoURL,
                birthDate: date,
                birthMonth: month,
                birthYear: year
            }
        }

        return null;
    }

    resetState = () => {
        this.setState({
            id: '',
            userName: '', userNameError: false, userNameMsg: '',
            fullName: '', fullNameError: false, fullNameMsg: '',
            contact: '', contactError: false, contactMsg: '',
            address: '', addressError: false, addressMsg: '',
            gender: '', genderError: false, genderMsg: '',
            email: '', emailError: false, emailMsg: '',
            photoURL: '',
            loadProps: true,

            birthDate: '',
            birthMonth: '',
            birthYear: '',
            birthDateError: false, birthDateMsg: '',
        })
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const { auth } = this.props;

        // setting state
        this.setState({
            [name]: value,
            loadProps: false
        });


        // Validating inputs
        switch (name) {
            case 'email':
                if (value === '') {
                    this.setState({ emailError: true, emailMsg: 'Email is Required', submitForm: false });
                }
                else if (value !== auth.email) {
                    Firebase_EmailValidator(value, result => {
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

        const { firestore, updateCustomer } = this.props;
        const { id, userName, fullName, contact, birthDate, birthMonth, birthYear, address, gender, email, photoURL } = this.state;

        const updCustomer = {
            userName,
            fullName,
            contact,
            address,
            gender,
            email,
            photoURL,
            birthDate: {
                date: birthDate ? birthDate : "",
                month: birthMonth ? birthMonth : "",
                year: birthYear ? birthYear : ""
            },
        };

        firestore
            .update({ collection: 'customers', doc: id }, updCustomer)
            .then(() => {
                updateCustomer({ ...updCustomer, id });
                Swal.fire({ type: 'success', text: 'Profile Updated' });
                this.setState({ loadProps: true, editting: false });
            })
            .catch(error => {
                Swal.fire({ type: 'error', text: 'Oops! Something went wrong' });
                console.log(error.message);
            });



    }

    onEditClick = () => this.setState(state => ({ editting: !state.editting }));

    render() {
        const { history, auth } = this.props;
        const { editting,
            userName, userNameError, userNameMsg,
            fullName, fullNameError, fullNameMsg,
            contact, contactError, contactMsg,
            birthDate, birthMonth, birthYear,
            address, addressError, addressMsg,
            gender, genderError, genderMsg,
            email, emailError, emailMsg,
            submitForm
        } = this.state;


        let mainContent;

        const display_birthDate =
            birthDate || birthMonth || birthYear
                ? `${birthDate}-${birthMonth}-${birthYear}`
                : null;

        const ResetPwdBtn = <button className="btn btn-light btn-sm rounded-left rounded-right text-primary">Reset Password</button>

        const Information =
            <React.Fragment>
                <InfoRow label="Username" display={userName} />
                <InfoRow label="Full name" display={fullName} />
                <InfoRow label="Contact" display={contact} />
                <InfoRow label="Gender" display={gender} />
                <InfoRow label="Email" display={email} />
                <InfoRow label="Birthday" display={display_birthDate} />
                <InfoRow label="Address" display={address} />
                <InfoRow label="Password" display={ResetPwdBtn} />
            </React.Fragment>;

        const EditForm =
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


                <div className="form-group mt-2">
                    <Grid container spacing={8} >
                        <Grid item xs={4} sm={4} md={4}>
                            <label className="text-muted">
                                <small>Date</small>
                            </label>
                            <Options
                                date={birthDate ? birthDate : true}
                                onChange={this.onChange} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label className="text-muted">
                                <small>Month</small>
                            </label>
                            <Options
                                month={birthMonth ? birthMonth : true}
                                onChange={this.onChange} />
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <label className="text-muted">
                                <small>Year</small>
                            </label>
                            <Options
                                year={birthYear ? birthYear : true}
                                onChange={this.onChange} />
                        </Grid>

                    </Grid>

                </div>

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
            </form>;

        if (auth.isLoaded) {
            mainContent = (
                <React.Fragment>
                    <div className="card mt-3" style={{ marginBottom: '100px' }}>
                        <div className={classnames('card-header', { 'bg-pink text-white': editting })}>
                            <h3 className="float-left mt-2">Profile</h3>
                            <span className="float-right" onClick={this.onEditClick}>
                                <IconButton>
                                    <i
                                        className={
                                            classnames('fas fa-pencil-alt', {
                                                'text-white': editting
                                            })
                                        }
                                    />
                                </IconButton>
                            </span>
                        </div>
                        <div className="card-body">
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    {
                                        !editting
                                            ? Information
                                            : EditForm
                                    }

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else {
            mainContent = <Loader />;
        }

        return <Dashboard mainContent={mainContent} history={history} />
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
                className="form-control form-control-pink"
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


const InfoRow = ({ label, display }) => {
    const notProvided = <small className="text-muted" style={{ opacity: '0.5' }}>(not provided)</small>
    return (
        <Grid container className="mt-3">
            <Grid item xs={12} sm={4} md={2}>
                <label className="text-muted font-weight-bold">
                    <small>{label}:</small>
                </label>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
                <label className={classnames({ 'text-capitalize': label !== 'Email' })}>
                    {display ? display : notProvided}
                </label>
            </Grid>
        </Grid>
    )
}


export default compose(
    firestoreConnect(),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            customer: state.customer.customer,
            emailError: state.customer.emailError
        }),
        { updateCustomer }
    )
)(Profile);
