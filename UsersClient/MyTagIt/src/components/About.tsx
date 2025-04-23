// import React from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   styled,
// } from '@mui/material';
// import StorageIcon from '@mui/icons-material/Storage';
// import TagIcon from '@mui/icons-material/Tag';
// import SearchIcon from '@mui/icons-material/Search';
// import EditIcon from '@mui/icons-material/Edit';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import Footer from './Footer';

// // Styled component for the main container
// const MainContainer = styled(Box)({
//   display: 'flex',
//   flexDirection: 'column',
//   overflowX: 'hidden',
// });

// // Styled component for cards container
// const CardsContainer = styled(Grid)({
//   display: 'flex',
// });

// // Styled component for card item
// const CardItem = styled(Grid)({
//   display: 'flex',
// });

// // Styled component for card with equal height
// const EqualHeightCard = styled(Card)({
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100%',
// });

// const FileManagementAbout = () => {
//   return (
//     <MainContainer>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//           <Avatar alt="Your Logo" src="../../public/logo.png" sx={{ width: 60, height: 60, mr: 2 }} />
//           <Typography variant="h4" component="h1" gutterBottom>
//             File Tagging System
//           </Typography>
//         </Box>

//         <Typography variant="body1" paragraph>
//           The complete platform to efficiently manage your files with smart, AI-powered tagging.
//         </Typography>

//         <CardsContainer container spacing={3}>
//           <CardItem item xs={12} md={6}>
//             <EqualHeightCard>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Our Mission
//                 </Typography>
//                 <Typography variant="body2">
//                   We are dedicated to providing a seamless and intelligent file management system that empowers businesses to organize and access their documents effortlessly.
//                 </Typography>
//               </CardContent>
//             </EqualHeightCard>
//           </CardItem>
//           <CardItem item xs={12} md={6}>
//             <EqualHeightCard>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   Target Audience
//                 </Typography>
//                 <Typography variant="body2">
//                   Businesses, large corporations, and offices seeking efficient document management solutions.
//                 </Typography>
//               </CardContent>
//             </EqualHeightCard>
//           </CardItem>
//         </CardsContainer>

//         <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
//           Key Features
//         </Typography>

//         <List>
//           <ListItem>
//             <ListItemIcon>
//               <UploadFileIcon />
//             </ListItemIcon>
//             <ListItemText primary="Automatic File Upload: Upload PDFs, images, and documents." />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <TagIcon />
//             </ListItemIcon>
//             <ListItemText primary="Automatic Tagging: AI-powered NLP for smart content tagging." />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <SearchIcon />
//             </ListItemIcon>
//             <ListItemText primary="Advanced Search: Search within files using tags, keywords, or dates." />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <EditIcon />
//             </ListItemIcon>
//             <ListItemText primary="Manual Tagging: Edit or add tags manually for precise organization." />
//           </ListItem>
//         </List>

//         <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
//           Technology Stack
//         </Typography>

//         <List>
//           <ListItem>
//             <ListItemIcon>
//               <StorageIcon />
//             </ListItemIcon>
//             <ListItemText primary="Backend: ASP.NET Core API" />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <StorageIcon />
//             </ListItemIcon>
//             <ListItemText primary="Frontend: React with Material-UI" />
//           </ListItem>
//           <ListItem>
//             <ListItemIcon>
//               <StorageIcon />
//             </ListItemIcon>
//             <ListItemText primary="AI: Natural Language Processing (NLP)" />
//           </ListItem>
//         </List>
//       </Container>
//       <Footer />
//     </MainContainer>
//   );
// };

// export default FileManagementAbout;
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  CloudUpload, 
  LocalOffer, 
  Search, 
  Edit, 
  Security, 
  Speed, 
  School, 
  BusinessCenter, 
  CheckCircle
} from '@mui/icons-material';
// import LayoutWrapper from '@/components/LayoutWrapper';
// import PageHeading from '@/components/PageHeading';

const AboutPage = () => {
  const theme = useTheme();

  const featureIconSx = {
    color: theme.palette.secondary.main,
    bgcolor: alpha(theme.palette.primary.main, 0.15),
    p: 1,
    borderRadius: 1
  };

  const features = [
    {
      icon: <CloudUpload />,
      title: "Automatic File Upload",
      description: "Upload files (PDF, images, documents) to our secure cloud platform."
    },
    {
      icon: <LocalOffer />,
      title: "Smart AI Tagging",
      description: "Our advanced NLP system reads content and applies appropriate tags automatically."
    },
    {
      icon: <Search />,
      title: "Advanced Search",
      description: "Intelligent search within files based on tags, keywords, or dates."
    },
    {
      icon: <Edit />,
      title: "Manual Tag Editing",
      description: "Easily add or edit tags suggested by the system to refine organization."
    }
  ];

  const benefits = [
    {
      icon: <Speed />,
      title: "Save Time",
      description: "Reduce document processing time by up to 80% with automatic tagging."
    },
    {
      icon: <Security />,
      title: "Enhanced Security",
      description: "Enterprise-grade security protects all your sensitive documents."
    },
    {
      icon: <School />,
      title: "AI Learning",
      description: "The system learns from your manual edits, improving over time."
    }
  ];

  const sectionSx = {
    py: 8,
    '&:nth-of-type(even)': {
      bgcolor: alpha(theme.palette.primary.main, 0.05)
    }
  };

  const paperSx = {
    p: 4,
    height: '100%',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  };

  return (
    <>
    {/* <LayoutWrapper> */}
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: 12, 
          pb: 8, 
          bgcolor: alpha(theme.palette.secondary.main, 0.05),
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* <PageHeading 
                title="About Tag-it"
                subtitle="Next-generation file management with AI-powered tagging"
              /> */}
              
              <Typography variant="body1" color="secondary.main" paragraph sx={{ mb: 4 }}>
                Tag-it is an intelligent file management system designed for businesses and large organizations 
                that need to organize and retrieve documents efficiently. Our innovative platform leverages 
                artificial intelligence to automatically analyze document content and apply relevant tags, 
                creating a smart, searchable archive of your important files.
              </Typography>
              
              <List>
                {['Businesses', 'Law Firms', 'Financial Institutions', 'Marketing Agencies'].map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <BusinessCenter sx={{ color: theme.palette.secondary.main }} />
                    </ListItemIcon>
                    <ListItemText primary={item} primaryTypographyProps={{ color: 'secondary.main' }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="../public/logo.png" 
                alt="File organization with AI"
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: theme.shape.borderRadius * 2,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.secondary.main, 0.15)}`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ textAlign: 'center', mb: 6, color: 'secondary.dark', fontWeight: 'bold' }}>
            Key Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={paperSx}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={featureIconSx}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'secondary.dark' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="secondary.main">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* How It Works */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ textAlign: 'center', mb: 2, color: 'secondary.dark', fontWeight: 'bold' }}>
            How It Works
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'secondary.main', maxWidth: 700, mx: 'auto' }}>
            Our intelligent system simplifies document management in just a few steps
          </Typography>
          
          <Grid container spacing={4}>
            {[
              {
                number: "01",
                title: "Upload Your Files",
                description: "Simply drag and drop your files into our secure platform. We support all major document formats."
              },
              {
                number: "02",
                title: "AI Analysis",
                description: "Our advanced AI reads and analyzes the content of your documents, understanding context and meaning."
              },
              {
                number: "03",
                title: "Automatic Tagging",
                description: "Based on content analysis, the system applies relevant tags to categorize your documents."
              },
              {
                number: "04",
                title: "Search & Retrieve",
                description: "Use our powerful search to instantly find any document, filtering by tags, content, or metadata."
              }
            ].map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    ...paperSx,
                    position: 'relative',
                    pt: 6,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography
                    sx={{
                      position: 'absolute',
                      top: -10,
                      left: 20,
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: alpha(theme.palette.primary.main, 0.7),
                      lineHeight: 1
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'secondary.dark' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="secondary.main">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Benefits */}
      <Box sx={sectionSx}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Typography variant="h3" component="h2" sx={{ mb: 3, color: 'secondary.dark', fontWeight: 'bold' }}>
                Benefits For Your Business
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, color: 'secondary.main' }}>
                Tag-it transforms how organizations manage their documents, bringing efficiency, 
                accuracy, and intelligence to file management. Our solution helps businesses of 
                all sizes streamline operations and improve productivity.
              </Typography>
              
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 2 }}>
                    <ListItemIcon sx={{ mt: 0 }}>
                      <Box sx={featureIconSx}>
                        {benefit.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit.title}
                      secondary={benefit.description}
                      primaryTypographyProps={{ fontWeight: 'bold', color: 'secondary.dark', gutterBottom: true }}
                      secondaryTypographyProps={{ color: 'secondary.main' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Paper
                sx={{
                  ...paperSx,
                  p: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }}
              >
                <Typography variant="h4" component="h3" sx={{ mb: 3, color: 'secondary.dark', fontWeight: 'bold' }}>
                  Why Businesses Choose Tag-it
                </Typography>
                
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  {[
                    "Reduce time spent on manual document organization by 85%",
                    "Find any document in seconds rather than minutes or hours",
                    "Ensure compliance with automatic record keeping",
                    "Seamless integration with existing workflows",
                    "Scalable solution that grows with your business",
                    "Enterprise-grade security for your sensitive documents"
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <CheckCircle sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body1" color="secondary.main">
                          {item}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    {/* </LayoutWrapper> */}
    </>
  );
};

export default AboutPage;