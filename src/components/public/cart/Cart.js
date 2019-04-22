import React, { Component } from 'react';
import Loader from '../../layout/LoaderForPublic';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { addItem, clearCart, decreaseQty } from '../../../actions/cartActions';
import Snack from '../layout/Snack';
import Grid from '@material-ui/core/Grid';
import Product from '../layout/Product';
import Swal from 'sweetalert2';

class Cart extends Component {

    state = {
        openSnackBar: false,
        msgSnackBar: '',

        cart: []
    }

    componentDidMount() {
        scrollToTop();
    }

    static getDerivedStateFromProps(props, state) {
        const { cart } = props;

        if (cart) {
            return {
                cart
            }
        }

        return null;
    }

    scrollToTop = () => {
        window.scrollTo(0, 0);
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    addItemToCart = product => {
        const { addItem } = this.props;
        const scrollToTop = this.scrollToTop;

        const newProduct = {
            ...product,
            qty: 1,
            totalPrice: product.discountPrice
        }

        addItem(newProduct);
        this.setState(prevState => ({ openSnackBar: true, msgSnackBar: 'Added To Cart' }));
        scrollToTop();

    }

    increseQty = (prod, qty) => {
        const addItemToCart = this.addItemToCart;

        const updProd = {
            ...prod,
            qty: prod.qty + 1,
            totalPrice: prod.totalPrice + prod.discountPrice
        }

        addItemToCart(updProd);

    }

    decreseQtyFromCart = (prod, qty) => {

        const updProd = {
            ...prod,
            qty: prod.qty - 1,
            decrementAmount: prod.discountPrice
        }
        decreaseQty(updProd);
    }

    checkout = () => {
        const { auth } = this.props;

        const success = () => {
            Swal.fire('success');
        }

        const error = () => this.props.history.push('/login');

        if (auth.uid !== undefined) success();
        else error();

    }

    render() {
        const { categories, moreProds, clearCart } = this.props;
        const { openSnackBar, msgSnackBar, cart } = this.state;

        const functions = {
            addItemToCart: this.addItemToCart,
            decreseQtyFromCart: this.decreseQtyFromCart,
            increseQty: this.increseQty,
            checkout: this.checkout
        }

        if (categories && moreProds) {

            return (
                <React.Fragment>
                    <Header activePage="cart" categories={categories} history={this.props.history} />

                    <section className="cart bgwhite p-t-70 p-b-100">
                        <div className="container">
                            {
                                cart.quantity === 0
                                    ? <EmptyCartLabel prod={moreProds} functions={functions} />
                                    : <React.Fragment>
                                        <CartItems cart={cart} functions={functions} />
                                        <button onClick={clearCart} className="btn btn-pink rounded-left rounded-right float-right mt-3 mb-2">
                                            <i className="fas fa-trash mr-1" />
                                            Clear Cart
                                        </button>
                                        <CartTotal cart={cart} functions={functions} />
                                    </React.Fragment>
                            }
                        </div>
                    </section>

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

const CartItems = ({ cart, functions }) => {
    return (
        <div className="container-table-cart pos-relative">
            <div className="wrap-table-shopping-cart bgwhite">
                <table className="table-shopping-cart">
                    <thead>
                        <tr className="table-head">
                            <th className="column-1"></th>
                            <th className="column-2">Product</th>
                            <th className="column-3">Price</th>
                            <th className="column-4 p-l-70">Quantity</th>
                            <th className="column-5">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.quantity !== 0
                                ? cart.products.map(prod => <CartItemRow key={prod.id} prod={prod} functions={functions} />)
                                : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const CartItemRow = ({ prod, functions: { increseQty, decreseQtyFromCart } }) => {
    return (
        <tr className="table-row">
            <td className="column-1">
                <div className="cart-img-product b-rad-4 o-f-hidden">
                    <img src={prod.productImages.images[0]} alt="IMG-PRODUCT" />
                </div>
            </td>
            <td className="column-2">{prod.productName}</td>
            <td className="column-3">Rs.{prod.discountPrice}</td>
            <td className="column-4">
                <div className="flex-w bo5 of-hidden w-size17">
                    <button onClick={() => { decreseQtyFromCart(prod, prod.qty - 1) }} className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                        <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                    </button>

                    <div className="size8 m-text18 t-center num-product" style={{ border: 'none' }} type="number" name="num-product1" >{prod.qty}</div>

                    <button onClick={() => { increseQty(prod, prod.qty + 1) }} className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                        <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                    </button>
                </div>
            </td>
            <td className="column-5">Rs.{prod.totalPrice}</td>
        </tr>
    )
}

const CartTotal = ({ cart, functions: { checkout } }) => {

    const RupeeFormater = amount => (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    const subTotal = RupeeFormater(cart.total);
    const deliveryCharges = 250;
    const total = RupeeFormater(parseInt(cart.total.toString(), 10) + 250);

    return (
        <div className="bo9 w-size18 p-l-40 p-r-40 p-t-30 p-b-38 m-t-70 m-r-0 m-l-auto p-lr-15-sm">
            <h5 className="m-text20 p-b-24">
                Cart Totals
            </h5>

            <div className="flex-w flex-sb-m p-b-12">
                <span className="s-text18 w-size19 w-full-sm">
                    Subtotal:
                </span>

                <span className="m-text21 w-size20 w-full-sm">
                    Rs. {subTotal}
                </span>
            </div>

            <div className="flex-w flex-sb bo10 p-t-15 p-b-20">
                <span className="s-text18 w-size19 w-full-sm">
                    Delivery Charges:
                </span>

                <span className="m-text21 w-size20 w-full-sm">
                    Rs. {deliveryCharges}
                </span>
            </div>

            <div className="flex-w flex-sb-m p-t-26 p-b-30">
                <span className="m-text22 w-size19 w-full-sm">
                    Total:
                </span>

                <span className="m-text21 w-size20 w-full-sm">
                    Rs. {total}
                </span>
            </div>

            <div className="size15 trans-0-4">
                <button onClick={checkout} className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}


const EmptyCartLabel = ({ prod, functions }) => {
    return (
        <React.Fragment>
            <section className="bg-title-page p-t-5 p-b-10 flex-col-c-m  bg-white" >
                <h5 className="l-text2 text-dark">
                    Your <span className="font-pink">cart</span> is empty
                </h5>
            </section>
            <MoreProducts prods={prod} functions={functions} />
        </React.Fragment>
    )
}

const MoreProducts = ({ prods, functions }) => {
    return (
        <section className="relateproduct bgwhite p-t-45 p-b-138">
            <div className="container">
                <div className="sec-title p-b-60">
                    <h3 className="m-text5 t-center">
                        Browse Products
                    </h3>
                </div>

                <div className="wrap-slick2">
                    <div className="slick2">
                        <div className="container">
                            <Grid container className="d-flex justify-content-center">
                                {
                                    prods.map(prod => <Grid item xs={6} sm={4} md={3} key={prod.id}>
                                        <Product prod={prod} functions={functions} />
                                    </Grid>
                                    )
                                }
                            </Grid>
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
                collection: 'products',
            }
        ]
    }),
    firebaseConnect(),
    connect(
        (state, props) => (
            {
                categories: state.firestore.ordered.categories,
                cart: state.cart,
                moreProds: state.firestore.ordered.products,
                auth: state.firebase.auth
            }
        ),
        { addItem, clearCart, decreaseQty }
    )
)(Cart);