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
        categories: [],

        openSnackBar: false,
        msgSnackBar: '',
        dense: false,

        updating: false,

        catId: '',
        catName: '',
        secured: false,

        error: ''
    }

    static getDerivedStateFromProps(props, state) {
        const { categories } = props;

        if (categories) {
            return {
                categories
            }
        }

        return null;
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    editCategory = cat => {
        this.setState({
            catId: cat.id,
            catName: cat.catName.toLowerCase(),
            secured: cat.secured,
            updating: true
        })
    }
    cancelUpdate = () => {
        this.setState({
            catId: '',
            catName: '',
            updating: false
        })
    }

    secureCategory = cat => {
        const { firestore } = this.props;

        const updCat = {
            catName: cat.catName.toLowerCase(),
            secured: !cat.secured
        }

        let msg = cat.secured ? 'Category Unsecured' : 'Category Secured';

        firestore
            .update({ collection: 'categories', doc: cat.id }, updCat)
            .then(() => {
                this.setState({
                    msgSnackBar: msg,
                    openSnackBar: true
                })
            });

    }

    onDelete = id => {
        const { firestore } = this.props;
        const that = this;
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
                            })
                            .then(() => {
                                const { firebase } = this.props;
                                const db = firebase.firestore();

                                db.collection('products').where('category.id', '==', id).get().then(querySnapshot => {
                                    querySnapshot.forEach(doc => {
                                        const { firestore } = that.props;
                                        firestore.delete({ collection: 'products', doc: doc.id }).then(() => {
                                            this.setState({
                                                msgSnackBar: `Deleted Associated Product`,
                                                openSnackBar: true
                                            })
                                        })
                                    })
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

    onUpdate = e => {
        e.preventDefault();

        const { catName, catId, secured } = this.state;
        const { firestore } = this.props;

        const updCat = { catName: catName.toLowerCase(), secured }

        const that = this;

        firestore
            .update({ collection: 'categories', doc: catId }, updCat)
            .then(() => {
                this.setState({
                    catId: '',
                    catName: '',
                    msgSnackBar: 'Category Updated',
                    openSnackBar: true
                })
            })
            .then(() => {
                const { firebase } = this.props;
                const db = firebase.firestore();

                db.collection('products').where('category.id', '==', catId).get().then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        const { firestore } = that.props;
                        const updProd = {
                            ...doc.data(),
                            category: {
                                id: catId,
                                catName
                            }
                        }
                        firestore.update({ collection: 'products', doc: doc.id }, updProd);
                    });
                })
            })
    }
    onSubmit = e => {
        e.preventDefault();

        const { catName, secured } = this.state;
        const { firestore } = this.props;

        const newCategory = {
            catName: catName.toLowerCase(),
            secured,
            createdAt: new Date()
        }

        firestore
            .add({ collection: 'categories' }, newCategory)
            .then(() => {
                this.setState({
                    catName: '',
                    msgSnackBar: 'Category Added',
                    openSnackBar: true
                })
            })
            .catch(err => {
                this.setState({
                    error: 'Permission Denied'
                });

                setTimeout(() => {
                    this.setState({ error: '' })
                }, 3000);
            });

    }

    render() {

        const { catName, dense, updating, error } = this.state;
        const { categories } = this.props;

        // Building Category List
        let catDisplay;
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
                                        <IconButton aria-label="security" onClick={() => { this.editCategory(cat) }}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </IconButton>
                                        {
                                            cat.secured
                                                ? (
                                                    <IconButton aria-label="security" onClick={() => { this.secureCategory(cat) }}>
                                                        <i className="fas fa-lock"></i>
                                                    </IconButton>
                                                )
                                                : (
                                                    <React.Fragment>
                                                        <IconButton aria-label="security" onClick={() => { this.secureCategory(cat) }}>
                                                            <i className="fas fa-lock-open"></i>
                                                        </IconButton>
                                                        <IconButton aria-label="Delete" onClick={() => { this.onDelete(cat.id) }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </React.Fragment>
                                                )

                                        }
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        )
                    }

                </List>
            )
        }
        else {
            catDisplay = <Loader />;
        }


        // Building Button
        let button;
        if (updating) {
            if (catName !== '') {
                button = <div>
                    <input type="submit" value="Update" className="btn btn-gray" onClick={this.onUpdate} />
                    <input type="button" value="Cancel" className="btn btn-secondary rounded-right" onClick={this.cancelUpdate} />
                </div>
            }
            else {
                button = <div>
                    <input type="submit" value="Update" className="btn btn-secondary" disabled />
                    <input type="button" value="Cancel" className="btn btn-secondary rounded-right" onClick={this.cancelUpdate} />
                </div>
            }
        }
        else {
            if (catName !== '') {
                button = <input type="submit" className="btn btn-gray rounded-right" />
            }
            else {
                button = <input type="submit" className="btn btn-secondary rounded-right" disabled />
            }
        }


        const mainContent = (
            <React.Fragment>
                {
                    error !== ''
                        ? <div className="alert alert-danger">{error}</div>
                        : null
                }
                <TitleBar titleName="Categories" />

                <form onSubmit={this.onSubmit} className="mb-4">
                    <div className="input-group">
                        <input type="text" name="catName" value={catName} onChange={this.onChange} className="form-control" autoComplete="off" />
                        <div className="input-group-append">
                            {button}
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
        {
            collection: 'categories',
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect(
        (state, props) => ({
            categories: state.firestore.ordered.categories
        })
    )
)(Categories);
