import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import PropTypes from 'prop-types';
import Loader from '../../layout/Loader';
import TitleBar from '../layout/TitleBar';
import InventoryInfoBox from '../layout/InventoryInfoBox';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';



class ProductDetails extends Component {

    // Deleting Product
    onDeleteClick = () => {
        const { product, firestore, history } = this.props;

        confirmAlert({
            message: 'Are You Sure You Want To Delete This Product',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        firestore.delete({ collection: 'products', doc: product.id })
                            .then(history.push('/products'));
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        //
                    }
                }
            ]
        })


    }

    render() {

        const { product } = this.props;
        let mainContent;

        if (product) {
            const { images } = product.productImages;

            mainContent = (
                <React.Fragment>
                    <Link to="/products" className="btn btn-link">
                        <i className="fas fa-arrow-circle-left mr-1"></i>Back To Products
                    </Link>
                    <TitleBar titleName="Product Details" />
                    <div className="row">

                        <div className="col-md-4">
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    {images.map(
                                        img => (
                                            <div key={images.indexOf(img)} className={classnames('carousel-item', { 'active': images.indexOf(img) === 0 })}>
                                                <img src={img} className="d-block w-100" alt="..." />
                                            </div>
                                        )
                                    )}
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="fas fa-arrow-left text-dark" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="fas fa-arrow-right text-dark" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>ID: {product.id}</h5>
                                        </div>
                                        <div className="col">
                                            <span className="btn-group float-right" role="group">
                                                <Link to={`/product/edit/${product.id}`} className="btn btn-secondary btn-sm rounded-left">
                                                    Edit
                                                </Link>
                                                <button type="button" onClick={this.onDeleteClick} className="btn btn-danger btn-sm rounded-right">Delete</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">Product Name:</b>
                                        </div>
                                        <div className="col text-capitalize">
                                            {product.productName}
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">Category:</b>
                                        </div>
                                        <div className="col text-capitalize">
                                            {product.category.catName}
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">Original Price:</b>
                                        </div>
                                        <div className="col text-capitalize">
                                            {product.originalPrice}
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">Discount Price:</b>
                                        </div>
                                        <div className="col text-capitalize">
                                            {product.discountPrice}
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">Description:</b>
                                        </div>
                                        <div className="col text-capitalize">
                                            {product.description}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row p-2">
                                        <div className="col-md-4">
                                            <b className="text-right">State:</b>
                                        </div>
                                        <div className="col text-capitalize font-weight-bold">
                                            <span className={classnames({
                                                'text-success': product.published === 'published',
                                                'text-danger': product.published !== 'published'
                                            })}>
                                                {product.published}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-3 mt-1">
                                            <InventoryInfoBox title="Stock" amount={product.productStatus.stockQty} color="#66bb6a" />
                                        </div>
                                        <div className="col-md-3 mt-1">
                                            <InventoryInfoBox title="Low Level" amount={product.productStatus.lowOrderLevel} color="#78909c" />
                                        </div>
                                        <div className="col-md-3 mt-1">
                                            <InventoryInfoBox title="Sold" amount={product.productStatus.orderQty} color="#ef5350" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </React.Fragment>
            )
        }
        else {
            mainContent = (
                <Loader />
            );
        }

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

ProductDetails.propTypes = {
    firestore: PropTypes.object.isRequired,
    product: PropTypes.object
}


export default compose(
    firestoreConnect(props => [
        { collection: 'products', storeAs: 'product', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        product: ordered.product && ordered.product[0]
    }))
)(ProductDetails);
