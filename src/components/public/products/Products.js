import React, { Component } from 'react'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loader from '../../layout/LoaderForPublic';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import scrollToTop from '../functions/scrollToTop';
import { addItem } from '../../../actions/cartActions';
import { Grid } from '@material-ui/core';
import Snack from '../layout/Snack';
import Product from '../layout/Product';


class Products extends Component {
    state = {
        searchText: '',
        categories: [],
        products: [],
        catDisplay: 'Select Category',

        openSnackBar: false,
        msgSnackBar: '',
        view: false,
    }

    componentDidMount() {
        scrollToTop();
    }

    static getDerivedStateFromProps(props, state) {
        const { categories, products } = props;

        if (categories && products) {
            return {
                categories,
                products
            }
        }

        return null;

    }

    onSearchTextChange = e => {
        const value = e.target.value;
        this.setState({ searchText: value })
    }

    gotoCat = cat => {
        if (cat === 'all') {
            this.setState(prevState => ({ catDisplay: 'Select Category' }));

            this.props.history.push('/products');
        }
        else {
            this.setState(prevState => ({ catDisplay: cat.catName }));

            this.props.history.push(`/products/category/${cat.id}`);
        }
    }

    addItemToCart = product => {
        const { addItem } = this.props;

        const newProduct = {
            ...product,
            qty: 1,
            totalPrice: product.discountPrice
        }

        addItem(newProduct);
        this.setState(prevState => ({ openSnackBar: true, msgSnackBar: 'Added To Cart' }));
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    render() {
        const { categories, openSnackBar, msgSnackBar } = this.state;

        const functions = {
            addItemToCart: this.addItemToCart,
        }

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="products" categories={categories} history={this.props.history} />
                    <Content state={this.state} onSearchTextChange={this.onSearchTextChange} gotoCat={this.gotoCat} functions={functions} />
                    <Footer categories={categories} />
                    <Snack
                        openSnackBar={openSnackBar}
                        handleCloseSnackBar={this.handleCloseSnackBar}
                        msgSnackBar={msgSnackBar}
                    />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

const Content = ({ state, onSearchTextChange, gotoCat, functions }) => {

    // eslint-disable-next-line
    const { categories, searchText, products, catDisplay } = state;
    return (
        <section className="bgwhite p-t-55 p-b-65">
            <div className="container">
                {/* <SearchBar searchText={searchText} onSearchTextChange={onSearchTextChange} /> */}
                <Hidden mdUp>
                    <CategoriesForMobile categories={categories} gotoCat={gotoCat} catDisplay={catDisplay} />
                </Hidden>
                <Grid container>
                    <Hidden smDown>
                        <CategoriesForDesktop categories={categories} />
                    </Hidden>
                    <ProductsShowcase products={products} functions={functions} />
                </Grid>
            </div>
        </section>
    )
}

const CategoriesForMobile = ({ categories, gotoCat, catDisplay }) => {

    return (
        <div className="dropdown mb-3">
            <button className="btn btn-pink dropdown-toggle btn-block rounded-right rounded-left" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {catDisplay}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { gotoCat('all') }}>
                    All
                </a>
                {
                    categories.map(cat =>
                        <a
                            key={cat.id}
                            className="dropdown-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => { gotoCat(cat) }}
                        >
                            {cat.catName}
                        </a>
                    )
                }

            </div>
        </div>
    )
}

// eslint-disable-next-line
const SearchBar = ({ searchText, onSearchTextChange }) => {
    return (
        <div className="search-product pos-relative bo4 of-hidden mb-3">
            <input
                className="s-text7 size6 p-l-23 p-r-50"
                type="text"
                value={searchText}
                onChange={onSearchTextChange}
                name="search-product"
                placeholder="Search Products..."
            />

            <button className="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
                <i className="fs-12 fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    )
}

const CategoriesForDesktop = ({ categories }) => {

    if (categories) {
        return (
            <Grid item xs={2} sm={2} md={2} className="col-sm-6 col-md-4 col-lg-3 p-b-50" >
                <div className="leftbar p-r-20 p-r-0-sm">
                    <h4 className="m-text14 p-b-7">
                        Categories
                        </h4>
                    <ul className="p-b-54">
                        <li className="p-t-4">
                            <Link to="/products" className="s-text13 active1">
                                <i className="fas fa-chevron-circle-right mr-1"></i>
                                All
                                </Link>
                        </li>
                        {
                            categories.map(cat => (
                                <li key={cat.id} className="p-t-4">
                                    <Link to={`/products/category/${cat.id}`} className="s-text13 active1">
                                        <i className="fas fa-chevron-circle-right mr-1"></i>
                                        {cat.catName}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Grid>
        )
    }
    else {
        return <Loader />
    }

}

const ProductsShowcase = ({ products, functions }) => {

    // If products of selected category are zero
    if (products.length === 0) {
        return <h3 className="text-center">Products from this category are comming soon..</h3>
    }

    return (
        <Grid item xs={12} sm={12} md={10} className="p-b-50">
            <Grid container>
                {products.map(prod =>
                    <Grid item xs={6} sm={4} md={3} key={prod.id} className="mb-5" >
                        <Product prod={prod} functions={functions} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default compose(
    firestoreConnect(props => {
        const { id } = props.match.params;

        if (id) {
            return [
                {
                    collection: 'categories',
                },
                {
                    collection: 'products',
                    where: ['category.id', '==', id],
                }
            ]
        }
        else {
            return [
                {
                    collection: 'categories',
                },
                {
                    collection: 'products',
                    orderBy: [['createdAt', 'desc']]
                }
            ]
        }

    }),
    connect(
        (state, props) => ({
            categories: state.firestore.ordered.categories,
            products: state.firestore.ordered.products,
        }),
        { addItem }
    )
)(Products);