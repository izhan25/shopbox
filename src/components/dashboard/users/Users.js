import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';

export default class Users extends Component {
    render() {
        const mainContent = (
            <div>
                <h1>This is Users page</h1>
            </div>
        )
        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}
