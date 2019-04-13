import React, { Component } from 'react'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loader from '../../layout/LoaderForPublic';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';
import classnames from 'classnames';
import scrollToTop from '../functions/scrollToTop';
import { addItem } from '../../../actions/cartActions';


class Products extends Component {
    state = {
        searchText: '',
        categories: [],
        products: [],
        catDisplay: 'Select Category'
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
    }

    render() {
        const { categories } = this.state;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="products" categories={categories} history={this.props.history} />
                    <Content state={this.state} onSearchTextChange={this.onSearchTextChange} gotoCat={this.gotoCat} addItemToCart={this.addItemToCart} />
                    <Footer categories={categories} />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

const Content = ({ state, onSearchTextChange, gotoCat, addItemToCart }) => {

    const { categories, searchText, products, catDisplay } = state;
    return (
        <section className="bgwhite p-t-55 p-b-65">
            <div className="container">
                <SearchBar searchText={searchText} onSearchTextChange={onSearchTextChange} />
                <Hidden mdUp>
                    <CategoriesForMobile categories={categories} gotoCat={gotoCat} catDisplay={catDisplay} />
                </Hidden>
                <div className="row">
                    <CategoriesForDesktop categories={categories} />
                    <ProductsShowcase products={products} addItemToCart={addItemToCart} />
                </div>
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
            <div className="col-sm-6 col-md-4 col-lg-3 p-b-50" >
                <Hidden smDown>
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
                </Hidden>
            </div>
        )
    }
    else {
        return <Loader />
    }

}

const ProductsShowcase = ({ products, addItemToCart }) => {

    // If products of selected category are zero
    if (products.length === 0) {
        return <h3 className="text-center">Products from this category are comming soon..</h3>
    }

    return (
        <div className="col-sm-6 col-md-8 col-lg-9 p-b-50">
            <div className="row">
                {products.map(prod =>
                    <Product key={prod.id} prod={prod} addItemToCart={addItemToCart} />
                )}
            </div>
        </div>
    )
}

const Product = ({ prod, addItemToCart }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4 p-b-50">
            <div className="block2">
                <div className={classnames(
                    'block2-img wrap-pic-w of-hidden pos-relative ',
                    {
                        'block2-labelnew': prod.createdAt.toDate().getDate() === new Date().getDate()
                    }
                )}>
                    <img src={prod.productImages.images[0]} alt="IMG-PRODUCT" />

                    <div className="block2-overlay trans-0-4">
                        <a className="block2-btn-addwishlist hov-pointer trans-0-4">
                            <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                            <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                        </a>

                        <div className="block2-btn-addcart w-size1 trans-0-4">
                            <div className="btn-group d-flex justify-content-center">
                                <a className="flex-c-m btn bg4 s-text1 hov1 trans-0-4 rounded-left" onClick={() => { addItemToCart(prod) }}>
                                    <i className="fas fa-cart-plus fa-2x text-white"></i>
                                </a>
                                <Link to={`/product/${prod.id}`} className="flex-c-m btn btn-primary s-text1 trans-0-4 rounded-right">
                                    <i className="fas fa-search-plus fa-2x"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block2-txt p-t-20">
                    <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5 text-truncate">
                        {prod.productName}
                    </a>

                    <span className="block2-price m-text6 p-r-5">
                        <del className="text-danger mr-1">Rs.{prod.originalPrice}</del>
                        <span className="text-primary">Rs.{prod.discountPrice}</span>
                    </span>
                </div>
            </div>
        </div>
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