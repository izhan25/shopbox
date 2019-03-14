import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Loader from '../../layout/Loader';
import TitleBar from '../layout/TitleBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';


class OrderDetails extends Component {

    onDispatch = () => {
        const { firestore, order, history } = this.props;

        if (order) {
            const updOrder = {
                ...order,
                status: 'dispatched'
            }

            firestore.update({ collection: 'orders', doc: order.id }, updOrder)
                .then(history.push('/dashboard/orders'));
        }
    }

    render() {

        const { order } = this.props;
        let mainContent;

        if (order) {
            const {
                customer: { fullName, contact, address, email },
                status,
                orderedDate,
                deliveryDate,
                totalPrice,
                products,
            } = order;


            mainContent = (
                <React.Fragment>
                    <TitleBar titleName="Order Details" />

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <button className="btn btn-lg- btn-gray rounded-right rounded-left" onClick={this.onDispatch}>Dispatch This Order</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header bg-light font-weight-bold">
                                    Customer Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Name</div>
                                        <div className="col-md-4 text-capitalize">{fullName}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Email</div>
                                        <div className="col-md-4">{email}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Contact</div>
                                        <div className="col-md-4">{contact}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Address</div>
                                        <div className="col-md-4">{address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">

                            <div className="card">
                                <div className="card-header bg-light font-weight-bold">
                                    Order Information
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Status</div>
                                        <div className={classnames('col-md-4', {
                                            'text-danger': status === 'pending',
                                            'text-success': status === 'dispatched'
                                        })}
                                        >{status}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Ordered Date</div>
                                        <div className="col-md-4">
                                            {`${orderedDate.date}/${orderedDate.month}/${orderedDate.year}`}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Delivery Date</div>
                                        <div className="col-md-4">
                                            {`${deliveryDate.date}/${deliveryDate.month}/${deliveryDate.year}`}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Delivery Duration</div>
                                        <div className="col-md-4">
                                            {parseInt(deliveryDate.date, 10) - parseInt(orderedDate.date, 10)} days
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header bg-light font-weight-bold">
                            Products Details
                            </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead className="font-weight-bold">
                                        <tr>
                                            <th><i className="far fa-image" style={{ fontSize: '25px' }}></i></th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Stock</th>
                                            <th>Qty</th>
                                            <th>Unit Price</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map(prod => (
                                                <tr key={prod.id}>
                                                    <td style={{ width: '80px' }}>  <img src={prod.productImages.images[0]} alt="img" className="img-fluid" /> </td>
                                                    <td className="text-capitalize">{prod.productName}</td>
                                                    <td>{prod.category.catName}</td>
                                                    <td>{prod.productStatus.stockQty}</td>
                                                    <td>{prod.orderedQty} pcs</td>
                                                    <td>{prod.discountPrice}</td>
                                                    <td>{prod.price}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr className="font-weight-bold bg-secondary text-light" style={{ fontSize: '24px' }}>
                                            <td colSpan="6" className="text-right mr-4">TOTAL AMOUNT</td>
                                            <td>{totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
        { collection: 'orders', storeAs: 'order', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        order: ordered.order && ordered.order[0]
    }))
)(OrderDetails);