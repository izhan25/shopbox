import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends Component {
    render() {
        return (
            <div>
                <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
            </div>
        )
    }
}

export default Loader;
