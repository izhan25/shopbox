import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default function Product({ prod, functions: { scrollToTop, addItemToCart } }) {
    return (
        <div className="col mt-2">
            <div className="block2">
                <div className={classnames(
                    'block2-img wrap-pic-w of-hidden pos-relative ',
                    {
                        'block2-labelnew': prod.createdAt.toDate().getDate() === new Date().getDate()
                    }
                )}>
                    <img src={prod.productImages.images[0]} alt="IMG-PRODUCT" className="img-fluid" />

                    <div className="block2-overlay trans-0-4">
                        <a className="block2-btn-addwishlist hov-pointer trans-0-4">
                            <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                            <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                        </a>

                        <div className="block2-btn-addcart w-size1 trans-0-4">
                            <div className="btn-group d-flex justify-content-center">
                                <a onClick={() => { addItemToCart(prod) }} className="flex-c-m btn btn-sm bg4 s-text1 hov1 trans-0-4 rounded-left">
                                    <i className="fas fa-cart-plus text-white"></i>
                                </a>
                                <Link to={`/product/${prod.id}`} onClick={scrollToTop} className="flex-c-m btn btn-primary btn-sm s-text1 trans-0-4 rounded-right">
                                    <i className="fas fa-search-plus"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block2-txt p-t-20">
                    <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5 text-capitalize text-truncate">
                        {prod.productName}
                    </a>

                    <span className="block2-price m-text6 p-r-5">
                        <small>
                            <del className="text-danger mr-1">Rs.{prod.originalPrice}</del>
                            <span className="text-primary">Rs.{prod.discountPrice}</span>
                        </small>
                    </span>
                </div>
            </div>
        </div>
    )
}
