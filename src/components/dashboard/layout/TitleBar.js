import React from 'react';
import { Grid } from '@material-ui/core';

export default function TitleBar({ titleName, actions }) {
    return (
        <Grid container className="mb-3 mt-2">
            <Grid container>
                <Grid item>
                    <h2 className="mr-3"> {titleName} </h2>
                </Grid>
                {actions}
            </Grid>
        </Grid>
    )
}

// const actionsForTitleBar = (
//     <Grid item>
//         <Link to="/dashboard/product/add" className="btn btn-secondary btn-sm" style={{ marginTop: '7px', borderRadius: '5px' }}>
//             <i className="fas fa-plus-circle"></i> ADD NEW
//         </Link>
//     </Grid>
// );
