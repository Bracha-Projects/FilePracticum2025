import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Container,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import { Menu, Close, Person } from '@mui/icons-material';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // This is just for demo purposes - in a real app, you'd check auth state
    const checkPath = location.pathname;
    setIsLoggedIn(checkPath.includes('/dashboard') || checkPath.includes('/files') || checkPath.includes('/upload') || checkPath.includes('/profile'));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = isLoggedIn 
    ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Files', path: '/files' },
      { name: 'Upload', path: '/upload' },
    ]
    : [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ];

const isActive = (path: string): boolean => {
    return location.pathname === path;
};

  const navbarSx = {
    bgcolor: isScrolled ? alpha(theme.palette.background.paper, 0.8) : 'transparent',
    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
    boxShadow: isScrolled ? 1 : 0,
    transition: 'all 0.3s ease',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
  };

  return (
    <AppBar position="fixed" elevation={0} sx={navbarSx}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64, justifyContent: 'space-between' }}>
          <Logo />
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            gap: 3 
          }}>
            {navLinks.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                color="secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: isActive(link.path) ? theme.palette.primary.main : theme.palette.secondary.dark,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent'
                  }
                }}
              >
                {link.name}
              </Button>
            ))}
            
            {isLoggedIn ? (
              <IconButton
                component={Link}
                to="/profile"
                size="small"
                sx={{
                  ml: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.secondary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <Person />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.secondary.dark,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark
                    }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
          
          {/* Mobile Menu Button */}
          <IconButton
            color="secondary"
            aria-label="toggle menu"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </IconButton>
        </Toolbar>
      </Container>
      
      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            bgcolor: theme.palette.background.paper,
            pt: 8
          }
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem 
              key={link.path}
              component={Link}
              to={link.path}
              onClick={toggleMobileMenu}
              sx={{
                py: 2,
                borderBottom: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                color: isActive(link.path) ? theme.palette.primary.main : theme.palette.secondary.dark,
              }}
            >
              <ListItemText 
                primary={link.name} 
                primaryTypographyProps={{
                  fontWeight: 500
                }}
              />
            </ListItem>
          ))}
          
          {isLoggedIn ? (
            <ListItem 
              component={Link}
              to="/profile"
              onClick={toggleMobileMenu}
              sx={{
                py: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                color: theme.palette.secondary.dark
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                  color: theme.palette.secondary.main,
                  width: 32,
                  height: 32
                }}
              >
                <Person fontSize="small" />
              </Avatar>
              <ListItemText primary="My Profile" />
            </ListItem>
          ) : (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={toggleMobileMenu}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.secondary.dark
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={toggleMobileMenu}
              >
                Register
              </Button>
            </Box>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;