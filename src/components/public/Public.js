import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../layout/logo/sampleLogo.jpg'
import Header from './layout/Header';
import Slider from './layout/Slider';
import Footer from './layout/Footer';
import Loader from '../layout/Loader';
// import '../../App.css';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Hidden } from '@material-ui/core';
import scrollToTop from './functions/scrollToTop';


class Public extends Component {

    componentDidMount() {
        scrollToTop();
    }

    render() {
        const { categories, bannerImages, featuredProducts, productDisplay } = this.props;

        if (categories && bannerImages && featuredProducts && productDisplay) {
            return (
                <React.Fragment>
                    <Header activePage="home" categories={categories} history={this.props.history} />
                    <Slider bannerImages={bannerImages} />
                    <ProductDisplay products={productDisplay} />
                    <Featured products={featuredProducts} />
                    <img src={bannerImages[2].url} alt="DUMMY_IMG" />
                    <Shipping />
                    <Footer categories={categories} />
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

                    <a className="s-text11 t-center">
                        Click here for more info
				</a>
                </div>

                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 bo2 respon2">
                    <h4 className="m-text12 t-center">
                        30 Days Return
				</h4>

                    <span className="s-text11 t-center">
                        Simply return it within 30 days for an exchange.
				</span>
                </div>

                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
                    <h4 className="m-text12 t-center">
                        Store Opening
				</h4>

                    <span className="s-text11 t-center">
                        Shop open from Monday to Sunday
				</span>
                </div>
            </div>
        </section >
    )
}

const Item = data => {
    if (data) {
        const { productName, productImages: { images }, discountPrice, originalPrice } = data.prod;
        return (
            <div className="col-md-3 item-slick2 p-l-15 p-r-15">
                {/* <!-- Block2 --> */}
                <div className="block2">
                    <div className="block2-img wrap-pic-w of-hidden pos-relative">
                        <img src={images[0]} alt="IMG-PRODUCT" />

                        <div className="block2-overlay trans-0-4">
                            <a className="block2-btn-addwishlist hov-pointer trans-0-4">
                                <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                            </a>

                            <div className="block2-btn-addcart w-size1 trans-0-4">
                                {/* <!-- Button --> */}
                                <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block2-txt p-t-20">
                        <a href="product-detail.html" className="text-capitalize block2-name dis-block s-text3 p-b-5">
                            {productName}
                        </a>

                        <span className="text-danger block2-price m-text6 p-r-5">
                            <del>RS.{originalPrice}</del>
                        </span>
                        <span className="font-weight-bold text-primary block2-price m-text6 p-r-5">
                            RS.{discountPrice}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return <Loader />

}

const Row = data => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <Hidden xsDown>
                    {
                        data.products.map(prod => <Item key={prod.id} prod={prod} />)
                    }
                </Hidden>
                <Hidden smUp>
                    <Item prod={data.products[0]} />
                    <Item prod={data.products[1]} />
                </Hidden>
            </div>
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
                    <Link to="/" className="row d-flex justify-content-center">
                        <h6 className="mt-4 btn btn-pink text-center rounded-right rounded-left mx-auto">Show more from featured</h6>
                    </Link>
                </div>

                {/* <!-- Slide2 --> */}
                <div className="wrap-slick2">
                    <Row products={data.products} />
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
                <div className="row">
                    {
                        products.map(prod => (
                            <div key={prod.id} className="col-xs-6 col-md-3">
                                <div className="block1 hov-img-zoom pos-relative m-b-30">
                                    <img src={prod.productImages.images[0]} alt="IMG-BENNER" />

                                    <div className="block1-wrapbtn w-size2">
                                        {/* <!-- Button --> */}
                                        <Link to={`/product/${prod.id}`} className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4">
                                            {prod.category.catName}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="col-md-6 mt-1">

                        <div className="block2 wrap-pic-w pos-relative m-b-30" style={{ height: '350px', overflow: 'hidden' }}>
                            <img src="images/icons/bg-01.jpg" alt="IMG" />

                            <div className="block2-content sizefull ab-t-l flex-col-c-m">
                                <h4 className="m-text4 t-center w-size3 p-b-8">
                                    Sign up & get 20% off
							    </h4>

                                <p className="t-center w-size4">
                                    Be the frist to know about the latest fashion news and get exclu-sive offers
							    </p>

                                <div className="w-size2 p-t-25">
                                    {/* <!-- Button --> */}
                                    <Link to="/signup" className="flex-c-m size2 bg4 bo-rad-23 hov1 m-text3 trans-0-4">
                                        Sign Up
								    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
        bannerImages: state.firestore.ordered.bannerImages,
        featuredProducts: state.firestore.ordered.featuredProducts,
        productDisplay: state.firestore.ordered.productDisplay,
    }))
)(Public);
