import React from 'react';
import { Box, Typography, Avatar, Grid, Container, Paper } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Tag-it revolutionized how our team manages documents. What used to take hours now takes minutes with the AI tagging system.",
      name: "Sarah Johnson",
      position: "Operations Director, TechCore Inc.",
      avatar: "/avatars/avatar1.jpg"
    },
    {
      text: "The search functionality is a game-changer. I can find contracts from years ago in seconds by simply searching for relevant terms.",
      name: "Michael Chen",
      position: "Legal Counsel, Global Solutions",
      avatar: "/avatars/avatar2.jpg"
    },
    {
      text: "As a creative agency, we deal with thousands of files. Tag-it's organization system has made our workflow so much more efficient.",
      name: "Jessica Miller",
      position: "Creative Director, Design Studio",
      avatar: "/avatars/avatar3.jpg"
    }
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
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
            What Our Customers Say
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: '700px',
              mx: 'auto',
              color: 'secondary.main'
            }}
          >
            Discover how Tag-it helps businesses around the world organize their digital assets.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    bgcolor: 'primary.main'
                  }
                }}
              >
                <FormatQuote 
                  sx={{ 
                    fontSize: 40, 
                    color: 'primary.light',
                    mb: 2
                  }} 
                />
                <Typography 
                  sx={{ 
                    flex: 1,
                    mb: 3,
                    fontStyle: 'italic',
                    color: 'secondary.main'
                  }}
                >
                  "{testimonial.text}"
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src={testimonial.avatar} 
                    sx={{ 
                      width: 50, 
                      height: 50,
                      mr: 2 
                    }}
                  />
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'secondary.dark' 
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography 
                      variant="caption"
                      sx={{ 
                        color: 'secondary.main' 
                      }}
                    >
                      {testimonial.position}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;