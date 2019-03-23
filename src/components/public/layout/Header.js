import React, { Component } from 'react';
import '../assets/fonts/themify/themify-icons.css';
import '../assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import '../assets/fonts/elegant-font/html-css/style.css';
import '../assets/vendor/animate/animate.css';
import '../assets/vendor/css-hamburgers/hamburgers.min.css';
import '../assets/vendor/animsition/css/animsition.min.css';
import '../assets/vendor/select2/select2.min.css';
import '../assets/vendor/daterangepicker/daterangepicker.css';
import '../assets/vendor/slick/slick.css';
import '../assets/vendor/lightbox2/css/lightbox.min.css';
import '../assets/css/util.css';
import '../assets/css/main.css';
// import '../assets/';

import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Header extends Component {
    render() {
        const { categories, activePage } = this.props;
        return (
            <header className="header1">
                {/* <!-- Header desktop --> */}
                <div className="container-menu-header">
                    <div className="topbar">
                        <div className="topbar-social">
                            <Link to="!#" className="topbar-social-item fab fa-facebook-f"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-instagram"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-pinterest-p"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-snapchat-ghost"></Link>
                            <Link to="!#" className="topbar-social-item fab fa-youtube-play"></Link>
                        </div>

                        <span className="topbar-child1">
                            Free shipping for standard order over $100
                        </span>

                        <div className="topbar-child2">
                            <span className="topbar-email">
                                fashe@example.com
                            </span>
                        </div>
                    </div>

                    <div className="wrap_header">
                        {/* <!-- Logo --> */}
                        <Link to="/" className="logo">
                            {/* <img src="images/icons/logo.png" alt="IMG-LOGO" /> */}
                            <h2><b>Shopbox</b></h2>
                        </Link>

                        {/* <!-- Menu --> */}
                        <div className="wrap_menu">
                            <nav className="menu">
                                <ul className="main_menu">
                                    <li className={classnames({ 'sale-noti': activePage === 'home' })}>
                                        <Link to="/">Home</Link>
                                    </li>

                                    <li className={classnames({ 'sale-noti': activePage === 'products' })}>
                                        <Link to="/products">Products</Link>
                                        <ul className="sub_menu">
                                            {
                                                categories
                                                    ? categories.map(cat => <li key={cat.id}><Link to={`/products/category/${cat.id}`}>{cat.catName}</Link></li>)
                                                    : <li><a href="!#">Loading ...</a></li>
                                            }
                                            <hr style={{ backgroundColor: 'white' }} />
                                            <li><Link to="/products"><i className="fas fa-plus-circle mr-2" />More </Link></li>
                                        </ul>
                                    </li>

                                    <li className={classnames({ 'sale-noti': activePage === 'about' })}>
                                        <Link to="/about">About</Link>
                                    </li>

                                    <li className={classnames({ 'sale-noti': activePage === 'contact' })}>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* <!-- Header Icon --> */}
                        <div className="header-icons">
                            <a className="header-wrapicon1 dis-block">
                                <img src="images/icons/icon-header-01.png" className="header-icon1" alt="ICON" />
                            </a>

                            <span className="linedivide1"></span>

                            <div className="header-wrapicon2">
                                <img src="images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                <span className="header-icons-noti">0</span>

                                {/* <!-- Header cart noti --> */}
                                <div className="header-cart header-dropdown">
                                    <ul className="header-cart-wrapitem">
                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src="images/item-cart-01.jpg" alt="IMG" />
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
                                                <img src="images/item-cart-02.jpg" alt="IMG" />
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
                                                <img src="images/item-cart-03.jpg" alt="IMG" />
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

                {/* <!-- Header Mobile --> */}
                <div className="wrap_header_mobile">
                    {/* <!-- Logo moblie --> */}
                    <a href="index.html" className="logo-mobile">
                        <img src="images/icons/logo.png" alt="IMG-LOGO" />
                    </a>

                    {/* <!-- Button show menu --> */}
                    <div className="btn-show-menu">
                        {/* <!-- Header Icon mobile --> */}
                        <div className="header-icons-mobile">
                            <a href="!#" className="header-wrapicon1 dis-block">
                                <img src="images/icons/icon-header-01.png" className="header-icon1" alt="ICON" />
                            </a>

                            <span className="linedivide2"></span>

                            <div className="header-wrapicon2">
                                <img src="images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                <span className="header-icons-noti">0</span>

                                {/* <!-- Header cart noti --> */}
                                <div className="header-cart header-dropdown">
                                    <ul className="header-cart-wrapitem">
                                        <li className="header-cart-item">
                                            <div className="header-cart-item-img">
                                                <img src="images/item-cart-01.jpg" alt="IMG" />
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
                                                <img src="images/item-cart-02.jpg" alt="IMG" />
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
                                                <img src="images/item-cart-03.jpg" alt="IMG" />
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

                        <div className="navbar-toggler hamburger hamburger--squeeze" data-toggle="collapse" data-target="#mobNavbarMenu" aria-controls="mobNavbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* <!-- Menu Mobile --> */}
                <div className="collapse navbar-collapse" id="mobNavbarMenu">
                    <nav className="side-menu">
                        <ul className="main-menu">
                            <li className="item-menu-mobile">
                                <a href="!#">Home</a>
                            </li>
                            <li className="item-menu-mobile">
                                <a href="!#">Products</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="!#">About</a>
                            </li>

                            <li className="item-menu-mobile">
                                <a href="!#">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;