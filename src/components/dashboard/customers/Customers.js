import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';


class Customers extends Component {

    // onOrderDelete = id => {
    //     const { firestore } = this.props;

    //     firestore.delete({ collection: 'customers', doc: id });
    // }
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
                                    <td>Sr #.</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Contact</td>
                                    <td></td>
                                    {/* <td></td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map(cust => (
                                        <tr key={cust.id}>
                                            <td>{parseInt(customers.indexOf(cust), 10) + 1}</td>
                                            <td>{cust.fullName}</td>
                                            <td>{cust.email}</td>
                                            <td>{cust.contact}</td>
                                            <td>
                                                <Link to={`/customer/${cust.id}`} className="btn btn-sm btn-gray rounded-left rounded-right"> <i className="fas fa-arrow-circle-right" /> Details</Link>
                                            </td>
                                            {/* <td>
                                                <button onClick={() => { this.onOrderDelete(cust.id) }} className="btn btn-danger btn-sm rounded-left rounded-right float-left">
                                                    <i className="fas fa-trash mr-1" />
                                                    Delete
                                                </button>
                                            </td> */}
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
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect(
        (state, props) => ({
            customers: state.firestore.ordered.customers
        })
    )
)(Customers);