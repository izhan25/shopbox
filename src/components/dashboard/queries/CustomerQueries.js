import React, { Component } from 'react';
import ContentHolder from '../layout/ContentHolder';
import TitleBar from '../layout/TitleBar';
import Loader from '../../layout/Loader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class CustomerQueries extends Component {

    state = {
        queries: [],
        openSnackBar: false,
        msgSnackBar: '',
    }

    static getDerivedStateFromProps(props, state) {
        const { queries } = props;

        if (queries) {
            return { queries }
        }

        return null;
    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackBar: false, msgSnackBar: '' });
    };

    onMarkAsReadClick = queryId => {
        const { firebase } = this.props;
        const db = firebase.firestore();

        db.collection('customerContact')
            .doc(queryId)
            .update({ read: true })
            .then(() => {
                this.setState(prevState => ({
                    openSnackBar: true,
                    msgSnackBar: 'Marked as read'
                }))
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    onDelete = queryId => {
        const { firebase } = this.props;
        const db = firebase.firestore();

        db.collection('customerContact')
            .doc(queryId)
            .delete()
            .then(() => {
                this.setState(prevState => ({
                    openSnackBar: true,
                    msgSnackBar: 'Deleted'
                }))
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        const { queries } = this.state;

        const mainContent = (
            <div>
                <TitleBar titleName="Cusomer queries" />


                {
                    queries
                        ? queries.map(
                            query =>
                                <QueryRow
                                    key={query.id}
                                    query={query}
                                    onDelete={this.onDelete}
                                    onMarkAsReadClick={this.onMarkAsReadClick}
                                />
                        )
                        : <Loader />
                }

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
            </div>
        )
        return (
            <div>
                <ContentHolder mainContent={mainContent} />
            </div>
        )
    }
}

const QueryRow = ({ query, onDelete, onMarkAsReadClick }) => {
    return (
        <React.Fragment>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className="mr-3 text-capitalize">
                        <span className="text-muted">
                            <small>From:</small>
                        </span>
                        {query.fullName}
                    </div>

                    <div>
                        <span className="badge badge-pill badge-danger font-weight-bold">

                            {
                                query.read
                                    ? null
                                    : "Un-Read"
                            }
                        </span>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="row">

                        <div className="col-md-12">
                            <span className="text-muted mr-3">
                                <small>Email:</small>
                            </span>

                            {query.email}
                        </div>

                        <div className="col-md-12">
                            <span className="text-muted mr-3">
                                <small>Contact:</small>
                            </span>

                            {query.contact}
                        </div>

                        <div className="col-md-12 mt-5">
                            <span className="text-muted mr-3">
                                <small>Message:</small>
                            </span>

                            {query.message}
                        </div>

                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button
                        size="small"
                        onClick={() => { onDelete(query.id) }}
                    >
                        Delete
                                            </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => { onMarkAsReadClick(query.id) }}
                    >
                        Mark As Read
                                            </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>


        </React.Fragment>
    )
}


export default compose(
    firebaseConnect(),
    firestoreConnect(props => [
        {
            collection: 'customerContact',
            orderBy: [['createdAt', 'desc']]
        }
    ]),
    connect((state, props) => ({
        queries: state.firestore.ordered.customerContact,
    }))
)(CustomerQueries);