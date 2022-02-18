import * as React from 'react';
import {useState} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function NavBar() {
  const [auth, setAuth] = useState(true);
  const [rightAnchor, setRightAnchor] = useState(null);
  const [leftAnchor, setLeftAnchor] = useState(false)

  function handleRightMenu(e) {
      setRightAnchor(e.currentTarget)
  }

  function handleRightClose(){
      setRightAnchor(null)
  }

  function handleLeftMenu(e) {
    setLeftAnchor(e.currentTarget)
}

function handleLeftClose(){
    setLeftAnchor(null)
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleLeftMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
                id="menu-appbar"
                anchorEl={leftAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(leftAnchor)}
                onClose={handleLeftClose}
              >
                <MenuItem onClick={handleLeftClose}>Play Now</MenuItem>
                <MenuItem onClick={handleLeftClose}>About</MenuItem>
              </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
            Letters & Numbers
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleRightMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={rightAnchor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(rightAnchor)}
                onClose={handleRightClose}
              >
                <MenuItem onClick={handleRightClose}>Register</MenuItem>
                <MenuItem onClick={handleRightClose}>Log In</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar