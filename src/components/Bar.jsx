import React, { useState } from 'react';
import { Container, AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '../components/Menu.jsx'

const Bar = () => {

  const [menuOpen, setMenuOpen] = useState(true)

  const onClose = () => setMenuOpen(false)
  const onMenuIconClick = () => setMenuOpen(true)

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Container maxWidth='md'>
            <IconButton onClick={onMenuIconClick}>
              <MenuIcon style={{color: 'white'}}/>
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Menu open={menuOpen} onClose={onClose}/>
    </>
  )
}

export default Bar
