import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';


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

    state = {
        isAuthenticated: false,
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true };
        } else {
            return { isAuthenticated: false };
        }
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    onLogout = e => {
        e.preventDefault();

        const { firebase } = this.props;
        firebase.logout();
    }

    render() {
        const { classes, auth } = this.props;
        const { isAuthenticated } = this.state;
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

                        <Hidden smDown>
                            <Link to="/">
                                <h4 style={{ color: 'white' }}>
                                    ShopBox
                                </h4>
                            </Link>
                        </Hidden>



                        {
                            isAuthenticated
                                ? (
                                    <div className="ml-auto">
                                        <Hidden smDown>
                                            <a href="!#" className="btn text-white">{auth.email}</a>
                                        </Hidden>
                                        <a href="!#" className="btn text-white" onClick={this.onLogout}>Logout</a>
                                    </div>
                                )
                                : null
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
    }))
)(Appbar);
