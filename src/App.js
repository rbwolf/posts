import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { MuiThemeProvider, createMuiTheme, Container } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PostDetails from './views/PostDetails.jsx'
import PostsView from './views/Posts.jsx'
import Bar from './components/Bar.jsx'

const App = () => {
  const client = new ApolloClient({uri: 'http://localhost:4000'})
  const theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#177490',
        light: '#D1416C'
      }
    },
    props: {
      MuiPaper: {
        elevation: 3,
        square: false
      }
    }
  })
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Bar />

        <Router>
          <Container maxWidth='sm' style={{padding: '1em'}}>
            <Switch>
              <Route path='/posts'>
                <PostsView />
              </Route>
              <Route path='/post/:postId'>
                <PostDetails />
              </Route>
            </Switch>
          </Container>
        </Router>

      </ApolloProvider>
    </MuiThemeProvider>
  )
}

export default App;
