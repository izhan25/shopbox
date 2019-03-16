import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Loader from '../../layout/Loader';
import TitleBar from '../layout/TitleBar';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class CustomerDetails extends Component {
    render() {
        const { customer } = this.props;
        let mainContent;

        if (customer) {
            const { date, month, year } = customer.birthDate;
            mainContent = (
                <React.Fragment>
                    <Link to="/dashboard/customers" className="btn btn-link">
                        <i class="fas fa-arrow-circle-left mr-1"></i>Back To Customers
                    </Link>
                    <TitleBar titleName="Customer Details" />
                    <div className="card">
                        <div className="card-header bg-light text-secondary">
                            ID: {customer.id}
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2 text-secondary">Full Name:</div>
                                <div className="col-md-5 text-capitalize">{customer.fullName}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2 text-secondary">User Name:</div>
                                <div className="col-md-5">{customer.userName}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2 text-secondary">Birth Date:</div>
                                <div className="col-md-5">{`${date}/${month}/${year}`}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2 text-secondary">Contact:</div>
                                <div className="col-md-5">{customer.contact}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2 text-secondary">Email:</div>
                                <div className="col-md-5">{customer.email}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-2 text-secondary">Address:</div>
                                <div className="col-md-5">{customer.address}</div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else {
            mainContent = <Loader />
        }

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

export default compose(
    firestoreConnect(props => [
        { collection: 'customers', storeAs: 'customer', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        customer: ordered.customer && ordered.customer[0]
    }))
)(CustomerDetails);