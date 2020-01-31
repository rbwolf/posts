import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const BasicSnackbar = ({snackbarOpen, handleClose, message}) => {
    return (
        <Snackbar 
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            autoHideDuration={4000}
            open={snackbarOpen}
            onClose={handleClose}
            message={message}
            action={
            <>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
                </IconButton>
            </>
            }
        /> 
    )
}

export default BasicSnackbar