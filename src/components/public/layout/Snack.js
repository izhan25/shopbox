import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Snack = ({ openSnackBar, handleCloseSnackBar, msgSnackBar }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{msgSnackBar}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={handleCloseSnackBar}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}

export default Snack;
