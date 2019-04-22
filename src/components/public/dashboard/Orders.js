import React, { Component } from 'react';
import Dashboard from '../layout/CustomerDashbaord';

class Orders extends Component {
    render() {
        const { history } = this.props;
        const mainContent = <h2>This is Orders page</h2>;

        return <Dashboard mainContent={mainContent} history={history} />
    }
}

export default Orders;
