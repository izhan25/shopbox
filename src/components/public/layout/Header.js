import React, { Component } from 'react';
import Loader from '../../layout/Loader';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';


import headerIcon1 from '../assets/images/icons/icon-header-01.png';
import headerIcon2 from '../assets/images/icons/icon-header-02.png';
import itemCart1 from '../assets/images/item-cart-01.jpg';
import itemCart2 from '../assets/images/item-cart-02.jpg';
import itemCart3 from '../assets/images/item-cart-03.jpg';

class Header extends Component {
    render() {
        return (
            <div id="header">
                <div className="container-menu-header">
                    <div className="topbar">
                        <div className="topbar-social">
                            <Link to="!#" className="topbar-social-item fab fa-facebook-f"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-instagram"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-pinterest-p"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-snapchat-ghost"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-youtube"></Link>
                        </div>

                        <span className="topbar-child1">
                            Free shipping for standard order over RS 1000
                        </span>

                        <div className="topbar-child2">
                            <span className="topbar-email">
                                fashe@example.com
                            </span>
                        </div>
                    </div>
                    <div className="wrap_header">
                        {/* <!-- Logo --> */}
                        <a href="index.html" className="logo">
                            {/* <img src={logo} alt="IMG-LOGO" /> */}
                            <span className="logoText">
                                ShopBox
                            </span>
                        </a>

                        {/* <!-- Menu --> */}
                        <div className="wrap_menu">
                            <nav className="menu">
                                <ul className="main_menu">
                                    <li>
                                        <a href="index.html">Home</a>
                                        <ul className="sub_menu">
                                            <li><a href="index.html">Homepage V1</a></li>
                                            <li><a href="home-02.html">Homepage V2</a></li>
                                            <li><a href="home-03.html">Homepage V3</a></li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="product.html">Products</a>
                                        <ul className="sub_menu">
                                            {
                                                this.props.categories
                                                    ? this.props.categories.map(cat => <li key={cat.id}><a href="index.html">{cat.catName}</a></li>)
                                                    : <Loader />
                                            }
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="product.html">About Us</a>
                                    </li>
                                    <li>
                                        <a href="product.html">Contact</a>
                                    </li>

                                </ul>
                            </nav>
                        </div>

                        {/* <!-- Header Icon --> */}
                        <div className="header-icons">
                            <a href="!#" className="header-wrapicon1 dis-block">
                                <img src={headerIcon1} className="header-icon1" alt="ICON" />
                            </a>

                            <span className="linedivide1"></span>

                            <div className="header-wrapicon2">
                                <img src={headerIcon2} className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                <span className="header-icons-noti">0</span>

                                {/* <!-- Header cart noti --> */}
                                <div className="header-cart header-dropdown">
                                    <ul className="header-cart-wrapitem">
                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart1} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    White Shirt With Pleat Detail Back
                                </a>

                                                <span className="header-cart-item-info">
                                                    1 x $19.00
                                </span>
                                            </div>
                                        </li>

                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart2} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    Converse All Star Hi Black Canvas
                                </a>

                                                <span className="header-cart-item-info">
                                                    1 x $39.00
                                </span>
                                            </div>
                                        </li>

                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart3} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    Nixon Porter Leather Watch In Tan
                                </a>

                                                <span className="header-cart-item-info">
                                                    1 x $17.00
                                </span>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="header-cart-total">
                                        Total: $75.00
                    </div>

                                    <div className="header-cart-buttons">
                                        <div className="header-cart-wrapbtn">
                                            {/* <!-- Button --> */}
                                            <a href="cart.html" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                View Cart
                            </a>
                                        </div>

                                        <div className="header-cart-wrapbtn">
                                            {/* <!-- Button --> */}
                                            <a href="!#" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                Check Out
                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrap_header_mobile">
                    {/* <!-- Logo moblie --> */}
                    <a href="index.html" className="logo-mobile">
                        <span className="logoText">
                            ShopBox
                        </span>
                    </a>

                    {/* <!-- Button show menu --> */}
                    <div className="btn-show-menu">
                        {/* <!-- Header Icon mobile --> */}
                        <div className="header-icons-mobile">
                            <a href="!#" className="header-wrapicon1 dis-block">
                                <img src={headerIcon1} className="header-icon1" alt="ICON" />
                            </a>

                            <span className="linedivide2"></span>

                            <div className="header-wrapicon2">
                                <img src={headerIcon2} className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                <span className="header-icons-noti">0</span>

                                {/* <!-- Header cart noti --> */}
                                <div className="header-cart header-dropdown">
                                    <ul className="header-cart-wrapitem">
                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart1} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    White Shirt With Pleat Detail Back
										</a>

                                                <span className="header-cart-item-info">
                                                    1 x $19.00
										</span>
                                            </div>
                                        </li>

                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart2} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    Converse All Star Hi Black Canvas
										</a>

                                                <span className="header-cart-item-info">
                                                    1 x $39.00
										</span>
                                            </div>
                                        </li>

                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src={itemCart3} alt="IMG" />
                                            </div>

                                            <div className="header-cart-item-txt">
                                                <a href="!#" className="header-cart-item-name">
                                                    Nixon Porter Leather Watch In Tan
										</a>

                                                <span className="header-cart-item-info">
                                                    1 x $17.00
										</span>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="header-cart-total">
                                        Total: $75.00
							        </div>

                                    <div className="header-cart-buttons">
                                        <div className="header-cart-wrapbtn">
                                            {/* <!-- Button --> */}
                                            <a href="cart.html" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                View Cart
									        </a>
                                        </div>

                                        <div className="header-cart-wrapbtn">
                                            {/* <!-- Button --> */}
                                            <a href="!#" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                Check Out
									        </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* <!-- Menu Mobile --> */}
                <div className="wrap-side-menu collapse navbar-collapse" id="navbarTogglerDemo01">
                    <nav className="side-menu">
                        <ul className="main-menu">
                            <li className="item-topbar-mobile p-l-20 p-t-8 p-b-8">
                                <span className="topbar-child1">
                                    Free shipping for standard order over $100
						</span>
                            </li>

                            <li className="item-topbar-mobile p-l-20 p-t-8 p-b-8">
                                <div className="topbar-child2-mobile">
                                    <span className="topbar-email">
                                        fashe@example.com
							</span>

                                    <div className="topbar-language rs1-select2">
                                        <select className="selection-1" name="time">
                                            <option>USD</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </li>

                            <li className="item-topbar-mobile p-l-10">
                                <div className="topbar-social-mobile">
                                    <a href="#" className="topbar-social-item fa fa-facebook"></a>
                                    <a href="#" className="topbar-social-item fa fa-instagram"></a>
                                    <a href="#" className="topbar-social-item fa fa-pinterest-p"></a>
                                    <a href="#" className="topbar-social-item fa fa-snapchat-ghost"></a>
                                    <a href="#" className="topbar-social-item fa fa-youtube-play"></a>
                                </div>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="index.html">Home</a>
                                <ul className="sub-menu">
                                    <li><a href="index.html">Homepage V1</a></li>
                                    <li><a href="home-02.html">Homepage V2</a></li>
                                    <li><a href="home-03.html">Homepage V3</a></li>
                                </ul>
                                <i className="arrow-main-menu fa fa-angle-right" aria-hidden="true"></i>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="product.html">Shop</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="product.html">Sale</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="cart.html">Features</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="blog.html">Blog</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="about.html">About</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="contact.html">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'categories',
        }
    ]),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
    })),
)(Header);