import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import numeral from 'numeral';

class Orders extends Component {


    state = {
        orders: [],
        view: false,
    }


    componentDidMount() {

        const { firebase, auth } = this.props;
        const db = firebase.firestore();
        const orders = [];

        db.collection('orders').orderBy('orderedDate', 'desc').where('customer.email', '==', auth.email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let order = {
                        id: doc.id,
                        ...doc.data()
                    }
                    orders.push(order);
                });

                this.setState({ orders });
            })
            .catch(err => console.log(err.message));

        setTimeout(() => {
            this.setState({ view: true })
        }, 1000);
    }


    render() {
        const { history } = this.props;
        const { orders, view } = this.state;
        let mainContent;

        // Rupee Formatter
        const RupeeFormatter = amount => numeral(amount).format('0,0');

        if (orders && view) {
            mainContent = (
                <React.Fragment>
                    {/* Desktop View */}
                    <Hidden xsDown>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="font-weight-bold text-light bg-dark">
                                    <tr>
                                        <td>Order ID</td>
                                        <td>Date</td>
                                        <td>Total</td>
                                        <td>Status</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(order =>
                                            <tr key={order.id}>
                                                <td>
                                                    <small>
                                                        {order.id}
                                                    </small>
                                                </td>
                                                <td>{order.createdAt}</td>
                                                <td>Rs.{RupeeFormatter(parseInt(order.totalPrice.toString(), 10) + parseInt(order.deliveryCharges.toString(), 10))}</td>
                                                <td
                                                    className={classnames('text-capitalize font-weight-bold', {
                                                        'text-success': order.status === 'dispatched',
                                                        'text-primary': order.status === 'pending'
                                                    })}
                                                >
                                                    {order.status}
                                                </td>
                                                <td className="d-flex justify-content-center">
                                                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-pink rounded-left rounded-right">
                                                        View
                                                    </Link>
                                                    {/* <button
                                                        className="btn btn-sm btn-light rounded-left rounded-right ml-1"
                                                        style={{ border: '1px solid rgb(230, 85, 64)' }}
                                                    >
                                                        Download
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Hidden>

                    {/* Mobile View */}
                    <Hidden smUp>
                        {
                            orders.map(order =>
                                <div className="card" key={order.id}>
                                    <div className="card-header">
                                        <small>OrderID: {order.id}</small>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 font-weight-bold">Date:</div>
                                            <div className="col-md-6">{order.createdAt}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6 font-weight-bold">Total:</div>
                                            <div className="col-md-6">Rs.{RupeeFormatter(parseInt(order.totalPrice.toString(), 10) + parseInt(order.deliveryCharges.toString(), 10))}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6 font-weight-bold">Status:</div>
                                            <div className="col-md-6 text-capitalize">{order.status}</div>
                                        </div>
                                        <Link to={`/orders/${order.id}`} className="btn btn-sm btn-pink rounded-left rounded-right mt-2 float-right">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </Hidden>

                </React.Fragment>
            );
        }
        else {
            mainContent =
                <div style={{ marginTop: '50px' }}>
                    <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
                </div>
        }

        return <Dashboard mainContent={mainContent} history={history} />
    }
}

export default compose(
    firebaseConnect(),
    firestoreConnect(
        [
            {
                collection: 'orders',
            }
        ]
    ),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            customer: state.customer.customer,
        }),
    )
)(Orders);
