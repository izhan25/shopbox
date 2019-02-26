import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import Breadcrum from '../layout/Breadcrum';
import PropTypes from 'prop-types';
import Loader from '../../layout/Loader';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


class ProductDetails extends Component {

    render() {
        const history = [
            { link: '/dashboard', title: 'Dashboard' },
            { link: '/dashboard/products', title: 'Products' },
        ];
        const { product } = this.props;
        let mainContent;

        if (product) {
            mainContent = (
                <div>
                    <Breadcrum history={history} current="Product Details" />
                    <div className="row">
                        <div className="col-md-8">
                            <h1>{product.productName}</h1>
                            <p>{product.category.catName}</p>
                            <br />
                            <p>Description: {product.description}</p>
                            <p>Original Price: {product.originalPrice}</p>
                            <p>Discount Price: {product.discountPrice}</p>
                            <button className="btn btn-secondary btn-sm">Show All Images</button>
                        </div>
                        <div className="col-md-4">
                            <img src={product.productImages.images[0]} title="Tshirt" alt="img" className="img-fluid" />
                        </div>
                    </div>
                </div>
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
