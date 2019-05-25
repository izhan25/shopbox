import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Loader from '../../layout/Loader';
import TitleBar from '../layout/TitleBar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import classnames from 'classnames';
import numeral from 'numeral';

class OrderDetails extends Component {

    state = {
        showDispatchError: false,
        cancel: true
    }

    onDispatch = () => {

        const { firestore, order, history, firebase } = this.props;

        if (order) {
            const updOrder = {
                ...order,
                status: 'dispatched'
            }

            firestore.update({ collection: 'orders', doc: order.id }, updOrder)
                .then(() => {
                    // Updating Product Status after dispatching
                    const { products } = order;
                    const db = firebase.firestore();

                    products.forEach(prod => {
                        let prevSold = parseInt(prod.productStatus.orderQty.toString(), 10);
                        let stock = parseInt(prod.productStatus.stockQty.toString(), 10);

                        if (!prevSold) {
                            prevSold = 0
                        }
                        if (!stock) {
                            stock = 0
                        }

                        let newSold = prevSold + prod.qty;
                        let newStock = stock - prod.qty;

                        let updProductStatus = {
                            ...prod.productStatus,
                            stockQty: newStock,
                            orderQty: newSold
                        }

                        db.collection('products').doc(prod.id)
                            .update({ productStatus: updProductStatus })
                            .then(() => {
                                console.log('Product Updated SuccessFully');
                            })
                            .catch(error => {
                                console.log(error.message);
                            });

                    })
                })
                .then(history.push('/orders'));
        }

    }

    render() {

        const { order } = this.props;
        const { showDispatchError } = this.state;
        let mainContent;

        if (order) {
            const {
                customer: { fullName, contact, address, email },
                products,
                status,
                totalPrice,
                deliveryDuration,
                deliveryCharges,
                createdAt
            } = order;


            // Ruppe Formatter
            const RupeeFormater = amount => numeral(amount).format('0,0');

            mainContent = (
                <React.Fragment>
                    <TitleBar titleName="Order Details" />

                    {
                        order.status === 'pending'
                            ? <div className="row mb-3">
                                <div className="col-md-12">
                                    <button className="btn btn-lg- btn-gray rounded-right rounded-left" onClick={this.onDispatch}>Dispatch This Order</button>
                                </div>
                            </div>
                            : null
                    }

                    {
                        showDispatchError
                            ? <div className="alert alert-danger">
                                You can't disptach this order because some products are out-of-stock
                            </div>
                            : null
                    }

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
                                            {createdAt}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Delivery Duration</div>
                                        <div className="col-md-4">
                                            {deliveryDuration}
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
                                <table className="table table-striped table-bordered">
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
                                                    <td>{prod.qty} pcs</td>
                                                    <td>{RupeeFormater(prod.discountPrice)}</td>
                                                    <td>{RupeeFormater(prod.totalPrice)}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr className="font-weight-bold">
                                            <td colSpan="6" className="text-right">Delivery Charges</td>
                                            <td>{RupeeFormater(deliveryCharges)}</td>
                                        </tr>
                                        <tr className="font-weight-bold bg-secondary text-light" style={{ fontSize: '24px' }}>
                                            <td colSpan="6" className="text-right mr-4">TOTAL AMOUNT</td>
                                            <td>Rs. {RupeeFormater(parseInt(totalPrice.toString(), 10) + parseInt(deliveryCharges.toString(), 10))}</td>
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
    firebaseConnect(),
    firestoreConnect(props => [
        { collection: 'orders', storeAs: 'order', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        order: ordered.order && ordered.order[0]
    }))
)(OrderDetails);