import React from 'react';
import { Grid } from '@material-ui/core';

export default function TitleBar({ titleName, actions }) {
    return (
        <Grid container>
            <Grid container>
                <Grid item>
                    <h2 className="mr-3"> {titleName} </h2>
                </Grid>
                {actions}
            </Grid>
        </Grid>
    )
}
