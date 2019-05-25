import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import numeral from 'numeral';
import { Grid } from '@material-ui/core';


class Orders extends Component {

    state = {
        showDispatched: false
    }

    onOrderDelete = orderId => {
        const { firestore } = this.props;

        firestore.delete({ collection: 'orders', doc: orderId });
    }

    showDispatchedToggle = () => this.setState(prevState => ({ showDispatched: !prevState.showDispatched }));

    render() {
        const { orders, ordersDispatched } = this.props;
        const { showDispatched } = this.state;

        const actionsForTitleBar = (
            <Grid item>
                <button onClick={this.showDispatchedToggle} className="btn btn-secondary btn-sm" style={{ marginTop: '7px', borderRadius: '5px' }}>
                    <i className="fas fa-truck mr-1"></i>
                    {
                        showDispatched ? 'Show Pending' : 'Show Dispatched'
                    }
                </button>
            </Grid>
        );

        let mainContent;

        if (orders && ordersDispatched) {

            // Ruppe Formatter
            const RupeeFormater = amount => numeral(amount).format('0,0');

            if (showDispatched) {
                mainContent = (
                    <React.Fragment>
                        <TitleBar titleName="Orders" actions={actionsForTitleBar} />
                        <h5>Showing Pending</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="font-weight-bold bg-light text-secondary">
                                    <tr>
                                        <td>Cust_Name</td>
                                        <td>Order Date</td>
                                        <td>Status</td>
                                        <td>Price</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ordersDispatched.map(order => {
                                            const { customer: { fullName }, totalPrice, status, id, deliveryCharges, createdAt } = order;
                                            return <tr key={id}>
                                                <td>{fullName}</td>
                                                <td>{createdAt}</td>
                                                <td className={classnames({
                                                    'text-danger': status === 'pending',
                                                    'text-success': status === 'dispatched'
                                                })}
                                                >{status}</td>
                                                <td className="font-weight-bold">
                                                    Rs. {RupeeFormater(parseInt(totalPrice.toString(), 10) + parseInt(deliveryCharges.toString(), 10))}
                                                </td>
                                                <td>
                                                    <Link to={`/order/${id}`} className="btn btn-sm btn-gray rounded-left rounded-right float-right">
                                                        <i className="fas fa-arrow-circle-right mr-1" />
                                                        Details
                                                    </Link>

                                                </td>
                                                <td>
                                                    <button onClick={() => { this.onOrderDelete(order.id) }} className="btn btn-danger btn-sm ml-1 rounded-left rounded-right float-left">
                                                        <i className="fas fa-trash mr-1" />
                                                        Delete
                                                    </button>

                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                )
            }
            else {
                mainContent = (
                    <React.Fragment>
                        <TitleBar titleName="Orders" actions={actionsForTitleBar} />
                        <h5>Showing Disptached</h5>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="font-weight-bold bg-light text-secondary">
                                    <tr>
                                        <td>Cust_Name</td>
                                        <td>Order Date</td>
                                        <td>Status</td>
                                        <td>Price</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(order => {
                                            const { customer: { fullName }, totalPrice, status, id, deliveryCharges, createdAt } = order;
                                            return <tr key={id}>
                                                <td>{fullName}</td>
                                                <td>{createdAt}</td>
                                                <td className={classnames({
                                                    'text-danger': status === 'pending',
                                                })}
                                                >{status}</td>
                                                <td className="font-weight-bold">Rs. {RupeeFormater(parseInt(totalPrice.toString(), 10) + parseInt(deliveryCharges.toString(), 10))}</td>
                                                <td>
                                                    <Link to={`/order/${id}`} className="btn btn-sm btn-gray rounded-left rounded-right">
                                                        <i className="fas fa-arrow-circle-right mr-1" />
                                                        Details
                                                    </Link>

                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                )
            }
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
            collection: 'orders',
            orderBy: [['orderedDate', 'desc']],
            where: [['status', '==', 'pending']],
        },
        {
            collection: 'orders',
            orderBy: [['orderedDate', 'desc']],
            where: [['status', '==', 'dispatched']],
            storeAs: 'ordersDispatched',
        }
    ]),
    connect(
        (state, props) => ({
            orders: state.firestore.ordered.orders,
            ordersDispatched: state.firestore.ordered.ordersDispatched
        })
    )
)(Orders);