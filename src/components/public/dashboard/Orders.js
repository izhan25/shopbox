import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';


class Orders extends Component {

    state = {
        orders: []
    }


    componentDidMount() {
        const { firestore, customer } = this.props;
        let orders = [];

        firestore
            .get({ collection: 'orders', where: ['customer.email', '==', customer.email] })
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let order = { ...doc.data(), id: doc.id }
                    orders.push(order);
                })
            })
            .catch(error => {
                console.log(error.message);
            });
        
        this.setState({orders})

    }

    render() {
        const { history } = this.props;
        const { orders } = this.state;

        console.log(orders.length);

        const mainContent = (
            <ul>
                {
                    orders.map(order => {
                        return (
                            <li>{order} test</li>
                            
                        )
                    })
                }
            </ul>
        );

        return <Dashboard mainContent={mainContent} history={history} />
    }
}

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect(
        (state, props) => ({
            auth: state.firebase.auth,
            customer: state.customer.customer,
        }),
    )
)(Orders);
