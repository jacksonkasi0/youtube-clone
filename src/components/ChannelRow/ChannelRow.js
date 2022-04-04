import React from 'react';
import Style from './ChannelRow.module.css';
import { Avatar, Box } from '@mui/material';

const ChannelRow = ({ image, channel, subs, noOfVideos, description }) => {

  return (
    <Box mx={1} className={Style.channelRow} sx={{display:"flex",flexDirection:{xs:"column",sm:"row"}}} >
      <Avatar className={Style.logo} alt={channel} src={image} />
      <Box className={Style.text}>
        <h4>{channel}</h4>
        <p>
          {subs} subscribers • {noOfVideos} videos
        </p>
        <p>{description}</p>
      </Box>
    </Box>
  );
};

export default ChannelRow;
