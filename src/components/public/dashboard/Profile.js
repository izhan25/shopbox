import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import Loader from '../../layout/Loader';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateCustomer } from '../../../actions/customerActions';
import { Grid, IconButton, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import classnames from 'classnames';
import Swal from 'sweetalert2';


class Profile extends Component {

    state = {
        userName: '',
        fullName: '',
        contact: '',
        birthDate: '',
        address: '',
        gender: '',
        email: '',
        photoURL: '',
        loadProps: true,

        editting: false,
    }

    static getDerivedStateFromProps(props, state) {
        const { customer } = props;

        if (customer && state.loadProps) {
            const { userName, fullName, contact, birthDate, address, gender, email, photoURL } = customer;

            return {
                userName, fullName, contact, birthDate, address, gender, email, photoURL
            }
        }

        return null;
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        // setting state
        this.setState({
            [name]: value,
            loadProps: false
        });

    }

    onSubmit = e => {
        e.preventDefault();

        const { firestore, customer } = this.props;
        const { userName, fullName, contact, birthDate, address, gender, email, photoURL } = this.state;

        const updCustomer = { userName, fullName, contact, birthDate, address, gender, email, photoURL };

        firestore
            .update({ collection: 'customers', doc: customer.id }, updCustomer)
            .then(() => {
                updateCustomer(updCustomer);
                Swal.fire({ type: 'success', text: 'Profile Updated' });
                this.setState({ loadProps: true, editting: false });
            })
            .catch(error => {
                Swal.fire({ type: 'error', text: 'Oops! Something went wrong' });
                console.log(error);
            })

    }

    onEditClick = () => this.setState(state => ({ editting: !state.editting }));

    render() {
        const { history, auth } = this.props;
        const { editting,
            userName,
            fullName,
            contact,
            birthDate,
            address,
            gender,
            email
        } = this.state;
        let mainContent;

        const Information =
            <React.Fragment>
                <InfoRow label="Username" display={userName} />
                <InfoRow label="Full name" display={fullName} />
                <InfoRow label="Contact" display={contact} />
                <InfoRow label="Gender" display={gender} />
                <InfoRow label="Email" display={email} />
                <InfoRow label="Birthday" display={birthDate} />
                <InfoRow label="Address" display={address} />
            </React.Fragment>;

        const EditForm =
            <form onSubmit={this.onSubmit} name="editForm">
                <InputRow name="userName" label="Username" onChange={this.onChange} defaultValue={userName} />
                <InputRow name="fullName" label="Full name" onChange={this.onChange} defaultValue={fullName} />
                <InputRow name="contact" label="Contact" onChange={this.onChange} defaultValue={contact} />

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
                </div>

                <InputRow name="email" label="Email" onChange={this.onChange} defaultValue={email} />

                <div className="form-group mt-2">
                    <label className="text-muted">
                        <small>Date of Birth</small>
                    </label>
                    <input type="date" name="birthDate" className="form-control form-control-pink" onChange={this.onChange} defaultValue={birthDate} />
                </div>

                <div className="form-group">
                    <label className="text-muted">
                        <small>Address</small>
                    </label>
                    <textarea name="address" onChange={this.onChange} className="form-control form-control-pink">
                        {address}
                    </textarea>
                </div>

                <input type="submit" value="Save Changes" className="btn btn-pink float-right rounded-right rounded-left" />
                <input type="reset" value="Reset Form" className="btn btn-secondary mr-2 float-right rounded-right rounded-left" />
            </form>;

        if (auth.isLoaded) {
            mainContent = (
                <React.Fragment>
                    <div className="card mt-3" style={{ marginBottom: '100px' }}>
                        <div className="card-header">
                            <h3 className="float-left mt-2">Profile</h3>
                            <span className="float-right" onClick={this.onEditClick}>
                                <IconButton>
                                    <i className="fas fa-pencil-alt"></i>
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

const InputRow = ({ label, name, onChange, defaultValue }) => {
    return (
        <div className="form-group mt-2">
            <label className="text-muted">
                <small>{label}</small>
            </label>
            <input type="text" name={name} className="form-control form-control-pink" onChange={onChange} defaultValue={defaultValue} />
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
            customer: state.customer.customer
        }),
        { updateCustomer }
    )
)(Profile);
