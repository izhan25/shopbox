import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';

class Categories extends Component {

    render() {
        const mainContent = (
            <div>

                <h1>This Is Categories Page</h1>
            </div>
        )

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}



export default Categories;
