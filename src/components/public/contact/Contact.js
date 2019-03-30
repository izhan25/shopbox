import React, { Component } from 'react'
import Loader from '../../layout/Loader';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { IconButton } from '@material-ui/core';

class Contact extends Component {
    state = {
        fullName: '',
        contact: '',
        email: '',
        message: '',

        fullNameError: false,
        contactError: false,
        emailError: false,
        messageError: false,

        fullNameMsg: '',
        contactMsg: '',
        emailMsg: '',
        messageMsg: '',

        showAlert: false,
        alertMsg: '',
        alertClass: ''
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        // Enabling Editing in Field
        this.setState({ [name]: value });

        // Validating Input
        switch (name) {
            case 'fullName':
                if (value === '') {
                    this.setState({ fullNameError: true, fullNameMsg: 'Name is Required' });
                }
                else if (!isNaN(value)) {
                    this.setState({ fullNameError: true, fullNameMsg: 'Name Field Cannot Have Digits' });
                }
                else if (value.length > 30) {
                    this.setState({ fullNameError: true, fullNameMsg: 'Please Provide A Real Name' });
                }
                else {
                    this.setState({ fullNameError: false, fullNameMsg: '' });
                }
                break;
            case 'contact':
                if (isNaN(value)) {
                    this.setState({ contactError: true, contactMsg: 'Contact Must Contain Digits' });
                }
                if (value.length > 11) {
                    this.setState({ contactError: true, contactMsg: 'Invalid Contact' });
                }
                else {
                    this.setState({ contactError: false, contactMsg: '' });
                }
                break;
            case 'email':
                if (value === '') {
                    this.setState({ emailError: true, emailMsg: 'Email is Required' });
                }
                else {
                    this.setState({ emailError: false, emailMsg: '' });
                }
                break;
            case 'message':
                if (value === '') {
                    this.setState({ messageError: true, messageMsg: 'Message is Required' });
                }
                else {
                    this.setState({ messageError: false, messageMsg: '' });
                }
                break;
            default:
                //
                break;
        }

    }

    onSubmit = e => {
        e.preventDefault();
        const {
            fullName, email, message, contact,
            fullNameError, emailError, messageError, contactError,
        } = this.state;

        const { firestore } = this.props;

        // Validating
        if (
            fullName !== '' && email !== '' && message !== '' && contact !== '' &&
            !fullNameError && !emailError && !messageError && !contactError
        ) {
            // form is valid
            const newContact = {
                fullName,
                email,
                message,
                contact,
                createdAt: new Date()
            }

            firestore.add({ collection: 'customerContact' }, newContact).then(() => {
                this.setState({
                    showAlert: true,
                    alertMsg: 'Your message is submitted, We will contact you soon',
                    alertClass: 'alert alert-success',
                    fullName: '', email: '', message: '', contact: '',
                    fullNameError: false, emailError: false, messageError: false, contactError: false,
                })
            });
        }
        else {
            // form is not valid
            this.setState({
                showAlert: true,
                alertMsg: 'Please fill form and resolve fields as per instruction',
                alertClass: 'alert alert-danger',

            })
        }
    }

    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="contact" categories={categories} />
                    <Content state={this.state} onChange={this.onChange} onSubmit={this.onSubmit} />
                    <Footer categories={categories} />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

const Content = ({ state, onChange, onSubmit }) => {
    const { showAlert, alertMsg, alertClass } = state;
    return (
        <section className="bgwhite p-t-66 p-b-60">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-b-30">
                        <Help />
                    </div>

                    <div className="col-md-6 p-b-30">
                        {showAlert ? <Alert msg={alertMsg} alertClass={alertClass} /> : null}
                        <Form state={state} onChange={onChange} onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Alert = ({ msg, alertClass }) => {
    return (
        <div className={alertClass}>
            <small>{msg}</small>
        </div>
    )
}

const Help = () => {

    const Icon = ({ icon }) => {
        return (
            <span>
                <IconButton
                    className={classnames(
                        {
                            'font-youtube ': icon === 'youtube',
                            'font-twitter': icon === 'twitter',
                            'font-facebook': icon === 'facebook',
                            'font-instagram': icon === 'instagram'
                        }
                    )}>
                    <i className={classnames(
                        'fab',
                        {
                            'fa-youtube ': icon === 'youtube',
                            'fa-twitter': icon === 'twitter',
                            'fa-facebook': icon === 'facebook',
                            'fa-instagram': icon === 'instagram'
                        }
                    )}></i>
                </IconButton>
            </span>
        )
    }

    return (
        <div className=" p-b-30">
            <h3 className="p-t-15">How can we help?</h3>
            <span>Contact us with your questions and we’d be happy to help.</span>
            <div className="p-t-60">
                <h4>Follow us on: </h4>
            </div>
            <div className="footer_social contact-social mt-2">
                <div>
                    <Icon icon="youtube" />
                    <Icon icon="facebook" />
                    <Icon icon="instagram" />
                    <Icon icon="twitter" />
                </div>
            </div>
            <div className="p-t-60">
                <IconButton>
                    <i className="ti-email icon_set font-pink" />
                </IconButton>
                Mail at: customer-service@shopbox.pk
            </div>
            <div className="p-t-20 ">
                <IconButton>
                    <i className="ti-mobile icon_set font-pink" />
                </IconButton>
                Customer Service : 555-555-5555
            </div>
        </div>

    )
}

const Form = ({ state, onChange, onSubmit }) => {
    const {
        fullName, email, message, contact,
        fullNameError, emailError, messageError, contactError,
        fullNameMsg, emailMsg, messageMsg, contactMsg
    } = state;

    return (
        <form onSubmit={onSubmit} className="leave-comment">
            <h4 className="m-text26 p-b-36 p-t-15">
                Send us your message
            </h4>

            <div className={
                classnames('bo4 of-hidden size15 m-b-5',
                    { 'border border-danger': fullNameError }
                )}
            >
                <Input name="fullName" value={fullName} onChange={onChange} placeholder="Full Name" />
            </div>
            {fullNameError ? <Message msg={fullNameMsg} /> : null}

            <div className={
                classnames('mt-2 bo4 of-hidden size15 m-b-5',
                    { 'border border-danger': contactError }
                )}
            >
                <Input name="contact" value={contact} onChange={onChange} placeholder="Phone Number" />
            </div>
            {contactError ? <Message msg={contactMsg} /> : null}

            <div className={
                classnames('mt-2 bo4 of-hidden size15 m-b-5',
                    { 'border border-danger': emailError }
                )}
            >
                <Input name="email" type="email" value={email} onChange={onChange} placeholder="Email Address" />
            </div>
            {emailError ? <Message msg={emailMsg} /> : null}

            <textarea
                className={
                    classnames(
                        'dis-block s-text7 size20 bo4 p-l-22 p-r-22 p-t-13 m-b-5',
                        { 'border border-danger': messageError }
                    )
                }
                onChange={onChange}
                name="message"
                placeholder="Message"
                value={message}
            ></textarea>
            {messageError ? <Message msg={messageMsg} /> : null}

            <div className="w-size25 mt-2">
                {/* <!-- Button --> */}
                <button className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                    Send
                </button>
            </div>
        </form>
    )
}

const Input = ({ name, value, placeholder, onChange, type = 'text' }) => {
    return (
        <input
            className="sizefull bo4 s-text7 p-l-22 p-r-22"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

const Message = ({ msg }) => {
    return (
        <small className="text-danger error">
            {msg}
        </small>
    )
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'categories',
                limit: 3,
            },
        ]
    }),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
    }))
)(Contact);
