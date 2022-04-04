import React, { useState } from 'react';
import Style from './VideoInfo.module.css';
import { Avatar, Box, Button } from '@mui/material';
import {
  ThumbDown,
  ThumbUp,
  Reply,
  PlaylistAdd,
  MoreHoriz,
} from '@mui/icons-material';
import SidebarIcons from '../SidebarIcons/SidebarIcons';

const VideoInfo = ({
  title,
  description,
  publishedDate,
  channelTitle,
  channelImage,
  viewCount,
  likeCount,
  dislikeCount,
  subs,
}) => {
  const [desc, setDesc] = useState(false);
  const [descTitle, setDescTitle] = useState('see more');

  const handleClick = () => {
    setDesc((state) => !state);
    setDescTitle(desc ? 'see more' : 'see less');
  };

  return (
    <Box className={Style.videoInfo}>
      <Box className={Style.headline}>
        <h1>{title}</h1>
      </Box>
      <Box pb={2} className={Style.status}>
        <p>
          {viewCount} views • {publishedDate}
        </p>
        <Box className={Style.likes}>
          <SidebarIcons Icon={ThumbUp} title={likeCount} disable />
          <SidebarIcons Icon={ThumbDown} title={dislikeCount} disable />
          <SidebarIcons Icon={Reply} title='SHARE' disable />
          <SidebarIcons Icon={PlaylistAdd} title='SAVE' disable />
          <SidebarIcons Icon={MoreHoriz} title='' disable />
        </Box>
      </Box>
      <hr />
      <Box className={Style.channel}>
        <Box className={Style.container}>
          <Avatar
            className={Style.avatar}
            src={channelImage}
            alt={channelTitle}
          />
          <Box className={Style.channelInfo}>
            <h3 className={Style.title}>{channelTitle}</h3>
            <p className={Style.subs}>{subs} subscribers</p>
          </Box>
        </Box>
        <Button className={Style.subscribe}>SUBSCRIBE</Button>
      </Box>
      <Box className={Style.desc} sx={{height:desc?'100%':'100px'}} >
        <pre>{description}</pre>
      </Box>
      <Button onClick={handleClick} >{descTitle}</Button>
    </Box>
  );
};

export default VideoInfo;
