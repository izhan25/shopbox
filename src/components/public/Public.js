import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../layout/logo/sampleLogo.jpg'
import Header from './layout/Header';
import Slider from './layout/Slider';
import Footer from './layout/Footer';
import Loader from '../layout/Loader';
// import '../../App.css';

import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Hidden } from '@material-ui/core';

const Shipping = () => {
    return (
        <section className="shipping bgwhite p-t-62 p-b-46">
            <div className="flex-w p-l-15 p-r-15">
                <div className="flex-col-c w-size5 p-l-15 p-r-15 p-t-16 p-b-15 respon1">
                    <h4 className="m-text12 t-center">
                        Free Delivery Worldwide
				</h4>

                    <a href="!#" className="s-text11 t-center">
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
        </section>
    )
}

const Item = () => {
    return (
        <div className="col-md-3 item-slick2 p-l-15 p-r-15">
            {/* <!-- Block2 --> */}
            <div className="block2">
                <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                    <img src="images/item-02.jpg" alt="IMG-PRODUCT" />

                    <div className="block2-overlay trans-0-4">
                        <a href="!#" className="block2-btn-addwishlist hov-pointer trans-0-4">
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
                    <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5">
                        Herschel supply co 25l
								    </a>

                    <span className="block2-price m-text6 p-r-5">
                        $75.00
								    </span>
                </div>
            </div>
        </div>
    )
}

const Row = () => {
    return (
        <div className="row container">
            <Hidden xsDown>
                <Item />
                <Item />
                <Item />
                <Item />
            </Hidden>
            <Hidden smUp>
                <Item />
                <Item />
            </Hidden>
        </div>

    )
}

const Featured = () => {
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
                    <Row />
                </div>

            </div>
        </section>
    )
}

class Public extends Component {
    render() {
        const { categories, bannerImages } = this.props;

        if (categories && bannerImages) {
            return (
                <React.Fragment>
                    <Header categories={categories} />
                    <Slider bannerImages={bannerImages} />
                    <div className="container">
                        <div className="card mt-5">
                            <div className="card-body">
                                <img src={logo} alt="Loading..." className="img-fluid" style={{ width: '600px', margin: 'auto', display: 'block' }} />
                                <hr />
                                <h4 className="text-center">currently in development</h4>
                            </div>
                        </div>
                        <Link to="/dashboard" className="btn btn-gray btn-sm float-right">
                            <i className="fas fa-arrow-circle-right"></i> Go To Dashboard
                        </Link>
                    </div>
                    <Featured />
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

export default compose(
    firestoreConnect([
        {
            collection: 'categories'
        },
        {
            collection: 'bannerImages',
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
        bannerImages: state.firestore.ordered.bannerImages
    }))
)(Public);
