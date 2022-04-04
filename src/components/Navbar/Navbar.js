import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './Navbar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../assets/YouTube-Logo.svg';
import avatar from '../../assets/avatar.png';
import { Toolbar, Box, AppBar, IconButton, Avatar } from '@mui/material';
import {
  MenuRounded,
  YouTube,
  MicRounded,
  SearchRounded,
  NotificationsNone,
  AppsRounded,
  VideoCall,
  CloseRounded
} from '@mui/icons-material';
import SearchBox from '../SearchBox/SearchBox';
import {
  changeSidebar,
  setScreenWidth,
  setMic,
  setSearchText,
} from '../../store/action/utilities';
import MicListening from '../Mic/MicListening';

const Navbar = () => {
  const dispatch = useDispatch();

  const { sidebarView, screenWidth, micSate, searchBoxText } = useSelector(
    (state) => state.appUtilities
  );

  const [visible, setVisible] = useState('none');

  useEffect(() => {
    let mount;
    window.addEventListener('resize', () => {
      dispatch(setScreenWidth(window.innerWidth));
    });
    return () => clearTimeout(mount);
  }, [window.innerWidth]);

  const toggleBottomSearch = () => {
    setVisible((state) => (state === 'flex' ? 'none' : 'flex'));
  };

  const toggleSidebar = () => {
    dispatch(changeSidebar(!sidebarView));
  };

  return (
    <AppBar className={Style.navbar}>
      <Box sx={{ px: '10px' }}>
        <Toolbar disableGutters>
          <IconButton
            size='large'
            onClick={toggleSidebar}
            sx={{ color: 'black', mr: '10px' }}
          >
            <MenuRounded />
          </IconButton>

          {/* Logo */}
          <Box className={Style.logo}>
            <Link to='/'>
              {screenWidth > 360 ? (
                <img src={Logo} alt='youtube' />
              ) : (
                <YouTube
                  fontSize='large'
                  sx={{
                    fontSize: '40px',
                    color: '#FF0000',
                    textDecoration: 'none',
                  }}
                />
              )}
            </Link>
          </Box>

          <SearchBox
            visible={visible}
            screenWidth={screenWidth}
            searchBoxText={searchBoxText}
            setSearchText={setSearchText}
          />

          <IconButton
            size='large'
            sx={{ color: '#000', display: { xs: 'flex', md: 'none' } }}
            onClick={toggleBottomSearch}
          >
            {visible==='none' ? <SearchRounded /> : <CloseRounded/>}
          </IconButton>

          <IconButton
            size='large'
            sx={{ color: '#000', bgcolor: '#eeeeee' }}
            onClick={() => {
              dispatch(setMic(!micSate));
            }}
          >
            <MicRounded />
          </IconButton>

          <Box className={Style.NavIcons}>
            <IconButton size='large'>
              <VideoCall />
            </IconButton>

            <IconButton size='large'>
              <AppsRounded />
            </IconButton>
            <IconButton size='large'>
              <NotificationsNone />
            </IconButton>
          </Box>

          <IconButton size='small'>
            <Avatar src={avatar} />
          </IconButton>
        </Toolbar>
      </Box>
      <MicListening
        micSate={micSate}
        setMic={setMic}
        setSearchText={setSearchText}
        searchBoxText={searchBoxText}
      />
    </AppBar>
  );
};

export default Navbar;
