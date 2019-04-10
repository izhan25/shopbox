import React, { Component } from 'react';
import LoaderGif from './loader.gif';
// import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends Component {
    render() {
        return (
            <div style={{
                position: 'fixed',
                left: '45%',
                top: '45%',
            }}>
                {/* <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" /> */}
                <img src={LoaderGif} style={{ margin: 'auto', display: 'block' }} alt="Loading..." className="img-fluid" />
            </div>
        )
    }
}

export default Loader;
