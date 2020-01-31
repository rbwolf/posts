import React, { useState } from 'react'
import PostListItem from '../components/PostListItem.jsx'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Fab, CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import NewPost from '../components/NewPostModal.jsx'
import { GET_POSTS, ADD_POST } from '../util/Queries.js'
import { useHistory } from 'react-router-dom'
import BasicSnackbar from '../components/BasicSnackbar.jsx'

const PostsView = () => {

  const history = useHistory()

  const [newPostModalOpen, setNewPostModalOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { loading, error, data } = useQuery(GET_POSTS)
  const [submitPost] = useMutation(ADD_POST,
    {
      update: (cache, {data: {createPost}}) => {
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: [...cache.readQuery({ query: GET_POSTS }).posts, createPost] }
        })
      }
    }
  )

  const addPost = ({title, author, body}) => {
    submitPost({variables: { title, author, body }})
    setNewPostModalOpen(false)
    setSnackbarOpen(true)
  }

  const showPostDetails = (post) => {
    history.push(`/post/${post.id}`)
  }

  const posts = 
    loading ? 
      <CircularProgress style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', padding: '1em'}}/> : 
    error ? 
      <p style={{textAlign: 'center'}}>The server did not respond... :(</p> : 
    !data.posts.length ?
      <p style={{textAlign: 'center'}}>Be the first one to write something!</p>
    :
      data.posts.map((post, index) => <PostListItem key={index} post={post} onClick={showPostDetails} index={index}/>)

  return (
    <>
      {posts}
      <NewPost 
        modalOpen={newPostModalOpen}
        onClose={() => setNewPostModalOpen(false)}
        onSubmit={addPost}
      />
      <Fab 
        style={{margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed'}} 
        color='primary'
        onClick={() => setNewPostModalOpen(!newPostModalOpen)}
      >
        <AddIcon />
      </Fab>
      <BasicSnackbar 
        snackbarOpen={snackbarOpen} 
        handleClose={() => setSnackbarOpen(false)} 
        message={'Post submitted!'}
      />
    </>
  )
}

export default PostsView
