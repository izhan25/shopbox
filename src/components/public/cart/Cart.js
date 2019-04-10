import React, { Component } from 'react';
import Loader from '../../layout/Loader';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class Cart extends Component {

    componentDidMount() {
        scrollToTop();
    }

    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="cart" categories={categories} history={this.props.history} />
                    <TitleBar />

                    <section className="cart bgwhite p-t-70 p-b-100">
                        <div className="container">
                            <CartItems />
                            <CartTotal />
                        </div>
                    </section>

                    <Footer categories={categories} />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

const CartItems = () => {
    return (
        <div className="container-table-cart pos-relative">
            <div className="wrap-table-shopping-cart bgwhite">
                <table className="table-shopping-cart">
                    <tbody>
                        <tr className="table-head">
                            <th className="column-1"></th>
                            <th className="column-2">Product</th>
                            <th className="column-3">Price</th>
                            <th className="column-4 p-l-70">Quantity</th>
                            <th className="column-5">Total</th>
                        </tr>

                        <tr className="table-row">
                            <td className="column-1">
                                <div className="cart-img-product b-rad-4 o-f-hidden">
                                    <img src="images/item-10.jpg" alt="IMG-PRODUCT" />
                                </div>
                            </td>
                            <td className="column-2">Men Tshirt</td>
                            <td className="column-3">$36.00</td>
                            <td className="column-4">
                                <div className="flex-w bo5 of-hidden w-size17">
                                    <button className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                        <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                                    </button>

                                    <input className="size8 m-text18 t-center num-product" type="number" name="num-product1" value="1" />

                                    <button className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                        <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="column-5">$36.00</td>
                        </tr>

                        <tr className="table-row">
                            <td className="column-1">
                                <div className="cart-img-product b-rad-4 o-f-hidden">
                                    <img src="images/item-05.jpg" alt="IMG-PRODUCT" />
                                </div>
                            </td>
                            <td className="column-2">Mug Adventure</td>
                            <td className="column-3">$16.00</td>
                            <td className="column-4">
                                <div className="flex-w bo5 of-hidden w-size17">
                                    <button className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                        <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                                    </button>

                                    <input className="size8 m-text18 t-center num-product" type="number" name="num-product2" value="1" />

                                    <button className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                        <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="column-5">$16.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const CartTotal = () => {
    return (
        <div className="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm">
            <h5 className="m-text20 p-b-24">
                Cart Totals
				</h5>

            <div className="flex-w flex-sb-m p-b-12">
                <span className="s-text18 w-size19 w-full-sm">
                    Subtotal:
					</span>

                <span className="m-text21 w-size20 w-full-sm">
                    $39.00
					</span>
            </div>

            <div className="flex-w flex-sb bo10 p-t-15 p-b-20">
                <span className="s-text18 w-size19 w-full-sm">
                    Shipping:
					</span>

                <div className="w-size20 w-full-sm">
                    <p className="s-text8 p-b-23">
                        There are no shipping methods available. Please double check your address, or contact us if you need any help.
						</p>

                    <span className="s-text19">
                        Calculate Shipping
						</span>

                    <div className="rs2-select2 rs3-select2 rs4-select2 bo4 of-hidden w-size21 m-t-8 m-b-12">
                        <select className="selection-2 form-control" name="country">
                            <option>Select a country...</option>
                            <option>US</option>
                            <option>UK</option>
                            <option>Japan</option>
                        </select>
                    </div>

                    <div className="size13 bo4 m-b-12">
                        <input className="sizefull s-text7 p-l-15 p-r-15" type="text" name="state" placeholder="State /  country" />
                    </div>

                    <div className="size13 bo4 m-b-22">
                        <input className="sizefull s-text7 p-l-15 p-r-15" type="text" name="postcode" placeholder="Postcode / Zip" />
                    </div>

                    <div className="size14 trans-0-4 m-b-10">
                        <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                            Update Totals
							</button>
                    </div>
                </div>
            </div>

            <div className="flex-w flex-sb-m p-t-26 p-b-30">
                <span className="m-text22 w-size19 w-full-sm">
                    Total:
					</span>

                <span className="m-text21 w-size20 w-full-sm">
                    $39.00
					</span>
            </div>

            <div className="size15 trans-0-4">
                <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                    Proceed to Checkout
					</button>
            </div>
        </div>
    )
}

const TitleBar = () => {
    return (
        <section className="bg-title-page p-t-30 p-b-30 flex-col-c-m  bg-white" >
            <h2 className="l-text2 text-dark">
                Cart
            </h2>
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
        ]
    }),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
    }))
)(Cart);