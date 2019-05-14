import React, { Component } from 'react';
import Loader from './LoaderForPublic';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

class NotFound extends Component {

    componentDidMount() {
        window.scroll(0, 0);
    }

    render() {
        const { categories } = this.props;

        if (categories) {
            return (
                <div className="bg-white" >
                    <h1 className="display-4 text-center mt-5 mb-5" style={{ paddingBottom: '300px' }}>
                        <span className="font-pink font-weight-bold mr-1">404</span>
                        Not Found
                    </h1>
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