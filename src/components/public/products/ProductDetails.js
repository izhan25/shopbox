import React, { Component } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Loader from '../../layout/LoaderForPublic';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { addItem } from '../../../actions/cartActions';
import Snack from '../layout/Snack';
import Product from '../layout/Product';
import { Grid } from '@material-ui/core';
import scrollToTop from '../functions/scrollToTop';


class ProductDetails extends Component {

    state = {
        categories: [],
        displayImg: '',
        loadDisplayImg: true,
        qty: 1,

        openSnackBar: false,
        msgSnackBar: '',
    }
    componentDidMount() {
        scrollToTop();
    }

    static getDerivedStateFromProps(props, state) {
        const { categories, product } = props;

        if (categories && product && state.loadDisplayImg) {
            return {
                categories,
                displayImg: product.productImages.images[0]
            }
        }

        return null;

    }


    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };


    scrollToTop = () => {
        window.scrollTo(0, 0);
        this.setState(prevState => ({
            qty: 1,
            displayImg: '',
            loadDisplayImg: true
        }));
    }

    onQtyAdd = e => this.setState(state => {
        return { qty: state.qty < 10 ? state.qty + 1 : 10 }
    });

    onQtySub = e => this.setState(state => {
        return { qty: state.qty > 1 ? state.qty - 1 : 1 }
    });

    displayImage = img => {
        this.setState(prevState => ({
            loadDisplayImg: false,
            displayImg: img,
        }))
    }

    addItemToCart = product => {
        const { addItem } = this.props;
        const { qty } = this.state;

        const newProduct = {
            ...product,
            qty,
            totalPrice: product.discountPrice * qty
        }

        addItem(newProduct);
        this.setState(prevState => ({ openSnackBar: true, msgSnackBar: 'Added To Cart' }));
    }

    render() {
        const { categories, openSnackBar, msgSnackBar } = this.state;
        const { product, related } = this.props;

        const functions = {
            scrollToTop: this.scrollToTop,
            onQtyAdd: this.onQtyAdd,
            onQtySub: this.onQtySub,
            displayImage: this.displayImage,
            addItemToCart: this.addItemToCart,
        }

        if (categories && product && related) {
            return (
                <React.Fragment>
                    <Header activePage="products" categories={categories} history={this.props.history} />
                    <Content
                        prod={product}
                        state={this.state}
                        related={related}
                        functions={functions}
                    />
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


const Content = ({ prod, state, related, functions }) => {
    return (
        <React.Fragment>
            <Breadcrum prod={prod} />
            <Details prod={prod} state={state} functions={functions} />
            <RelatedProducts related={related} functions={functions} />
        </React.Fragment>
    )
}

const Breadcrum = ({ prod }) => {
    const { category: { id, catName }, productName } = prod;
    return (
        <div className="bread-crumb bgwhite flex-w p-l-52 p-r-15 p-t-30 p-l-15-sm">
            <Link to="/" className="s-text16">
                Home
			<i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
            </Link>

            <Link to="/products" className="s-text16">
                Products
			    <i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
            </Link>

            <Link to={`/products/category/${id}`} className="s-text16 text-capitalize">
                {catName}
                <i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
            </Link>

            <span className="s-text17">
                {productName}
            </span>
        </div>
    )
}

const Details = ({ prod, state, functions }) => {
    const { productImages: { images } } = prod;
    const { qty } = state;

    return (
        <div className="container-fluid bgwhite p-t-35 p-b-80">
            <div className="container flex-w flex-sb">
                <Images images={images} state={state} functions={functions} />
                <RightPanel prod={prod} qty={qty} functions={functions} />
            </div>
        </div>
    )
}

const RightPanel = ({ prod, qty, functions }) => {
    const { productName, discountPrice, description, category: { catName } } = prod;
    const { onQtyAdd, onQtySub, addItemToCart } = functions;

    return (
        <div className="w-size14 p-t-30 respon5">
            <h4 className="product-detail-name m-text16 p-b-13">
                {productName}
            </h4>

            <span className="m-text17">
                Rs. {discountPrice}
            </span>

            <p className="s-text8 p-t-10 text-justify">
                {description}
            </p>

            <div className="p-t-33 p-b-60">
                <div className="flex-m flex-w p-b-10">
                    {/* <div className="s-text15 w-size15 t-center">
                        Size
                    </div>

                    <div className="rs2-select2 rs3-select2 bo4 of-hidden w-size16">
                        <select className="selection-2 form-control" name="size">
                            <option>Choose an option</option>
                            <option>Size S</option>
                            <option>Size M</option>
                            <option>Size L</option>
                            <option>Size XL</option>
                        </select>
                    </div> */}
                </div>

                <div className="flex-m flex-w">
                    {/* <div className="s-text15 w-size15 t-center">
                        Color
                    </div>

                    <div className="rs2-select2 rs3-select2 bo4 of-hidden w-size16">
                        <select className="selection-2 form-control" name="color">
                            <option>Choose an option</option>
                            <option>Gray</option>
                            <option>Red</option>
                            <option>Black</option>
                            <option>Blue</option>
                        </select>
                    </div> */}
                </div>

                <div className="flex-r-m flex-w p-t-10">
                    <div className="w-size16 flex-m flex-w">
                        <div className="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
                            <button onClick={onQtySub} className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                <i className="fs-12 fa fa-minus" aria-hidden="true"></i>
                            </button>

                            <span className="size8 m-text18 t-center num-product">{qty}</span>

                            <button onClick={onQtyAdd} className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                <i className="fs-12 fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div className="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                            <button onClick={() => { addItemToCart(prod) }} className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 btn-block">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-b-45">
                <span className="s-text8 text-capitalize">Categories: {catName}</span>
            </div>

        </div>
    )
}

const Images = ({ images, state, functions: { displayImage } }) => {
    const { displayImg } = state;

    return (
        <div className="w-size13 p-t-30 respon5">
            <div className="wrap-slick3 flex-sb flex-w">

                <div className="wrap-slick3-dots">
                    <ul className="slick3-dots" role="tablist">
                        {
                            images.map(img => (
                                <li
                                    key={images.indexOf(img)}
                                    className={classnames({
                                        'slick-active': img === displayImg
                                    })}
                                    role="presentation"
                                    onClick={() => { displayImage(img) }}
                                >
                                    <img src={img} alt="IMG_THUMB" />
                                    <div className="slick3-dot-overlay"></div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="slick3">
                    <div className="item-slick3">
                        <div className="wrap-pic-w">
                            <img src={displayImg} alt="IMG-PRODUCT" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RelatedProducts = ({ related, functions }) => {
    return (
        <section className="relateproduct bgwhite p-t-45 p-b-138">
            <div className="container">
                <div className="sec-title p-b-60">
                    <h3 className="m-text5 t-center">
                        Related Products
                    </h3>
                </div>

                <div className="wrap-slick2">
                    <div className="slick2">
                        <div className="container">
                            <Grid container className="d-flex justify-content-center">
                                {
                                    related.map(prod => <Grid item xs={6} sm={4} md={3} key={prod.id}>
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
                storeAs: 'product',
                doc: props.match.params.id
            },
            {
                collection: 'products',
            }
        ]
    }),
    connect(
        ({ firestore: { ordered }, cart }, props) => ({
            categories: ordered.categories,
            product: ordered.product && ordered.product[0],
            related: ordered.products,
            cart
        }),
        { addItem }
    )
)(ProductDetails);