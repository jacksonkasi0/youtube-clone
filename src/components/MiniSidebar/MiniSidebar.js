import React from 'react';
import Style from './MiniSidebar.module.css';
import Logo from '../../assets/YouTube-Logo.svg';
import { Link } from 'react-router-dom';
import { Box, Drawer, IconButton } from '@mui/material';
import { changeSidebar } from '../../store/action/utilities';
import { useDispatch } from 'react-redux';
import { MenuRounded } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';

const MiniSidebar = ({ sidebarView }) => {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(changeSidebar(!sidebarView));
  };

  return (
    <Drawer anchor={'left'} open={sidebarView} onClose={handleView}>
      <Box className={Style.container}>
        <IconButton
          size='large'
          onClick={handleView}
          sx={{ color: 'black', mr: '10px' }}
        >
          <MenuRounded />
        </IconButton>

        {/* Logo */}
        <Link to='/' onClick={handleView}>
          <img src={Logo} alt='youtube' />
        </Link>
      </Box>

      <Sidebar />
    </Drawer>
  );
};

export default MiniSidebar;
