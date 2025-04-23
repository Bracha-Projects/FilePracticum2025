import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import { 
  CloudUpload, 
  LocalOffer, 
  Search, 
  FolderSpecial, 
  Security, 
  BarChart 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
const Index = () => {
  const theme = useTheme();

  // Hero section background with gradient
  const heroBg = {
    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(10, 4),
    position: 'relative',
    overflow: 'hidden',
    marginBottom: theme.spacing(10),
  };

  // Glass-like card styling
  const glassCard = {
    background: alpha(theme.palette.background.paper, 0.7),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    boxShadow: `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(4),
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.15)}`,
    }
  };

  // Feature card styling
  const featureIconBox = {
    background: alpha(theme.palette.primary.main, 0.15),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: 'inline-flex',
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.main
  };

  // Abstract shapes for decoration
  const abstractShape1 = {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '250px',
    height: '250px',
    borderRadius: '50%',
    background: alpha(theme.palette.primary.main, 0.1),
    filter: 'blur(70px)',
    animation: 'pulse 10s infinite ease-in-out'
  };

  const abstractShape2 = {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: alpha(theme.palette.secondary.main, 0.1),
    filter: 'blur(70px)',
    animation: 'pulse 14s infinite ease-in-out',
    animationDelay: '2s'
  };

  const testimonialCard = {
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    boxShadow: theme.shadows[1],
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  // Testimonial data
  const testimonials = [
    {
      name: "Jennifer Miller",
      role: "Marketing Director, TechCorp",
      avatar: "JM",
      content: "Tag-it has revolutionized how we organize our marketing assets. The AI tagging is incredibly accurate and has saved our team countless hours of manual organization."
    },
    {
      name: "Robert Smith",
      role: "CFO, Global Finance Inc.",
      content: "As a financial services company, we deal with thousands of documents. Tag-it's automatic categorization has improved our workflow efficiency by over 40%."
    },
    {
      name: "Anna Peterson",
      role: "Legal Counsel, LawPro Services",
      avatar: "AP",
      content: "The search functionality in Tag-it is exceptional. We can find specific clauses in contracts instantly, which has been a game-changer for our legal team."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Box sx={heroBg}>
            <Box sx={abstractShape1} />
            <Box sx={abstractShape2} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
<Avatar
          alt="Tagit Logo"
          src="../../public/logo.png"
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />              </Box>
              
              <Typography 
                variant="h2" 
                component="h1" 
                align="center"
                sx={{ 
                  fontWeight: 'bold', 
                  color: theme.palette.secondary.dark,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2
                }}
              >
                Intelligent File Management with{' '}
                <Typography 
                  component="span" 
                  variant="inherit" 
                  sx={{ 
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  AI-Powered Tagging
                </Typography>
              </Typography>
              
              <Typography 
                variant="h5" 
                align="center" 
                color="secondary.main" 
                sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
              >
                Transform your document organization with automatic content recognition and smart tagging
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  gap: 2, 
                  justifyContent: 'center' 
                }}
              >
                <Button 
                  component={Link} 
                  to="/register" 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    px: 4,
                    fontSize: '1rem'
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  component={Link} 
                  to="/about" 
                  variant="outlined" 
                  color="secondary" 
                  size="large"
                  sx={{ 
                    py: 1.5, 
                    px: 4,
                    fontSize: '1rem' 
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" color="secondary.dark" sx={{ fontWeight: 'bold', mb: 3 }}>
              Revolutionize Your File Management
            </Typography>
            <Typography variant="h6" color="secondary.main" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Tag-it uses advanced AI to automatically analyze and organize your files, saving you time and increasing productivity.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              {
                icon: <CloudUpload fontSize="large" />,
                title: "Automatic File Upload",
                description: "Easily upload files of any type including PDFs, images, and documents to our secure platform with our intuitive drag-and-drop interface."
              },
              {
                icon: <LocalOffer fontSize="large" />,
                title: "AI-Powered Tagging",
                description: "Our smart system uses NLP to analyze content and automatically assign relevant tags, categorizing files without manual effort."
              },
              {
                icon: <Search fontSize="large" />,
                title: "Advanced Search",
                description: "Find any file instantly with our powerful search capabilities that look through tags, content, and metadata across your entire library."
              },
              {
                icon: <FolderSpecial fontSize="large" />,
                title: "Smart Organization",
                description: "Automatically organize files into logical folders based on content type, creating a structured system without manual sorting."
              },
              {
                icon: <Security fontSize="large" />,
                title: "Secure Storage",
                description: "Your documents are protected with enterprise-grade encryption and security measures ensuring your sensitive information stays private."
              },
              {
                icon: <BarChart fontSize="large" />,
                title: "Insightful Analytics",
                description: "Gain valuable insights into your file usage, popular tags, and content trends with comprehensive analytics dashboards."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Paper elevation={0} sx={glassCard}>
                  <Box sx={featureIconBox}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.dark' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="secondary.main">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{
              ...glassCard,
              textAlign: 'center',
              py: 8,
              px: 6
            }}
          >
            <Typography variant="h3" component="h2" color="secondary.dark" sx={{ fontWeight: 'bold', mb: 3 }}>
              Ready to transform your file management?
            </Typography>
            <Typography variant="h6" color="secondary.main" sx={{ mb: 6 }}>
              Join organizations that are saving hours every week with Tag-it's intelligent file system.
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2, 
                justifyContent: 'center' 
              }}
            >
              <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ py: 1.5, px: 4 }}
              >
                Start for Free
              </Button>
              <Button 
                component={Link} 
                to="/about" 
                variant="outlined" 
                color="secondary" 
                size="large"
                sx={{ py: 1.5, px: 4 }}
              >
                Learn More
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
      
      {/* Testimonials Section */}
      <Box sx={{ py: 12, bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" component="h2" color="secondary.dark" sx={{ fontWeight: 'bold', mb: 3 }}>
              Trusted by Business Leaders
            </Typography>
            <Typography variant="h6" color="secondary.main" sx={{ maxWidth: '700px', mx: 'auto' }}>
              See how Tag-it is transforming document management for organizations around the world.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={testimonialCard}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2), color: theme.palette.secondary.main }}>
                        {testimonial.avatar || testimonial.name.charAt(0)}
                      </Avatar>
                    }
                    title={testimonial.name}
                    subheader={testimonial.role}
                    titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold', color: 'secondary.dark' }}
                    subheaderTypographyProps={{ variant: 'body2', color: 'secondary.main' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" color="secondary.main">
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      </>  
  );
};

export default Index;