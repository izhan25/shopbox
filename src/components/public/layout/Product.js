import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default function Product({ prod, functions: { scrollToTop, addItemToCart } }) {
    return (
        <div className="col mt-2">
            <div className="block2">
                <Link
                    to={`/product/${prod.id}`}
                    onClick={scrollToTop}
                    className={classnames(
                        'block2-img wrap-pic-w of-hidden pos-relative hov-prod',
                        {
                            'block2-labelnew': prod.createdAt.toDate().getDate() === new Date().getDate()
                        }
                    )}
                >

                    <img src={prod.productImages.images[0]} alt="IMG-PRODUCT" className="img-fluid" />
                </Link>


                <div className="block2-txt p-t-20">
                    <Link to={`/product/${prod.id}`} onClick={scrollToTop} className="block2-name dis-block s-text3 p-b-5 text-capitalize text-truncate">
                        {prod.productName}
                    </Link>

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
