import React, { Component } from 'react';
import ContentHolder from './layout/ContentHolder';
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        // color: 'white',
        height: 200,
        // backgroundColor: '#CED1D9'
    }
})

class Dashboard extends Component {

    render() {
        const { classes } = this.props;

        const mainContent = (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.paper} >This is Column 1</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.paper} >This is Column 2</Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper className={classes.paper} >This is Column 3</Paper>
                </Grid>
            </Grid >
        );
        return (
            <ContentHolder mainContent={mainContent} />
        );
    }
}

export default withStyles(styles, { withTheme: true })(Dashboard);

