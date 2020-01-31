import React from 'react'
import { Paper, Grid, Grow } from '@material-ui/core'

const PostListItem = ({post, onClick, index}) => {
  return (
    <Grow in={true}>
      <Paper 
        onClick={() => onClick(post)} 
        key={post.id} 
        style={{padding: '1em', marginTop: '1em'}}
      >
          <h1>{post.title}</h1>
          <Grid container alignContent='space-between' justify='flex-end'>
            <Grid item xs={6}>
              <p>By {post.author}</p>
            </Grid>
            <Grid container item xs={6} justify='flex-end'>
              <p><small>{post.commentCount} comments</small></p>
            </Grid>
          </Grid>
      </Paper>
    </Grow>
  )
}

export default PostListItem
