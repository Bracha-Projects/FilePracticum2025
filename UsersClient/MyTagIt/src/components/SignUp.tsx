import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  styled,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Footer from './Footer';
import axios from 'axios';
import { RoleType, User } from '../models/User';

// Styled Components for Consistent Styling
const ScrollableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#4B6982',
  color: 'white',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  backgroundImage: `
    radial-gradient(circle, rgba(55, 71, 79, 0.95), rgba(55, 71, 79, 0.8)),
    url("/path/to/your/subtle-background.png")
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const FullPageContainer = styled(Container)(({ theme }) => ({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  width: '100%',
  flexGrow: 1, // Take up available space
}));

const SignUpBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  maxWidth: '300px',
  width: '100%',
  position: 'relative',
  boxShadow: theme.shadows[4],
}));

const LogoImage = styled('img')({
  width: '100px',
  height: 'auto',
  marginBottom: '8px',
});

const SignUpButton = styled(Button)(({ theme }) => ({
  marginTop: '8px',
  marginBottom: '8px',
  padding: '8px 16px',
  backgroundColor: '#A5D6A7',
  color: '#37474F',
  fontFamily: 'Roboto Slab, serif',
  fontWeight: 500,
  fontSize: '0.8rem',
  lineHeight: 1,
  '&:hover': {
    backgroundColor: '#81C784',
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
    transition: 'transform 0.2s, boxShadow 0.2s',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.8rem',
  },
});

const StyledSelect = styled(Select)({
  '& .MuiInputBase-root': {
    height: '32px',
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.8rem',
  },
});

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.mixed<RoleType>().oneOf(Object.values(RoleType) as RoleType[]).required('Role is required'),
});

const SignUpForm: React.FC = () => {

const {
    control,
    handleSubmit,
    formState: { errors },
} = useForm<User & { confirmPassword: string }>({
    resolver: yupResolver(schema),
});

  const onSubmit = (data: User & { confirmPassword: string }) => {
    const { confirmPassword, ...userData } = data; // Exclude confirmPassword
    console.log(userData);
    axios.post('https://localhost:7153/api/User/register', userData)
      .then((response) => {
        console.log('API Response:', response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
    console.log('Form Data:', userData);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ScrollableContainer>
      <FullPageContainer disableGutters maxWidth={false}>
        <SignUpBox>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <LogoImage src="../../public/logo.png" alt="Tag-it Logo" />
          </Box>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            sx={{
              mb: 1,
              color: '#37474F',
              fontFamily: 'Roboto Slab, serif',
              fontSize: '1.1rem',
            }}
          >
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <StyledTextField
                  margin="dense"
                  fullWidth
                  label="First Name"
                  {...field}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <StyledTextField
                  margin="dense"
                  fullWidth
                  label="Last Name"
                  {...field}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  margin="dense"
                  fullWidth
                  label="Email"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  margin="dense"
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledTextField
                  margin="dense"
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...field}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ''
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <FormControl fullWidth margin="dense" error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Controller
                name="role"
                control={control}
                defaultValue={RoleType.User}
                render={({ field }) => (
                  <StyledSelect label="Role" {...field}>
                    <MenuItem value={RoleType.Admin}>Admin</MenuItem>
                    <MenuItem value={RoleType.Editor}>Editor</MenuItem>
                    <MenuItem value={RoleType.User}>User</MenuItem>
                  </StyledSelect>
                )}
              />
              <FormHelperText>{errors.role ? errors.role.message : ''}</FormHelperText>
            </FormControl>
            <SignUpButton type="submit" fullWidth variant="contained">
              Sign Up
            </SignUpButton>
            <Typography
              variant="caption"
              align="center"
              sx={{ color: '#37474F', fontFamily: 'Roboto Slab, serif' }}
            >
              Already have an account? <Link href="/login">Login</Link>
            </Typography>
          </Box>
        </SignUpBox>
      </FullPageContainer>
      <Footer />
    </ScrollableContainer>
  );
};

export default SignUpForm;