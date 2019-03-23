import React, { Component } from 'react'
import Header from '../layout/Header';
import Loader from '../../layout/Loader';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class Products extends Component {
    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <React.Fragment>
                    <Header activePage="products" categories={categories} />
                    <h2 className="text-center mt-3">This is Products Page</h2>
                </React.Fragment>
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
                limit: 3,
            },
        ]
    }),
    connect((state, props) => ({
        categories: state.firestore.ordered.categories,
    }))
)(Products);