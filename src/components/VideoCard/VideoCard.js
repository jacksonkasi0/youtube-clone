import React from 'react';
import { Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Style from './VideoCard.module.css';
import { Link } from 'react-router-dom';

const VideoCard = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  videoId,
}) => {
  const { sidebarView, screenWidth } = useSelector(
    (state) => state.appUtilities
  );

  return (
    <Box
      className={
        screenWidth > 900
          ? sidebarView
            ? Style.videoCard
            : Style.videoCard__mini
          : Style.videoCard
      }
    >
      <Link to={`/video/${videoId}`} className={Style.image} >
        <img src={image} alt={title} className={Style.image} />
      </Link>
      <Box className={Style.info}>
        <Avatar className={Style.Avatar} alt={channel} src={channelImage} />
        <Box className={Style.text}>
          <Link to={`/video/${videoId}`}>
            <h4>{title}</h4>
          </Link>
          <p>{channel}</p>
          <p>
            {views} views • {timestamp}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCard;
