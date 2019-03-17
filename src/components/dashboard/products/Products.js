import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { Grid } from '@material-ui/core';
// import Breadcrum from '../layout/Breadcrum';


class Products extends Component {

    state = {
        products: [],
        isAll: false,
        searchText: ''
    }

    static getDerivedStateFromProps(props, state) {
        const { products } = props;

        if (products && !state.isAll) {
            return { products }
        }

        return null;
    }

    onFilterProductTypeClick = type => {
        const { firebase } = this.props;
        const db = firebase.firestore();

        if (type === 'all') {
            this.setState({ isAll: false });
        }
        else {
            this.setState({ isAll: true });

            db.collection('products').where('productType', '==', type).get().then(querySnapshot => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    const prod = {
                        ...doc.data(),
                        id: doc.id
                    }
                    products.push(prod);
                });
                this.setState({ products });
            })
        }
    }


    onSortCategoryClick = category => {
        const { firebase } = this.props;
        const db = firebase.firestore();

        if (category === 'all') {
            this.setState({ isAll: false });
        }
        else {
            this.setState({ isAll: true });

            db.collection('products').where('category.id', '==', category.id).get().then(querySnapshot => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    const prod = {
                        ...doc.data(),
                        id: doc.id
                    }
                    products.push(prod);
                });
                this.setState({ products });
            })
        }


    }

    onChange = e => {
        this.setState({ searchText: e.target.value });

        const { firebase } = this.props;
        const { searchText } = this.state;
        const db = firebase.firestore();

        db.collection('products').orderBy('productName').startAt(searchText).endAt(searchText + "\uf8ff").get().then(querySnapshot => {
            const products = [];
            querySnapshot.forEach((doc) => {
                const prod = {
                    ...doc.data(),
                    id: doc.id
                }
                products.push(prod);
            });
            this.setState({ products });
        })

    }

    onSearch = () => {
        const { searchText } = this.state;
        console.log(searchText);
    }

    render() {

        const { products, searchText } = this.state;
        const { categories } = this.props;
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
                    <TitleBar titleName="Products" actions={actionsForTitleBar} />

                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={searchText}
                                    name="searchText"
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Product Name"
                                />
                                <div className="input-group-append">
                                    <button onClick={this.onSearch} className="btn btn-secondary rounded-right">
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
                                    {
                                        categories
                                            ? categories.map(cat => (
                                                <div
                                                    key={cat.id}
                                                    className="dropdown-item"
                                                    onClick={() => { this.onSortCategoryClick(cat) }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {cat.catName}
                                                </div>
                                            ))
                                            : <Loader />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-auto mt-3">
                            <div className="dropdown">
                                <button className="btn btn-secondary btn-sm dropdown-toggle rounded-right rounded-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Filter By Product Type
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { this.onFilterProductTypeClick('published') }}>Published</a>
                                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { this.onFilterProductTypeClick('unpublish') }}>UnPublished</a>
                                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { this.onFilterProductTypeClick('all') }}>Show All</a>
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
    firebaseConnect(),
    firestoreConnect(props => [
        {
            collection: 'products',
            orderBy: [['createdAt', 'desc']],
        },
        {
            collection: 'categories',
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect((state, props) => ({
        products: state.firestore.ordered.products,
        categories: state.firestore.ordered.categories,
    })),
)(Products);
