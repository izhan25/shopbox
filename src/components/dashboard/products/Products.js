import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { Grid } from '@material-ui/core';
import Breadcrum from '../layout/Breadcrum';


class Products extends Component {

    state = {
        products: []
    }

    static getDerivedStateFromProps(props, state) {
        const { products } = props;

        if (products) {
            return { products }
        }

        return null;
    }

    onFilterProductTypeClick = type => {
        //
    }


    onFilterByStockStatusClick = status => {
        //
    }

    onSortCategoryClick = category => {
        // console.log(category);
    }

    render() {

        const { products } = this.state;
        const history = [
            { link: '/dashboard', title: 'Dashboard' },
        ];
        const actionsForTitleBar = (
            <Grid item>
                <Link to="/dashboard/product/add" className="btn btn-secondary btn-sm" style={{ marginTop: '7px', borderRadius: '5px' }}>
                    <i className="fas fa-plus-circle"></i> ADD NEW
                                </Link>
            </Grid>
        );
        let mainContent;

        if (products) {
            mainContent = (
                <React.Fragment>
                    <Breadcrum history={history} current="Products" />
                    <TitleBar titleName="Products" actions={actionsForTitleBar} />

                    <div className="row">
                        <div className="col-xs-6 col-md-8 ">
                            <button className="btn btn-link" style={{ fontSize: '14px' }}>
                                All
                                    <span style={{ color: 'gray' }}>
                                    (24)
                                    </span>
                            </button>
                            <button className="btn btn-link" style={{ fontSize: '14px' }}>
                                Published
                                    <span style={{ color: 'gray' }}>
                                    (10)
                                    </span>
                            </button>
                            <button className="btn btn-link" style={{ fontSize: '14px' }}>
                                Trash
                                    <span style={{ color: 'gray' }}>
                                    (0)
                                    </span>
                            </button>
                        </div>
                        <div className="col-xs-6 col-md-4 float-right">
                            <div className="input-group">
                                <input type="text" name="searchBox" className="form-control" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary rounded-right">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-auto mt-3">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle rounded-right rounded-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Sort By Category
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => { this.onSortCategoryClick('all') }} style={{ cursor: 'pointer' }}>Show All</a>
                                    {products.map(prod => (
                                        <div
                                            key={prod.id}
                                            className="dropdown-item"
                                            onClick={() => { this.onSortCategoryClick(prod.category) }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {prod.category.catName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-auto mt-3">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle rounded-right rounded-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Filter By Product Type
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => { this.onFilterProductTypeClick('published') }}>Published</a>
                                    <a className="dropdown-item" onClick={() => { this.onFilterProductTypeClick('unpublished') }}>UnPublished</a>
                                    <a className="dropdown-item" onClick={() => { this.onFilterProductTypeClick('all') }}>Show All</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-auto mt-3">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle rounded-right rounded-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Filter By Stock Status
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => { this.onFilterByStockStatusClick('low stock') }}>Low Stock</a>
                                    <a className="dropdown-item" onClick={() => { this.onFilterByStockStatusClick('available') }}>Available</a>
                                    <a className="dropdown-item" onClick={() => { this.onFilterByStockStatusClick('all') }}>Show All</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="font-weight-bold">
                                <tr>
                                    <th><i className="far fa-image" style={{ fontSize: '25px' }}></i></th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Product Type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(prod => (
                                        <tr key={prod.id}>
                                            <td style={{ width: '80px' }}>  <img src={prod.productImages.images[0]} alt="img" className="img-fluid" /> </td>
                                            <td className="text-capitalize">{prod.productName}</td>
                                            <td>{prod.category.catName}</td>
                                            <td>{prod.productStatus.stockQty} pcs</td>
                                            <td>{prod.productType}</td>
                                            <td>
                                                <Link to={`/dashboard/product/${prod.id}`} className="btn btn-secondary btn-sm" style={{ borderRadius: '3px' }}>
                                                    <i className="fas fa-arrow-circle-right" /> Details
                                                </Link>
                                            </td>
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

Products.propTypes = {
    firestore: PropTypes.object.isRequired,
    products: PropTypes.array
}

export default compose(
    firestoreConnect([
        { collection: 'products' }
    ]),
    connect((state, props) => ({
        products: state.firestore.ordered.products
    })),
)(Products);
