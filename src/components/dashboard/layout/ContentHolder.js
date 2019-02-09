import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './Appbar';
import MyDrawer from './MyDrawer'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class ContentHolder extends Component {

    state = {
        mobileOpen: false
    }

    handleDrawerToggle = (mobileOpen) => {
        this.setState({ mobileOpen });
    };

    render() {
        const { classes } = this.props;
        const { mainContent } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Appbar handleDrawerToggle={this.handleDrawerToggle} />
                <MyDrawer handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {mainContent}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ContentHolder);

