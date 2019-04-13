import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Hidden } from '@material-ui/core';

class Loader extends Component {
    render() {
        const stylesForDesktop = {
            position: 'fixed',
            left: '50%',
            top: '50%',
        }
        const stylesForMobile = {
            position: 'fixed',
            left: '45%',
            top: '45%',
        }

        return (
            <React.Fragment>
                <Hidden smDown>
                    <div style={stylesForDesktop}>
                        <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
                    </div>
                </Hidden>
                <Hidden mdUp>
                    <div style={stylesForMobile}>
                        <CircularProgress style={{ margin: 'auto', display: 'block' }} color="inherit" />
                    </div>
                </Hidden>
            </React.Fragment>
        )
    }
}

export default Loader;
