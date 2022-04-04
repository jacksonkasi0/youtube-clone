import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Style from './SidebarIcons.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeIconColor, changeSidebar } from '../../store/action/utilities';

const SidebarIcons = ({ Icon, title, disable }) => {
  const dispatch = useDispatch();

  const { sidebarIcon, sidebarView, screenWidth } = useSelector(
    (state) => state.appUtilities
  );

  const [color, setColor] = useState(false);

  useEffect(() => {
    let timerId;
    setColor(sidebarIcon === title ? true : false);
    return () => clearTimeout(timerId);
  }, [sidebarIcon]);

  const setIconColor = (val) => {
    dispatch(changeIconColor(val));
  };

  const handleView = () => {
    if (screenWidth >= 900) {
      return;
    }
    dispatch(changeSidebar(!sidebarView));
  };

  return (
    <Box
      py={1.5}
      px='1.5em'
      className={`${Style.sidebarIcons} ${
        screenWidth >= 900 && sidebarView && !disable ? Style.mini : ''
      } ${disable ? Style.videInfo : ''}`}
      onClick={() => {
        if (disable) {
          return;
        }
        setIconColor(title);
        handleView();
      }}
      sx={{ bgcolor: color ? '#ebe8e8' : '#fff' }}
    >
      <Icon className={Style.icon} sx={{ color: color ? 'red' : '#000' }} />
      <Typography variant='h7'>{title === undefined && disable ? 'DISLIKE' : title}</Typography>
    </Box>
  );
};

export default SidebarIcons;
