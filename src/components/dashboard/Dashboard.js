import React, { Component } from 'react';
import ContentHolder from './layout/ContentHolder';


class Dashboard extends Component {

    render() {
        const mainContent = (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h1>This is main content</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <ContentHolder mainContent={mainContent} />
        );
    }
}

export default Dashboard;

