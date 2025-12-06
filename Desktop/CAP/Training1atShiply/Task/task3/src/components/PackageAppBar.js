import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useNavigate } from 'react-router-dom';

const PackageAppBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb', height: '100px', }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '100px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center',ml:10 }}>
          <WidgetsIcon sx={{ mr: 1, color: '#3b82f6', fontSize: 28, ml: 12, p: 1, backgroundColor: '#e0edff', borderRadius: 2, }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
              Package Tracker
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Manage your deliveries
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 22 }}>
          <PersonOutlineIcon sx={{ mr: 1, color: '#6b7280' }} />
          <Typography sx={{ mr: 2, color: '#374151' }}>Welcome, emilys</Typography>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem('accessToken');
              navigate('/');
            }}
            sx={{ border: '2px solid #000000', borderRadius: 2, backgroundColor: '#ffffff', color: '#111827', textTransform: 'none', fontWeight: 700, '&:hover': { backgroundColor: '#f9fafb', borderColor: '#000000', }, }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default PackageAppBar;
