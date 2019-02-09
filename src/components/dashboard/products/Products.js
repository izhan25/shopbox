import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';

class Products extends Component {
    render() {
        const mainContent = (
            <div>
                <h1>This is products page</h1>
            </div>
        )
        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

export default Products;
