import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Orders extends Component {
    render() {
        const { orders } = this.props;
        let mainContent;

        if (orders) {
            mainContent = (
                <React.Fragment>
                    <TitleBar titleName="Orders" />
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
                                        const { customer: { fullName }, orderedDate: { date, month, year }, totalPrice, status, id } = order;
                                        return <tr key={id}>
                                            <td>{fullName}</td>
                                            <td>{`${date}/${month}/${year}`}</td>
                                            <td className={classnames({
                                                'text-danger': status === 'pending',
                                            })}
                                            >{status}</td>
                                            <td>{totalPrice}</td>
                                            <td>
                                                <Link to={`/dashboard/order/${id}`} className="btn btn-sm btn-gray rounded-left rounded-right">
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
        { collection: 'orders', where: [['status', '==', 'pending']] }
    ]),
    connect(
        (state, props) => ({
            orders: state.firestore.ordered.orders
        })
    )
)(Orders);