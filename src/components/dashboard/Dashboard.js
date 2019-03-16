import { Grid, Hidden, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import './assets/css/styles.css';
import ContentHolder from './layout/ContentHolder';
import TitleBar from './layout/TitleBar';
// import Breadcrum from './layout/Breadcrum';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        backgroundColor: '#fff3e0'
    },
    facebook: {
        backgroundColor: '#0d47a1',
        height: '100px',
        color: 'white',
        textAlign: 'center',
        padding: 20
    },
    twitter: {
        // backgroundColor: '#64b5f6',s
        backgroundColor: '#4fc3f7',
        height: '100px',
        color: 'white',
        textAlign: 'center',
        padding: 20
    },
    google: {
        backgroundColor: '#c62828',
        height: '100px',
        color: 'white',
        textAlign: 'center',
        padding: 20
    },
    socialFooter: {
        textAlign: 'center',
        padding: 20,
        fontWeight: 'bold',
        fontSize: '17px'
    }

})

class Dashboard extends Component {

    handleClick = () => alert('btn clicked');

    render() {
        const { classes } = this.props;
        // const history = [
        //     // { link: '/', title: 'Home' },
        //     // { link: '/dashboard', title: 'Dashboard' }
        // ]

        const mainContent = (
            <React.Fragment>
                {/* <Breadcrum history={history} current="Home" /> */}
                <TitleBar titleName="Dashboard" />
                <Hidden xsDown>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12} sm={4} md={4}>
                            <Paper>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={classes.facebook} >
                                            <i className={'fab fa-facebook-f'} style={{ fontSize: '50px' }} />
                                        </div>
                                        <div className={classes.socialFooter}>
                                            14k <span style={{ fontSize: '25px' }}>|</span> Likes
                                    </div>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <Paper>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={classes.twitter} >
                                            <i className="fab fa-twitter" style={{ fontSize: '50px' }} />
                                        </div>
                                        <div className={classes.socialFooter}>
                                            14k <span style={{ fontSize: '25px' }}>|</span> Follows
                                    </div>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <Paper>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className={classes.google} >
                                            <i className={'fab fa-google-plus-g'} style={{ fontSize: '50px' }} />
                                        </div>
                                        <div className={classes.socialFooter}>
                                            14k <span style={{ fontSize: '25px' }}>|</span> Plus
                                    </div>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>

                    </Grid>
                </Hidden>

                <div className="row mt-3">
                    <div className="col-md-8">
                        <Paper>
                            <section className="card">
                                <div className="twt-feed blue-bg">
                                    <div className="corner-ribon black-ribon">
                                        <i className="fab fa-twitter"></i>
                                    </div>
                                    <div className="fab fa-twitter wtt-mark"></div>

                                    <div className="media">
                                        <Link to="/">
                                            <img className="align-self-center rounded-circle mr-3" style={{ width: '85px', height: '85px' }}
                                                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Wikipedia_User-ICON_byNightsight.png" alt="user img" />
                                        </Link>
                                        <div className="media-body">
                                            <h2 className="text-white display-6">Izhan Baig</h2>
                                            <p className="text-light">Project Manager</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="weather-category twt-category">
                                    <ul>
                                        <li className="active">
                                            <h5>750</h5>
                                            Tweets
                                    </li>
                                        <li>
                                            <h5>865</h5>
                                            Following
                                    </li>
                                        <li>
                                            <h5>3645</h5>
                                            Followers
                                    </li>
                                    </ul>
                                </div>
                                <div className="twt-write col-sm-12">
                                    <textarea placeholder="Write your Tweet and Enter" rows="1" className="form-control t-text-area"></textarea>
                                </div>
                                <footer className="twt-footer">
                                    <i className="fa fa-camera"></i>{'  '}
                                    <i className="fa fa-map-marker mr-2"></i>
                                    New Castle, UK
                                <span className="float-right">
                                        32
                                </span>
                                </footer>
                            </section>
                        </Paper>
                    </div>

                    <div className="col-md-4">

                        <div className="row">

                            <div className="col-md-12">
                                <Paper >
                                    <div className="card-body">
                                        <div className="stat-widget-one">
                                            <div className="stat-icon dib"><i className="fas fa-dollar-sign text-success border-success"></i></div>
                                            <div className="stat-content dib">
                                                <div className="stat-text">Total Profit</div>
                                                <div className="stat-digit">1,012</div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                            <div className="col-md-12 mt-4">
                                <Paper >
                                    <div className="card-body">
                                        <div className="stat-widget-one">
                                            <div className="stat-icon dib"><i className="fas fa-user text-primary border-primary"></i></div>
                                            <div className="stat-content dib">
                                                <div className="stat-text">New Customer</div>
                                                <div className="stat-digit">961</div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                            <div className="col-md-12 mt-4">
                                <Paper>
                                    <div className="card-body">
                                        <div className="stat-widget-one">
                                            <div className="stat-icon dib"><i className="far fa-th-large text-warning border-warning"></i></div>
                                            <div className="stat-content dib">
                                                <div className="stat-text">Active Projects</div>
                                                <div className="stat-digit">770</div>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </div>

                        </div>
                    </div>
                </div>

            </React.Fragment >
        );
        return (
            <ContentHolder mainContent={mainContent} />
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);

