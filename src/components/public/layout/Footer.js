import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {

    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        const { categories } = this.props;
        return (
            <footer className="bg6 p-t-45 p-b-43 p-l-45 p-r-45">
                <div className="flex-w p-b-90">
                    <div className="w-size6 p-t-30 p-l-15 p-r-15 respon3">
                        <h4 className="s-text12 p-b-30">
                            GET IN TOUCH
				        </h4>

                        <div>
                            <p className="s-text7 w-size27">
                                Any questions? Let us know by contacting us on 0300-1234567 or you can visit our office at 2nd Floor, Office#203, Amma Tower, Saddar, Karachi, Pakistan
					        </p>

                            <div className="flex-m p-t-30">
                                <i style={{ cursor: 'pointer' }} className="fs-18 color1 p-r-20 fab fa-facebook-f"></i>
                                <i style={{ cursor: 'pointer' }} className="fs-18 color1 p-r-20 fab fa-instagram"></i>
                                <i style={{ cursor: 'pointer' }} className="fs-18 color1 p-r-20 fab fa-pinterest-p"></i>
                                <i style={{ cursor: 'pointer' }} className="fs-18 color1 p-r-20 fab fa-snapchat-ghost"></i>
                                <i style={{ cursor: 'pointer' }} className="fs-18 color1 p-r-20 fab fa-youtube-play"></i>
                            </div>
                        </div>
                    </div>

                    <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Categories
				        </h4>

                        <ul>
                            {
                                categories.map(
                                    cat => (
                                        <li className="p-b-9" key={cat.id}>
                                            <Link to={`/products/category/${cat.id}`} className="s-text7">
                                                {cat.catName}
                                            </Link>
                                        </li>
                                    )
                                )
                            }

                        </ul>
                    </div>

                    <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Links
				        </h4>

                        <ul>
                            <li className="p-b-9">
                                <Link to="/about" className="s-text7">
                                    About Us
						        </Link>
                            </li>

                            <li className="p-b-9">
                                <Link to="/contact" className="s-text7">
                                    Contact Us
						        </Link>
                            </li>


                        </ul>
                    </div>

                    <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
                        <h4 className="s-text12 p-b-30">
                            Help
				        </h4>

                        <ul>
                            <li className="p-b-9">
                                <a className="s-text7">
                                    Track Order
						        </a>
                            </li>

                            <li className="p-b-9">
                                <a className="s-text7">
                                    Returns
						        </a>
                            </li>

                            <li className="p-b-9">
                                <a className="s-text7">
                                    Shipping
						        </a>
                            </li>

                            <li className="p-b-9">
                                <a className="s-text7">
                                    FAQs
						        </a>
                            </li>
                        </ul>
                    </div>

                    <div className="w-size8 p-t-30 p-l-15 p-r-15 respon3">
                        <h4 className="s-text12 p-b-30">
                            Newsletter
				        </h4>

                        <form onSubmit={this.onSubmit}>
                            <div className="effect1 w-size9">
                                <input
                                    className="s-text7 bg6 w-full p-b-5"
                                    autoComplete="off" style={{ border: 'none' }}
                                    type="text"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <span className="effect1-line"></span>
                            </div>

                            <div className="w-size2 p-t-20">
                                <button className="flex-c-m size2 bg4 bo-rad-23 hov1 m-text3 trans-0-4">
                                    Subscribe
						        </button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="t-center p-l-15 p-r-15">
                    <div className="t-center s-text8 p-t-20">
                        Copyright © 2019 All rights reserved. | This Webapp is made by <b>Izhan Yameen</b>
                    </div>
                </div>
            </footer>
        )
    }
}
