import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminDashboard from '../Components/Admin/AdminDashboard/AdminDashboard';
import Certificate_table from '../Components/Admin/Certificate_table/Certificate_table';
// Adjust the path as needed

const AdminPage = () => {

  return (
    <div className="h-screen  px-10">
      <Typography variant="h3" component="h1" className="text-center mb-6 text-blue-800">
        Admin Dashboard
      </Typography>
      <AdminDashboard />
      <Certificate_table />
    </div>
  );
};

export default AdminPage;
