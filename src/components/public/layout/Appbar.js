import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" style={{ backgroundColor: '#f6b419', color: 'white' }}>
                <Toolbar>
                    <span style={{ color: 'white' }}>
                        <h4>Shopbox <small>store</small></h4>
                    </span>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);