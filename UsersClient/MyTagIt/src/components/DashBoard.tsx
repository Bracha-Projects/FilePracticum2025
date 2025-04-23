import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';

// Styled Components for Customization
const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const LogoImage = styled('img')({
  width: '150px', // Adjust as needed
  height: 'auto',
});

const FullPageDashboardContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#37474F', // Dark Slate Blue
  color: 'white',
  minHeight: '100vh', // Make it full height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: '100%', // Take full width
  height: '100%', // Ensure full height
  position: 'absolute', // Cover the entire viewport
  top: 0,
  left: 0,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2, 4),
  backgroundColor: '#A5D6A7', //Light Mint Green
  color: '#37474F',
  '&:hover': {
    backgroundColor: '#81C784',
  },
}));

const TagItDashboard = () => {
  return (
    <FullPageDashboardContainer disableGutters maxWidth={false}>
      <LogoContainer>
        <LogoImage src="../../public/logo.png" alt="Tag-it Logo" />
      </LogoContainer>

      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Tag-it
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        Tag-it is an AI-powered file tagging system designed to help businesses,
        large companies, and offices manage their files smartly and efficiently.
        Say goodbye to disorganized files and manual tagging!
      </Typography>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <ActionButton variant="contained">Login</ActionButton>
        </Grid>
        <Grid item>
          <ActionButton variant="contained">Sign Up</ActionButton>
        </Grid>
      </Grid>
    </FullPageDashboardContainer>
  );
};

export default TagItDashboard;