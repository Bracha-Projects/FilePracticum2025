import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { 
  AutoAwesome, 
  Search, 
  Label 
} from '@mui/icons-material';

const FeaturesSection = () => {
  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Auto-Tagging',
      description: 'Our cutting-edge AI automatically analyzes your files and suggests relevant tags, making file organization effortless.'
    },
    {
      icon: <Search sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced Search',
      description: 'Quickly find any file using our powerful search that looks through tags, content, and metadata across your entire document library.'
    },
    {
      icon: <Label sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Custom Tagging',
      description: 'Create your own taxonomy with custom tags, or let our system learn your preferences over time for personalized organization.'
    }
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 6, md: 10 },
        backgroundColor: 'grey.100'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              color: 'secondary.dark',
              mb: 2
            }}
          >
            Powerful Features
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: '700px',
              mx: 'auto',
              color: 'secondary.main'
            }}
          >
            Organize your files with intelligence. Tag-it helps you find what you need, when you need it.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderRadius: 4,
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  component="h3"
                  sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    color: 'secondary.dark' 
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'secondary.main' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;