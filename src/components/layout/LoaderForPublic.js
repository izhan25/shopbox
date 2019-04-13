import React, { Component } from 'react';
import LoaderGif from './loaderBig.gif';
import { Hidden } from '@material-ui/core';

class Loader extends Component {
    render() {

        const stylesForDesktop = {
            position: 'fixed',
            left: '45%',
            top: '45%',
        }
        const stylesForMobile = {
            position: 'fixed',
            left: '35%',
            top: '45%',
        }
        return (
            <React.Fragment>
                <Hidden smDown>
                    <div style={stylesForDesktop}>
                        <img src={LoaderGif} style={{ margin: 'auto', display: 'block' }} alt="Loading..." className="img-fluid" />
                    </div>
                </Hidden>
                <Hidden mdUp>
                    <div style={stylesForMobile}>
                        <img src={LoaderGif} style={{ margin: 'auto', display: 'block' }} alt="Loading..." className="img-fluid" />
                    </div>
                </Hidden>
            </React.Fragment>
        )
    }
}

export default Loader;
