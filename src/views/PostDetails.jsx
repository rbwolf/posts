import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { GET_POST, ADD_COMMENT, GET_POSTS } from '../util/Queries.js'
import { useQuery, useMutation } from '@apollo/react-hooks'
import CommentsSection from '../components/CommentsSection.jsx'
import BasicSnackbar from '../components/BasicSnackbar.jsx'
import { 
  Grid, Paper,
  CircularProgress, Fade, Slide
} from '@material-ui/core'

const PostDetails = () => {

  const [commentForm, setCommentForm] = useState({author: '', body: ''})
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { postId } = useParams()
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId }
  })
  const [submitComment] = useMutation(ADD_COMMENT,
    {
      update: (cache, { data: { addComment } }) => {
        let { posts } = cache.readQuery({query: GET_POSTS})
        let { post } = cache.readQuery({query: GET_POST, variables: { id: postId }})
        cache.writeQuery({
          query: GET_POST,
          variables: { id: postId },
          data: {post: {...post, comments: [...post.comments, addComment]}}
        })
        cache.writeQuery({
          query: GET_POSTS,
          data: {posts: [...posts, {...post, commentCount: post.commentCount + 1}]}
        })
      }
    }
  )

  const onClickSubmitComment = () => {
    let { author, body } = commentForm
    submitComment({
      variables: { postId, author, body }
    })
    setCommentForm({author: '', body: ''})
    setSnackbarOpen(true)
  }

  const {title, author, body, comments } = data ? data.post : {} 

  const transitionTime = 300

  const postDetails = 
    loading ?
      <CircularProgress style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '1em'}}/> :
    error ? 
      <p style={{textAlign: 'center'}}>The server did not respond... :(</p> 
    :
      <Fade in={true} timeout={transitionTime}>
        <Paper
          style={{padding: '1em', marginTop: '1em'}}
        >
          <h1 style={{marginBottom: '0px'}}>{title}</h1>
          <p>By {author}</p>
          <Grid item xs={12}>
            <p>{body}</p>
          </Grid>
        </Paper>
      </Fade>

  return (
    <>
      {postDetails}
      <Slide direction='up' in={true} timeout={transitionTime}>
        <Paper style={{padding: '1em', marginTop: '1em'}}>
          <CommentsSection 
            comments={comments} 
            commentForm={commentForm}
            setCommentForm={setCommentForm}
            onClickSubmitComment={onClickSubmitComment}
          />
        </Paper>
      </Slide>
      <BasicSnackbar 
        snackbarOpen={snackbarOpen} 
        handleClose={() => setSnackbarOpen(false)} 
        message={'Comment submitted!'}
      />
    </>
  )
}

export default PostDetails
