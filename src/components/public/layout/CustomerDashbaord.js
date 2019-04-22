import React, { Component } from 'react';
import Loader from '../../layout/LoaderForPublic';
import Header from './Header';
import Footer from './Footer';
import scrollToTop from '../functions/scrollToTop';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2';

class Profile extends Component {

    componentDidMount() {
        scrollToTop();
    }

    onLogoutClick = () => {
        const { firebase } = this.props;

        // confirming
        Swal.fire({
            type: 'question',
            text: 'Are you sure?',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#d33',
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonClass: 'btn btn-light'
        }).then(result => {
            if (result.value) {
                // logging out
                firebase.logout();
            }
        })
    }

    render() {
        const { categories, mainContent, history } = this.props;

        if (categories) {
            return (
                <div className="bg-white">
                    <Header activePage="profile" categories={categories} history={this.props.history} />

                    <div className="container">
                        <h5 className="mb-3 mt-4 border border-danger border-top-0 border-left-0 border-right-0 p-3">Welcome, {this.props.auth.displayName}</h5>

                        <Hidden smDown>
                            <Grid container>
                                <Grid item sm={4} md={3}>
                                    <List component="nav">
                                        <ListItem button onClick={() => history.push('/profile')}>
                                            <ListItemIcon>
                                                <i className="fas fa-user"></i>
                                            </ListItemIcon>
                                            <ListItemText primary="Profile" />
                                        </ListItem>

                                        <ListItem button onClick={() => history.push('/orders')}>
                                            <ListItemIcon>
                                                <i className="fas fa-file-invoice-dollar"></i>
                                            </ListItemIcon>
                                            <ListItemText primary="My Orders" />
                                        </ListItem>

                                        <ListItem button onClick={this.onLogoutClick}>
                                            <ListItemIcon>
                                                <i className="fas fa-sign-out-alt"></i>
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item sm={4} md={4}>
                                    {mainContent}
                                </Grid>
                            </Grid>
                        </Hidden>

                        <Hidden mdUp>
                            <div className="fixed-bottom bg-white border border-dark border-left-0 border-right-0 border-bottom-0">
                                <List className="d-flex d-inline">
                                    <ListItem button className="d-flex justify-content-center" onClick={() => history.push('/profile')}>
                                        <ListItemIcon>
                                            <i className="fas fa-user fa-2x"></i>
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem button className="d-flex justify-content-center" onClick={() => history.push('/orders')}>
                                        <ListItemIcon>
                                            <i className="fas fa-file-invoice-dollar fa-2x"></i>
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem button onClick={this.onLogoutClick} className="d-flex justify-content-center">
                                        <ListItemIcon>
                                            <i className="fas fa-sign-out-alt fa-2x"></i>
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </div>
                            {mainContent}
                        </Hidden>
                    </div>

                    <Hidden smDown>
                        <Footer categories={categories} />
                    </Hidden>

                </div>
            )
        }
        else {
            return <Loader />
        }
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'categories',
                limit: 3
            }
        ]
    }),
    firebaseConnect(),
    connect(
        (state, props) => (
            {
                categories: state.firestore.ordered.categories,
                auth: state.firebase.auth
            }
        ),
    )
)(Profile);