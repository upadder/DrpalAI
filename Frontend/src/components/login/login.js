import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D8FE1', // Blue color from the Design System
    },
    secondary: {
      main: '#252422', // Gray color from the Design System
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#1E1E1E', // Black color from the Design System
    },
    text: {
      primary: '#FFFFFF', // White 2 color from the Design System
      secondary: '#D4DCE2', // White 1 color from the Design System
    },
  },
  typography: {
    fontFamily: 'Satoshi, Arial', // Typeface from the Design System
  },
  components: {
    // Override styles for TextField here to match the Design System
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#D4DCE2', // White 1 color for focused label
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1D8FE1', // Blue color for the border
            },
            '&:hover fieldset': {
              borderColor: '#1D8FE1', // Blue color for the border on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1D8FE1', // Blue color for the border when focused
            },
          },
        },
      },
    },
  },
});

export default function SignInSide() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/home'); // Redirect to home page
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };

  // const handleGoogleLogin = () => {
  //   console.log("Hi Handle Google");
  //   console.log("Hi Handle Google 2 ",window);
  //   if (window.google) {
  //     window.google.accounts.id.initialize({
  //       client_id: '1053407861019-7luin9tbd3it37iavs7ldq2jc5cqckmp.apps.googleusercontent.com', // Replace with your client ID
  //       callback: handleCredentialResponse,
  //     });
  //     console.log("Hi Handle Google 3 ");
  //     window.google.accounts.id.prompt(); // This will display the Google One Tap or popup
  //   }
  // };
  
  // const handleCredentialResponse = (response) => {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   navigate('/'); // Redirect or handle the login success
  // };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', bgcolor: 'black' }}>
        <CssBaseline /> 
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            position: 'relative', // Set the position to relative for absolute positioning of children
            backgroundColor: 'black', // Set the background color to black
          }}
        >
        <Typography
            variant="h4"
            sx={{
              position: 'absolute', // Absolute position to place it on the top
              top: '10%', // Adjust the value as per your need
              width: '100%',
              textAlign: 'center',
              color: 'white',
            }}
          >
            Enhance Diagnosis, Empower Insights  <br /> 
            Whether you seek to understand complex cases  <br /> or optimize patient care,  <br />Doctor Pal leverages AI to streamline medical diagnosis.
          </Typography>
        <Box
            sx={{
              position: 'absolute', // Absolute position to place it at the bottom center
              bottom: '15%',
              left: '80%',
              transform: 'translateX(-65%)',
              width: '100%', // You can adjust the width as per your video aspect ratio
              height: 'auto', // Adjust the height as per your video aspect ratio
            }}
          >
          <video autoPlay loop muted style={{ width: '75%', height: '75%', objectFit: 'cover' }}>
            <source src={`${process.env.PUBLIC_URL}/videos/background.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          </Box>
          
        </Grid>
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square
            sx={{
            backgroundColor: 'black', // Set the background color to black
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '1px solid white', // Add a white left border
          }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#fff', // Set the default text color to white for all child components
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> */}
              {/* <LockOutlinedIcon /> */}
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="App Logo" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            {/* </Avatar> */}
            <Typography component="h1" variant="h5" color="white">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: '#fff' }, // Changes the label color to white
                }}
                InputProps={{
                  style: { color: '#fff' }, // Changes the input text color to white
                }}
                sx={{
                  '& label.Mui-focused': {
                    color: '#fff', // Keeps the label white on focus
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff', // Changes the border color to white
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff', // Changes the border color to white on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', // Keeps the border color white on focus
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  style: { color: '#fff' },
                }}
                sx={{
                  '& label.Mui-focused': {
                    color: '#fff',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    },
                    '&:hover fieldset': {
                      borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff',
                    },
                  },
                }}
              />
               <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: 'white', // This will change the checkbox color when not checked
                        '&.Mui-checked': {
                          color: 'white', // This will change the checkbox color when checked
                        },
                        '& .MuiSvgIcon-root': { // This targets the actual icon within the checkbox
                          stroke: 'white',
                          strokeWidth: 2,
                        }
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{ color: 'white', mr: 0, justifyContent: 'center', width: '100%' }}
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                style={{
                  width: '100%', // Full width to match the sign-in button
                  marginTop: '16px', // Match the margin-top of the sign-in button for consistent spacing
                  
                  // Apply additional styles here to match the design of your sign-in button
                }}
                // Customize GoogleLogin button if possible or ensure it contrasts well against the background
              />
              {/* <Button
                fullWidth
                variant="outlined"
                sx={{
                  mt: 1, mb: 2, borderColor: 'white', color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Slight highlight on hover
                    borderColor: 'white'
                  },
                }}
                onClick={handleGoogleLogin}
              >
                Sign in with Google
              </Button> */}
              <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: 'white' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: 'white' }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5, color: 'white' }}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                  Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
