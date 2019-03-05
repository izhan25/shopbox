import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Snackbar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



class Categories extends Component {

    state = {
        openSnackBar: false,
        msgSnackBar: '',
        dense: false,

        catName: '',
        secured: true
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    secureToggle = () => {
        this.setState({
            secured: !this.state.secured
        })
    }

    onDelete = id => {
        const { firestore } = this.props;

        confirmAlert({
            message: 'Are You Sure You Want To Delete This Category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        firestore.delete({ collection: 'categories', doc: id })
                            .then(() => {
                                this.setState({
                                    msgSnackBar: 'Category Deleted',
                                    openSnackBar: true
                                })
                            });
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        //
                    }
                }
            ]
        })
    }

    onSubmit = e => {
        e.preventDefault();

        const { catName, secured } = this.state;
        const { firestore } = this.props;

        const newCategory = { catName, secured }

        firestore.add({ collection: 'categories' }, newCategory)
            .then(() => {
                this.setState({
                    catName: '',
                    msgSnackBar: 'Category Added',
                    openSnackBar: true
                })
            });

    }

    render() {

        const { catName, dense, secured } = this.state;
        const { categories } = this.props;

        let catDisplay = <Loader />
        if (categories) {
            catDisplay = (
                <List dense={dense}>
                    {
                        categories.map(
                            cat => (
                                <ListItem key={cat.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={cat.catName}
                                    // secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="security" onClick={this.secureToggle}>
                                            {
                                                secured
                                                    ? <i className="fas fa-lock"></i>
                                                    : <i className="fas fa-lock-open"></i>
                                            }
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={() => { this.onDelete(cat.id) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        )
                    }

                </List>
            )
        }

        const mainContent = (
            <React.Fragment>
                <TitleBar titleName="Categories" />

                <form onSubmit={this.onSubmit} className="mb-4">
                    <div className="input-group">
                        <input type="text" name="catName" value={catName} onChange={this.onChange} className="form-control" autoComplete="off" />
                        <div className="input-group-append">
                            {
                                catName !== ''
                                    ? <input type="submit" className="btn btn-gray rounded-right" />
                                    : <input type="submit" className="btn btn-secondary rounded-right" disabled />
                            }
                        </div>
                    </div>

                </form>

                {catDisplay}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnackBar}
                    autoHideDuration={6000}
                    onClose={this.handleCloseSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.msgSnackBar}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleCloseSnackBar}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

            </React.Fragment>
        )

        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}


export default compose(
    firebaseConnect(),
    firestoreConnect([
        { collection: 'categories' }
    ]),
    connect(
        (state, props) => ({
            categories: state.firestore.ordered.categories
        })
    )
)(Categories);
