import React, { Component } from 'react'
import Header from '../layout/Header';
import Loader from '../../layout/Loader';
import Footer from '../layout/Footer';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class About extends Component {
    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="about" categories={categories} />
                    <ContentNew />
                    <Footer categories={categories} />
                </React.Fragment>
            )
        }
        else {
            return <Loader />
        }
    }
}

const ContentNew = () => {
    return (
        <section>
            <Banner />
            <OurStory />
            <OurPromise />
            <OurPurpose />
        </section>
    )
}

const Banner = () => {
    return (
        <div className="row">
            <div className="col-md-12 hov-img-zoom">
                <img src="images/about.jpg" alt="IMG-ABOUT" style={{ opacity: '0.7' }} />
                <div className="carousel-caption d-none d-md-block text-dark">
                    <h1 className="font-weight-bolder" style={{ textShadow: '2px 2px white' }}>Delivering happiness on the go!</h1>
                    <h5 className="font-weight-bold">Happy Shopping</h5>
                </div>
            </div>
        </div>
    )
}

const OurStory = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div className="row mb-2">
                    <div className="col-md-12">
                        <h1 className="display-5 text-center mt-5">Our Story</h1>
                    </div>
                </div>
                <hr style={{ backgroundColor: '#e65540' }} />
                <div className="row ">
                    <div className="col-md-12 mb-5">
                        <p className="text-justify">
                            Hello and welcome to Shopbox, a new generation e-commerce site to buy the best products for every taste and occasion. We thoroughly check the quality of our goods, working only with reliable suppliers so that you only receive the best quality product.
                    </p>
                        <br />
                        <p className="text-justify">
                            We at Shopbox believe in high quality and exceptional customer service. But most importantly, we believe shopping is a right, not a luxury, so we strive to deliver the best products at the most affordable prices, and ship them to you regardless of where you are located.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OurPromise = () => {
    return (
        <div className="row" style={{ backgroundColor: '#ff7f35' }}>
            <div className="col-md-12">
                <img src="images/ourpromise.jpg" alt="IMG_PROMISE" className="img-fluid d-flex mx-auto" />
            </div>
        </div>
    )
}

const OurPurpose = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div className="row mb-2">
                    <div className="col-md-12">
                        <h1 className="display-5 text-center mt-5">Our Purpose</h1>
                    </div>
                </div>
                <hr style={{ backgroundColor: '#e65540' }} />
                <div className="row ">
                    <div className="col-md-12 mb-5">
                        <p className="text-justify">
                            In a world that moves at the speed of light, in which everything is disposable, the only things that last are good ideas. Good ideas that combine the latest trends, innovation, strategy and creativity and create brand equity. We eat, play, think and create together. In the noisy coffee breaks, ideas float around through outbursts of laughter and jokes. Luckily, we take a lot of breaks. We are a purpose driven company, with the highest of standards and creative vision and we deliver with love to our shoppers.
                        </p>
                        <br />
                        <div className="bo13 p-l-29 m-l-9 p-b-10 col-md-7">
                            <p className="p-b-11">
                                <small className="text-justify">
                                    Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.
                                </small>
                            </p>

                            <span className="s-text7">
                                - Steve Job’s
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
)(About);