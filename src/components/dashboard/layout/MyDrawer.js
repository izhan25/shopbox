import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
});

class MyDrawer extends Component {

    state = {
        showProducts: false,
        showUsers: false,
    };

    onProductDownClick = (e) => this.setState({ showProducts: !this.state.showProducts });
    onUsersDownClick = (e) => this.setState({ showUsers: !this.state.showUsers });

    render() {

        const { classes, theme } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />

                <List>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <i className="fas fa-tachometer-alt" style={{ fontSize: '22px' }}></i>
                            </ListItemIcon>
                            <ListItemText inset primary="Dashboard" />
                        </ListItem>
                    </Link>

                    <Link to="/categories" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <i className="fas fa-folder" style={{ fontSize: '22px' }}></i>
                            </ListItemIcon>
                            <ListItemText inset primary="Categories" />
                        </ListItem>
                    </Link>

                    <ListItem button onClick={this.onProductDownClick}>
                        <ListItemIcon>
                            <i className="fas fa-shopping-cart" style={{ fontSize: '22px' }}></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Products" />
                        {this.state.showProducts ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.showProducts} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/products" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset secondary="Show All Products" />
                                </ListItem>
                            </Link>
                            <Link to="/product/add" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset secondary="Add New Product" />
                                </ListItem>
                            </Link>
                            <Link to="/categories" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset secondary="Show Categories" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>

                    {/* FOLLOWING CODE IS FOR USERS OPTIONS TO SHOW IN DRAWER  */}

                    {/* <ListItem button onClick={this.onUsersDownClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Users" />
                        {this.state.showUsers ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.showUsers} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/users" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset secondary="Show User" />
                                </ListItem>
                            </Link>
                            <Link to="/user/add" style={{ textDecoration: 'none' }}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText inset secondary="Add New User" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse> */}

                    <Link to="/customers" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <i className="fas fa-user-tag" style={{ fontSize: '22px' }}></i>
                            </ListItemIcon>
                            <ListItemText inset primary="Customers" />
                        </ListItem>
                    </Link>

                    <Link to="/orders" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <i className="fas fa-hand-pointer" style={{ fontSize: '22px' }}></i>
                            </ListItemIcon>
                            <ListItemText inset primary="Orders" />
                        </ListItem>
                    </Link>

                    <Link to="/queries" style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemIcon>
                                <i className="fas fa-question" style={{ fontSize: '22px' }}></i>
                            </ListItemIcon>
                            <ListItemText inset primary="Customer Queries" />
                        </ListItem>
                    </Link>

                </List>
                <Divider />
                <Link to="/display" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className="fas fa-images" style={{ fontSize: '22px' }}></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Display" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <ListItem button>
                        <ListItemIcon>
                            <i className="fas fa-user" style={{ fontSize: '22px' }}></i>
                        </ListItemIcon>
                        <ListItemText inset primary="Profile" />
                    </ListItem>
                </Link>
            </div>
        );
        return (
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={() => this.props.handleDrawerToggle(false)}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        )
    }
}
export default withStyles(styles, { withTheme: true })(MyDrawer);