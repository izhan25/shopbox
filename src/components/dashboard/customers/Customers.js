import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';


class Customers extends Component {
    render() {

        const { customers } = this.props;
        let mainContent;

        if (customers) {
            mainContent = (
                <React.Fragment>
                    <TitleBar titleName="Customers" />
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="font-weight-bold bg-light text-secondary">
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Contact</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map(cust => (
                                        <tr key={cust.id}>
                                            <td>{cust.fullName}</td>
                                            <td>{cust.email}</td>
                                            <td>{cust.contact}</td>
                                            <td>
                                                <Link to={`/customer/${cust.id}`} className="btn btn-sm btn-gray rounded-left rounded-right"> <i className="fas fa-arrow-circle-right" /> Details</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            )
        }
        else {
            mainContent = <Loader />;
        }


        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

export default compose(
    firestoreConnect([
        {
            collection: 'customers',
            orderBy: [['fullName', 'desc']]
        }
    ]),
    connect(
        (state, props) => ({
            customers: state.firestore.ordered.customers
        })
    )
)(Customers);