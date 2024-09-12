import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/auth/authSlice'; // Adjust the import path as needed

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
          backdropFilter: 'blur(20px)', // Glassy effect
          borderBottom: '2px solid rgba(255, 255, 255, 0.5)', // Border to match the frosted glass effect
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)', // Similar shadow for consistency
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: 'black' }} // Text color to stand out on the frosted background
          >
            Nouman Khateeb
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              color: 'black', // Button text color
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light hover effect
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
