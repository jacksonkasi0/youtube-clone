import React from 'react';
import { useSelector } from 'react-redux';
import SidebarIcons from '../SidebarIcons/SidebarIcons';
import { Box, Typography } from '@mui/material';
import Style from './Sidebar.module.css';
import {
  HomeOutlined,
  WhatshotOutlined,
  ExploreOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  HistoryOutlined,
  SlideshowOutlined,
  WatchLaterOutlined,
  ThumbUpOutlined,
  ExpandMore,
  YouTube,
  LocalMoviesOutlined,
  SportsEsportsOutlined,
  Checkroom,
  LightbulbOutlined,
  EmojiEventsOutlined,
} from '@mui/icons-material';

const Sidebar = () => {
  const { screenWidth, sidebarView } = useSelector(
    (state) => state.appUtilities
  );

  const sidebarIcons = (
    <>
      <SidebarIcons Icon={HistoryOutlined} title='History' />
      <SidebarIcons Icon={SlideshowOutlined} title='Your videos' />
      <SidebarIcons Icon={WatchLaterOutlined} title='Watch later' />
      <SidebarIcons Icon={ThumbUpOutlined} title='Liked videos' />
      <SidebarIcons Icon={ExpandMore} title='See more' />
      <hr />
      <Typography variant='h7' className={Style.title}>
        MORE FROM YOUTUBE
      </Typography>
      <SidebarIcons Icon={YouTube} title='YouTube Premium' />
      <SidebarIcons Icon={LocalMoviesOutlined} title='Movies' />
      <SidebarIcons Icon={SportsEsportsOutlined} title='Gaming' />
      <SidebarIcons Icon={Checkroom} title='Fashion & Beauty' />
      <SidebarIcons Icon={LightbulbOutlined} title='Learning' />
      <SidebarIcons Icon={EmojiEventsOutlined} title='Sport' />
      <br />
      <br />
      <br />
      <br />
    </>
  );

  return (
    <Box
      className={`${Style.sidebar} ${
        screenWidth >= 900 && sidebarView ? Style.mini : ''
      }`}
    >
      <SidebarIcons Icon={HomeOutlined} title='Home' />
      <SidebarIcons Icon={WhatshotOutlined} title='Trend' />
      <SidebarIcons Icon={ExploreOutlined} title='Explore' />
      <SidebarIcons Icon={SubscriptionsOutlined} title='Subscription' />

      {screenWidth >= 900 ? !sidebarView && <hr /> : <hr />}

      <SidebarIcons Icon={VideoLibraryOutlined} title='Library' />

      {screenWidth >= 900 ? !sidebarView && sidebarIcons : sidebarIcons}
    </Box>
  );
};

export default Sidebar;
