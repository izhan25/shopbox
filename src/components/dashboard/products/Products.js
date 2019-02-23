import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import ContentHolder from '../layout/ContentHolder';
import Loader from '../../layout/Loader';
import { Grid } from '@material-ui/core';
import Breadcrum from '../layout/Breadcrum';
import TitleBar from '../layout/TitleBar';


class Products extends Component {

    state = {
        products: null
    }


    onSortCategoryClick = category => {
        const { products } = this.props;

        if (category === 'all') {
            this.setState({ products });
            return true;
        }

        const newProducts = products.filter(product => product.category === category);

        this.setState({ products: newProducts });

        console.log(this.state)

    }

    onFilterProductTypeClick = type => {
        console.log(type);
    }


    onFilterByStockStatusClick = status => {
        console.log(status);
    }

    render() {
        const history = [{ link: '/dashboard', title: 'Dashboard' }];
        const actionsForTitleBar = (
            <Grid item>
                <Link to="/dashboard/product/add" className="btn btn-secondary btn-sm" style={{ marginTop: '7px', borderRadius: '5px' }}>
                    <i className="fas fa-plus-circle"></i> ADD NEW
                </Link>
            </Grid>
        );

        let mainContent;

        if (this.state.products != null) {

            const { products } = this.state;
            const { categories } = this.props;

            if (categories) {
                mainContent = (
                    <div>
                        <Breadcrum history={history} current="Products" />
                        <TitleBar titleName="Products" actions={actionsForTitleBar} />

                        <div className="row mt-3">
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
                                        {categories.map(cat => (
                                            <div
                                                key={cat.id}
                                                className="dropdown-item"
                                                onClick={() => { this.onSortCategoryClick(cat.category) }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {cat.catName}
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
                                <thead className="thead-inverse font-weight-bold">
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
                                                <td>{prod.category}</td>
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
                    </div >
                )
            }
            else {
                mainContent = (
                    <Loader />
                );
            }

        }
        else {
            const { products, categories } = this.props;

            if (products && categories) {
                mainContent = (
                    <div>
                        <Breadcrum history={history} current="Products" />
                        <Grid container>
                            <Grid container>
                                <Grid item>
                                    <h2 className="mr-3">Products</h2>
                                </Grid>
                                <Grid item>
                                    <Link to="/dashboard/product/add" className="btn btn-secondary btn-sm" style={{ marginTop: '7px', borderRadius: '5px' }}>
                                        <i className="fas fa-plus-circle"></i> ADD NEW
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>

                        <div className="row mt-3">
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
                                        {categories.map(cat => (
                                            <div
                                                key={cat.id}
                                                className="dropdown-item"
                                                onClick={() => { this.onSortCategoryClick(cat.category) }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {cat.catName}
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
                                <thead className="thead-inverse font-weight-bold">
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
                                                <td>{prod.category}</td>
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
                    </div >
                )
            }
            else {
                mainContent = (
                    <Loader />
                );
            }
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
        { collection: 'products' },
        { collection: 'categories' }
    ]),
    connect((state, props) => ({
        products: state.firestore.ordered.products,
        categories: state.firestore.ordered.categories,
    })),
)(Products);
