import React from 'react';
import Style from './VideoRow.module.css';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const VideoRow = ({ views, description, timestamp, channel, title, image, videoId }) => {
  return (
    <Box my={2} className={Style.videoRow}>
      <Link to={`/video/${videoId}`}>
        <img src={image} alt={title} />
      </Link>
      <Box className={Style.text}>
        <Link to={`/video/${videoId}`}>
          <h3>{title}</h3>
        </Link>
        <p className={Style.headline}>
          {channel} • {views} views • {timestamp}
        </p>
        <p className={Style.description}>{description}</p>
      </Box>
    </Box>
  );
};

export default VideoRow;
