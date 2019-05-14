import React, { Component } from 'react';
import Loader from '../../layout/LoaderForPublic';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

class ForgotPassword extends Component {

    state = {
        email: '',
        submitForm: false
    }

    componentDidMount() {
        scrollToTop();
    }

    onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        if (value === '') {
            this.setState({ submitForm: false });
        }
        else {
            this.setState({ submitForm: true });
        }

        // setting state
        this.setState({
            [name]: value,
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const { email } = this.state;
        const { firebase, history } = this.props;
        const auth = firebase.auth();

        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                // Email sent.
                Swal.fire({
                    type: 'success',
                    text: 'An email has been sent to your email address kindly check'
                }).then((result) => {
                    if (result.value) {
                        history.push('/login');
                    }
                })
            })
            .catch(error => {
                // An error happened.
                console.log('An error happened => ', error);
            });

    }

    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <div className="bg-white">
                    <Header activePage="login" categories={categories} history={this.props.history} />

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7">

                            <div className="card mt-3">
                                <div className="card-header">Forget Password</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit}>
                                        <InputRow
                                            name="email"
                                            label="Enter your email to reset password"
                                            type="email"
                                            onChange={this.onChange}
                                        />
                                        {
                                            this.state.submitForm
                                                ? <input
                                                    type="submit"
                                                    value="Send Email"
                                                    className="btn btn-pink float-right rounded-right rounded-left"
                                                />
                                                : <input
                                                    type="submit"
                                                    value="Send Email"
                                                    className="btn btn-pink float-right rounded-right rounded-left"
                                                    disabled
                                                />
                                        }
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Footer categories={categories} />
                </div>
            );
        }
        else {
            return <Loader />;
        }
    }
}

const InputRow = ({ type = 'text', label, name, onChange, defaultValue }) => {
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
            }
        ),
    ),
)(ForgotPassword);