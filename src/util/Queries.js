import { gql } from 'apollo-boost'

export const GET_POSTS = gql`
{ 
  posts { 
    id 
    title 
    author 
    body 
    commentCount 
  } 
}`

export const GET_POST = gql`
query getPost($id:String!) {
  post(id:$id) {
    title
    author
    body
    commentCount
    comments {
      id
      author
      body
    }
  }
}`

export const ADD_POST = gql`
mutation CreatePost($title: String!, $author: String!, $body: String!) {
  createPost(title: $title, author: $author, body: $body) {
    id title author body commentCount
  }
}` 

export const ADD_COMMENT = gql`
mutation AddComment($postId:String!, $author: String, $body:String!) {
  addComment(postId:$postId, author:$author, body:$body) {
    id
    author
    body
  }
}`
