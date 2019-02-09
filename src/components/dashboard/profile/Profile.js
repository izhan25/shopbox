import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';

class Profile extends Component {
    render() {
        const mainContent = (
            <div>
                <h1>This is Profile page</h1>
            </div>
        )
        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

export default Profile;