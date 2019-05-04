import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import { Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Orders extends Component {


    state = {
        orders: [],
        view: false,
    }

    static getDerivedStateFromProps(props, state) {
        const { orders } = props;

        if (orders) {
            return { orders }
        }

        return null;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ view: true })
        }, 1000);
    }


    render() {
        const { history } = this.props;
        const { orders, view } = this.state;
        let mainContent;

        // moment date and time
        const dateFormatter = date => {
            let value = Date(date).toString();
            return moment(Date.parse(value)).format('LL');
        }


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
                                                <td>{dateFormatter(order.orderedDate)}</td>
                                                <td>Rs.{order.totalPrice}</td>
                                                <td className="text-capitalize">{order.status}</td>
                                                <td className="d-flex justify-content-center">
                                                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-pink rounded-left rounded-right">
                                                        View
                                                    </Link>
                                                    <button
                                                        className="btn btn-sm btn-light rounded-left rounded-right ml-1"
                                                        style={{ border: '1px solid rgb(230, 85, 64)' }}
                                                    >
                                                        Download
                                                    </button>
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
                                            <div className="col-md-6">{dateFormatter(order.orderedDate)}</div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6 font-weight-bold">Total:</div>
                                            <div className="col-md-6">Rs.{order.totalPrice}</div>
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
                where: ['customer.email', '==', 'test@gmail.com'],
            }
        ]
    ),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            customer: state.customer.customer,
            orders: state.firestore.ordered.orders
        }),
    )
)(Orders);
