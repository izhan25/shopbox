import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import numeral from 'numeral';

class OrderDetails extends Component {

    state = {
        order: null
    }

    static getDerivedStateFromProps(props, state) {
        const { order } = props;

        if (order) {
            return { order }
        }

        return null;
    }


    render() {
        const { history } = this.props;
        const { order } = this.state;
        let mainContent;

        // Ruppe Formatter
        const RupeeFormater = amount => numeral(amount).format('0,0');


        if (order) {
            const {
                customer: { fullName, contact, address, email },
                orderedDate,
                products,
                status,
                totalPrice,
                deliveryDuration,
                deliveryCharges,
            } = order;

            mainContent = (
                <React.Fragment>
                    <Link to="/orders" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left mr-1"></i>Back To Orders
                    </Link>


                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header bg-light font-weight-bold">
                                    Order Information
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">Order ID</div>
                                        <div className="col-md-8">{order.id}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Status</div>
                                        <div className={classnames('col-md-8', {
                                            'text-danger': status === 'pending',
                                            'text-success': status === 'dispatched'
                                        })}
                                        >{status}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Ordered Date</div>
                                        <div className="col-md-8">
                                            {orderedDate.toString()}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Delivery Duration</div>
                                        <div className="col-md-8">
                                            {deliveryDuration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-light font-weight-bold">
                                    Delivery Details
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Name</div>
                                        <div className="col-md-8 text-capitalize">{fullName}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Email</div>
                                        <div className="col-md-8">{email}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Contact</div>
                                        <div className="col-md-8">{contact}</div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-4 text-secondary">Address</div>
                                        <div className="col-md-8">{address}</div>
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
                                            <td>Rs. {RupeeFormater(totalPrice + deliveryCharges)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
    firestoreConnect(props => [
        {
            collection: 'orders',
            doc: props.match.params.id,
            storeAs: 'order'
        }
    ]),
    connect(
        ({ firestore: { ordered } }, props) => ({
            order: ordered.order && ordered.order[0]
        }),
    )
)(OrderDetails);
