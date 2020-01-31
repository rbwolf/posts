import React, { useState } from 'react'
import { 
  Dialog, DialogTitle, DialogContent, 
  TextField, Grid, Button
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/styles'

const NewPostModal = ({modalOpen, onClose, onSubmit}) => {

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [state, setState] = useState({
    title: '',
    author: '',
    body: '',
  })

  return (
    <Dialog onClose={onClose} open={modalOpen} fullScreen={fullScreen}>
      <DialogTitle id="simple-dialog-title">Create new post</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setState({...state, title: e.target.value})}
              placeholder='Title'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{paddingTop: '1em'}}>
            <TextField
              onChange={(e) => setState({...state, author: e.target.value})}
              placeholder='Author'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} style={{paddingTop: '1em'}}>
            <TextField
              onChange={(e) => setState({...state, body: e.target.value})}
              placeholder='Write something incredible...'
              variant='outlined'
              multiline={true}
              rows={8}
              rowsMax={8}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container justify='flex-end' style={{paddingBottom: '1em'}}>
          <Grid item style={{paddingTop: '1em'}}>
            <Button color='primary' onClick={onClose}>Cancel</Button>  
            <Button color='primary' onClick={() => onSubmit(state)} style={{marginLeft: '1em'}} variant='contained'>Submit</Button>  
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default NewPostModal
