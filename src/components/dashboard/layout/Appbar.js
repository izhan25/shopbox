import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
});



class Appbar extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <AppBar position="fixed" className={classes.appBar} style={{ backgroundColor: '#f6b419' }}> */}
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => this.props.handleDrawerToggle(true)}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <span style={{ color: 'white' }}>
                                <i className="fas fa-arrow-circle-left" /> Back
                            </span>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Appbar);
