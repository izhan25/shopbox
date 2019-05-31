import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './layout/Header';
import Slider from './layout/Slider';
import Footer from './layout/Footer';
import Loader from '../layout/LoaderForPublic';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Hidden } from '@material-ui/core';
import scrollToTop from './functions/scrollToTop';
import { addItem } from '../../actions/cartActions';
import Snack from './layout/Snack';
import Grid from '@material-ui/core/Grid';
import Product from './layout/Product';

class Public extends Component {

    state = {
        openSnackBar: false,
        msgSnackBar: '',
    }

    componentDidMount() {
        scrollToTop();
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    addItemToCart = product => {
        const { addItem } = this.props;

        const newProduct = {
            ...product,
            qty: 1,
            totalPrice: product.discountPrice
        }

        addItem(newProduct);
        this.setState(prevState => ({ openSnackBar: true, msgSnackBar: 'Added To Cart' }))
    }

    render() {
        const { categories, bannerImages, featuredProducts, productDisplay } = this.props;
        const { openSnackBar, msgSnackBar } = this.state;

        if (categories && bannerImages && featuredProducts && productDisplay) {
            return (
                <React.Fragment>
                    <Header activePage="home" categories={categories} history={this.props.history} />
                    <Slider bannerImages={bannerImages} />
                    <ProductDisplay products={productDisplay} />
                    <Featured products={featuredProducts} addItemToCart={this.addItemToCart} />
                    {
                        bannerImages[2]
                            ? <img src={bannerImages[2].url} alt="DUMMY_IMG" className="img-fluid" />
                            : null
                    }
                    <Shipping />
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

const Shipping = () => {
    return (
        <section className="shipping bgwhite p-t-62 p-b-46">
            <div className="flex-w p-l-15 p-r-15">
                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
                    <h4 className="m-text12 t-center">
                        Free Delivery In Pakistan
				    </h4>

                </div>

                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 bo2 respon2">
                    <h4 className="m-text12 t-center">
                        10 Days Return
				    </h4>
                </div>

                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
                    <h4 className="m-text12 t-center">
                        24x7 Customer Support kardo
				    </h4>
                </div>
            </div>
        </section >
    )
}

const Item = data => {
    if (data) {
        const functions = {
            addItemToCart: data.addItemToCart
        }
        return (
            <Grid item xs={6} sm={4} md={3} className="">
                <Product prod={data.prod} functions={functions} />
            </Grid>
        )
    }

    return <Loader />

}

const Row = data => {
    return (
        <div className="container">
            <Grid container className="d-flex justify-content-center">
                <Hidden xsDown>
                    {
                        data.products.map(prod => <Item key={prod.id} prod={prod} addItemToCart={data.addItemToCart} />)
                    }
                </Hidden>
                <Hidden smUp>
                    <Item prod={data.products[0]} addItemToCart={data.addItemToCart} />
                    <Item prod={data.products[1]} addItemToCart={data.addItemToCart} />
                </Hidden>
            </Grid>
        </div>

    )
}

const Featured = data => {
    return (
        <section className="newproduct bgwhite p-t-45 p-b-105">
            <div className="container">
                <div className="sec-title p-b-60">
                    <h3 className="m-text5 t-center">
                        Featured Products
				    </h3>
                    <Link to="/products" className="row d-flex justify-content-center">
                        <h6 className="mt-4 btn btn-pink text-center rounded-right rounded-left mx-auto">Show more from featured</h6>
                    </Link>
                </div>

                {/* <!-- Slide2 --> */}
                <div className="wrap-slick2">
                    <Row products={data.products} addItemToCart={data.addItemToCart} />
                </div>

            </div>
        </section>
    )
}

const ProductDisplay = data => {
    const { products } = data;

    return (
        <section className="banner bgwhite p-t-40 p-b-40">
            <div className="container">
                <Grid container>
                    {
                        products.map(prod => (
                            <Grid item xs={6} sm={4} md={3} key={prod.id} className="col-xs-3 col-md-3">
                                <div className="block1 hov-img-zoom pos-relative m-b-30">

                                    <Link to={`/product/${prod.id}`}>
                                        <img src={prod.productImages.images[0]} alt="IMG-BENNER" className="img-fluid" />
                                    </Link>

                                    <Grid container className="block1-wrapbtn w-size2 d-flex justify-content-center">
                                        <Grid item xs={11}>
                                            <Link to={`/product/${prod.id}`} className="flex-c-m size1 text-capitalize bg3 hov1 trans-0-4">
                                                {prod.category.catName}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} sm={12} md={6} className="mt-1">

                        <div className="block2 wrap-pic-w pos-relative m-b-30" style={{ height: '280px', overflow: 'hidden' }}>
                            <img src="images/icons/bg-01.jpg" alt="IMG" className="img-fluid" />

                            <div className="block2-content sizefull ab-t-l flex-col-c-m">
                                <h4 className="m-text4 t-center w-size3 p-b-8">
                                    Sign up & get 20% off
							    </h4>

                                <p className="t-center w-size4">
                                    Be the frist to know about the latest fashion news and get exclu-sive offers
							    </p>

                                <div className="w-size2 p-t-25">
                                    {/* <!-- Button --> */}
                                    <Link to="/register" className="flex-c-m size2 bg4 bo-rad-23 hov1 m-text3 trans-0-4">
                                        Sign Up
								    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid>

                </Grid>
            </div>
        </section>
    )
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'categories',
                limit: 3,
            },
            {
                collection: 'bannerImages',
                orderBy: [['createdAt', 'desc']]
            },
            {
                collection: 'products',
                where: [['isFeatured', '==', true]],
                storeAs: 'featuredProducts',
                limit: 4,
            },
            {
                collection: 'products',
                storeAs: 'productDisplay',
                orderBy: [['createdAt', 'desc']],
                limit: 6,
            },
        ]
    }),
    connect(
        (state, props) => ({
            categories: state.firestore.ordered.categories,
            bannerImages: state.firestore.ordered.bannerImages,
            featuredProducts: state.firestore.ordered.featuredProducts,
            productDisplay: state.firestore.ordered.productDisplay,
        }),
        { addItem }
    )
)(Public);
