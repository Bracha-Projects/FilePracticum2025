import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  styled,
  Avatar,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: '#4B6982',
  color: 'white',
  padding: theme.spacing(4),
  width: '100%',
}));

const FooterLink = styled(Link)({
  color: 'white',
  display: 'block',
  marginBottom: '8px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FooterIcon = styled(IconButton)({
  color: 'white',
  '&:hover': {
    color: '#A5D6A7',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-start' },
            gap: { xs: 4, md: 0 },
          }}
        >
          {/* <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}> */}
            <Avatar
              alt="Tagit Logo"
              src="../../public/logo.png"
              sx={{ width: 60, height: 60, marginRight: 2 }}
            />
            {/* <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
              Tagit
            </Typography> */}
          {/* </Box> */}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
              About Tagit
            </Typography>
            <Typography variant="body2">
              Tagit is a smart file management system that uses AI to automatically tag your documents, making them easy to find and organize. We empower businesses to streamline their document workflow.
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
              Useful Links
            </Typography>
            <Box>
              <FooterLink href="#">
                Home
              </FooterLink>
              <FooterLink href="#">
                Features
              </FooterLink>
              <FooterLink href="#">
                Support
              </FooterLink>
              <FooterLink href="#">
                Contact
              </FooterLink>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Roboto Slab, serif' }}>
              Follow Us
            </Typography>
            <Box>
              <FooterIcon aria-label="facebook">
                <FacebookIcon />
              </FooterIcon>
              <FooterIcon aria-label="twitter">
                <TwitterIcon />
              </FooterIcon>
              <FooterIcon aria-label="instagram">
                <InstagramIcon />
              </FooterIcon>
            </Box>
          </Box>
        </Box>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" sx={{ fontFamily: 'Roboto Slab, serif' }}>
            All rights reserved © {new Date().getFullYear()} - Tagit: Smart File Management.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;