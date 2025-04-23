// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Container,
//   Box,
//   styled,
//   IconButton,
//   InputAdornment,
//   Alert,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import { Theme } from '@mui/material/styles';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// // Styled Components for Maximum Compactness
// const FullPageContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
//   backgroundColor: '#4B6982',
//   color: 'white',
//   minHeight: '100vh',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: theme.spacing(3),
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   backgroundImage: `
//     radial-gradient(circle,#4B6982, #4B6982),
//     url("/path/to/your/subtle-background.png")
//   `,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     background: 'linear-gradient(to bottom, rgba(55, 71, 79, 0.8), rgba(55, 71, 79, 0.95))',
//     opacity: 0.8,
//   },
// }));

// const LoginBox = styled(Box)(({ theme }: { theme: Theme }) => ({
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   borderRadius: theme.spacing(1),
//   padding: theme.spacing(2),
//   maxWidth: '300px',
//   width: '100%',
//   position: 'relative',
//   boxShadow: theme.shadows[4],
// }));

// const LogoImage = styled('img')({
//   width: '100px',
//   height: 'auto',
//   marginBottom: '8px',
// });

// const LoginButton = styled(Button)(({ theme }: { theme: Theme }) => ({
//   marginTop: '8px',
//   marginBottom: '8px',
//   padding: '8px 16px',
//   backgroundColor: '#A5D6A7',
//   color: '#37474F',
//   fontFamily: 'Roboto Slab, serif',
//   fontWeight: 500,
//   fontSize: '0.8rem',
//   lineHeight: 1,
//   '&:hover': {
//     backgroundColor: '#81C784',
//     boxShadow: theme.shadows[2],
//     transform: 'translateY(-1px)',
//     transition: 'transform 0.2s, boxShadow 0.2s',
//   },
// }));

// const StyledTextField = styled(TextField)({
//   '& .MuiInputBase-root': {
//     height: '32px',
//   },
//   '& .MuiInputLabel-root': {
//     fontSize: '0.8rem',
//   },
// });

// // Define the validation schema using yup
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const LoginForm: React.FC = () => {
//   const apiUrl = 'https://localhost:7153/api/User/login';

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);

//   const onSubmit = async (data: any) => {
//     try {
//       const response = await axios.post(apiUrl, data);
//       console.log('API Response:', response.data);
//       // Handle successful login
//       setApiError(null);
//     } catch (error: any) {
//       console.error('API Error:', error);
//       // Handle login errors
//       if (error.response) {
//         if (typeof error.response.data === 'object' && error.response.data !== null) {
//           // Extract error message from API response object
//           setApiError(error.response.data.title || 'Login failed. Please try again.');
//         } else {
//           setApiError(error.response.data || 'Login failed. Please try again.');
//         }
//       } else if (error.request) {
//         setApiError('No response from server. Please try again later.');
//       } else {
//         setApiError('An unexpected error occurred. Please try again.');
//       }
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   return (
//     <FullPageContainer disableGutters maxWidth={false}>
//       <LoginBox>
//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           <LogoImage src="../../public/logo.png" alt="Tag-it Logo" />
//         </Box>
//         <Typography
//           component="h1"
//           variant="h6"
//           align="center"
//           sx={{
//             mb: 1,
//             color: '#37474F',
//             fontFamily: 'Roboto Slab, serif',
//             fontSize: '1.1rem',
//           }}
//         >
//           Login
//         </Typography>
//         {apiError && (
//           <Alert severity="error" sx={{ mb: 1 }}>
//             {apiError}
//           </Alert>
//         )}
//         <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
//           <Controller
//             name="email"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <StyledTextField
//                 margin="dense"
//                 fullWidth
//                 label="Email"
//                 {...field}
//                 error={!!errors.email}
//                 helperText={errors.email ? errors.email.message : ''}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//           />
//           <Controller
//             name="password"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <StyledTextField
//                 margin="dense"
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 {...field}
//                 error={!!errors.password}
//                 helperText={errors.password ? errors.password.message : ''}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             )}
//           />
//           <LoginButton type="submit" fullWidth variant="contained">
//             Login
//           </LoginButton>
//           <Typography
//             variant="caption"
//             align="center"
//             sx={{ color: '#37474F', fontFamily: 'Roboto Slab, serif' }}
//           >
//             No account? <Link href="/signup">Sign up</Link>
//           </Typography>
//         </Box>
//       </LoginBox>
//     </FullPageContainer>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Box, Link, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LayoutWrapper from '../components/LayoutWrapper';
import Logo from '../components/Logo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // מצב עבור הסנקבר (הודעה קצרה)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success'); // יכול להיות גם 'warning' או 'info'

  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showSnackbar("Please enter both email and password", 'error');
      return;
    }

    // Simulate login
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showSnackbar("Welcome back to Tag-it!", 'success');
      navigate('/dashboard');
    }, 1500);
  };

  // פונקציה להצגת הסנקבר
  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // פונקציה לסגירת הסנקבר
  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <LayoutWrapper>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(4),
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 'md' }}>
          <Box sx={{ textAlign: 'center', marginBottom: theme.spacing(8) }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: theme.spacing(6) }}>
              <Logo size="lg" />
            </Box>
            <Typography variant="h4" fontWeight="bold" color={theme.palette.tagit.blue} gutterBottom>
              Welcome back
            </Typography>
            <Typography color={theme.palette.primary.main} mt={2}>
              Sign in to your account to continue
            </Typography>
          </Box>

          <Box
            sx={{
              padding: theme.spacing(8),
              borderRadius: theme.shape.borderRadius.xl, // נניח שהגדרנו xl בנושא
              boxShadow: theme.shadows[8], // שימוש באחד מהצללים המוגדרים של MUI
              backgroundColor: 'rgba(255, 255, 255, 0.5)', // שקוף לבן
              backdropFilter: 'blur(10px)', // אפקט ה"זכוכית"
              animation: 'scale-in 0.3s ease-out', // נצטרך להגדיר keyframes ב-CSS הגלובלי או ב-styled component
            }}
          >
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing(5) }}>
              <Box>
                <Typography component="label" htmlFor="email" sx={{ display: 'block', marginBottom: theme.spacing(1) }}>
                  Email
                </Typography>
                <TextField
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  variant="outlined" // או filled, standard
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.grey[400],
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    pr: '40px', // לפנות מקום לאייקון
                    backgroundColor: theme.palette.background.default, // השתמשנו ב-default
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(1) }}>
                  <Typography component="label" htmlFor="password">
                    Password
                  </Typography>
                  <Link component={RouterLink} to="/forgot-password" variant="body2" color={theme.palette.tagit.blue} sx={{ '&:hover': { color: theme.palette.tagit.mint } }}>
                    Forgot password?
                  </Link>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.grey[400],
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      pr: '40px', // לפנות מקום לאייקון
                      backgroundColor: theme.palette.background.default, // השתמשנו ב-default
                    }}
                  />
                    <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      position: 'absolute',
                      right: theme.spacing(1),
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: theme.palette.primary.main,
                      '&:hover': {
                      color: theme.palette.primary.dark,
                      },
                    }}
                    >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    id="remember"
                    sx={{
                      '&.Mui-checked': {
                        color: theme.palette.tagit.mint,
                      },
                    }}
                  />
                }
                label={<Typography color={theme.palette.tagit.blue} sx={{ cursor: 'pointer' }}>Remember me</Typography>}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
                sx={{
                  backgroundColor: theme.palette.tagit.blue,
                  '&:hover': {
                    backgroundColor: theme.palette.tagit.darkblue,
                  },
                  color: 'white',
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <Box sx={{ mt: theme.spacing(6), textAlign: 'center' }}>
              <Typography variant="body2" color={theme.palette.tagit.blue}>
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register" variant="subtitle2" fontWeight="medium" color={theme.palette.tagit.darkblue} sx={{ '&:hover': { color: theme.palette.tagit.mint } }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* הוספת רכיב הסנקבר */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // זמן ההצגה של ההודעה (במילישניות)
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // מיקום ההודעה
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </LayoutWrapper>
  );
};

export default LoginPage;