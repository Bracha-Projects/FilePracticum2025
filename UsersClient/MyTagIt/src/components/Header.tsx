import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, styled } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TagIcon from '@mui/icons-material/Tag';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#4B6982',
  color: 'white',
  padding: theme.spacing(1),
  width: '100%',
}));

const Header = ({ isLoggedIn = false }) => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Avatar
          alt="Tagit Logo"
          src="../../public/logo.png"
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto Slab, serif' }}>
          Tagit
        </Typography> */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" startIcon={<UploadFileIcon />}>Upload Files</Button>
          <Button color="inherit" startIcon={<TagIcon />}>Automatic Tagging</Button>
          <Button color="inherit" startIcon={<SearchIcon />}>Advanced Search</Button>
          <Button color="inherit" startIcon={<EditIcon />}>Edit Tags</Button>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
              <Button color="inherit" startIcon={<ExitToAppIcon />}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;