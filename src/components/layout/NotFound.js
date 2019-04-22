import React, { Component } from 'react';
import Loader from './LoaderForPublic';
import Header from '../public/layout/Header';
import Footer from '../public/layout/Footer';
import scrollToTop from '../public/functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class NotFound extends Component {

    componentDidMount() {
        scrollToTop();
    }

    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <div className="bg-white" >
                    <Header activePage="login" categories={categories} history={this.props.history} />
                    <h1 className="display-4 text-center mt-5 mb-5" style={{ paddingBottom: '300px' }}>
                        <span className="font-pink font-weight-bold mr-1">404</span>
                        Not Found
                    </h1>
                    <Footer categories={categories} />
                </div>
            )
        }
        else {
            return <Loader />
        }
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'categories',
                limit: 3
            }
        ]
    }),
    firebaseConnect(),
    connect(
        (state, props) => (
            {
                categories: state.firestore.ordered.categories,
            }
        ),
    )
)(NotFound);