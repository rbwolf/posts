import React from 'react'
import { 
  Grid, TextField, Button,
  List, ListItem, ListItemText
} from '@material-ui/core'

const CommentsSection = ({comments, commentForm, setCommentForm, onClickSubmitComment}) => {

  const form = 
    <>
      <TextField
        onChange={(e) => { setCommentForm({...commentForm, author: e.target.value})}}
        placeholder='Name'
        variant='outlined'
        value={commentForm.author}
        fullWidth
      />
      <TextField
        onChange={(e) => { setCommentForm({...commentForm, body: e.target.value})}}
        placeholder='Leave a comment...'
        variant='outlined'
        multiline={true}
        rows={4}
        rowsMax={4}
        fullWidth
        value={commentForm.body}
        style={{paddingTop: '1em'}}
      />
      <Grid container justify='flex-end' style={{paddingTop: '1em'}}>
        <Button color='primary' style={{marginLeft: '1em'}} variant='contained' onClick={onClickSubmitComment}>Submit</Button>  
      </Grid>
    </>

  const commentsList = comments &&  
    <List>
      {comments.length ? 
          comments.map((comment) => 
            <ListItem key={comment.id} divider>
              <ListItemText primary={comment.author} secondary={comment.body} />
            </ListItem>)
      : null}
    </List>

  return (
    <>
      <Grid container>
        {form}
      </Grid>
      {commentsList}
    </>
  )
}

export default CommentsSection
