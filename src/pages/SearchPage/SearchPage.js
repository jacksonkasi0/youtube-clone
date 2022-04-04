import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Tune } from '@mui/icons-material';
import apiHelper from '../../api/apiHelper';
import { Box, CircularProgress, Alert, Divider } from '@mui/material';
import Style from './SearchPage.module.css';
import ChannelRow from '../../components/ChannelRow/ChannelRow';
import VideoRow from '../../components/VideoRow/VideoRow';

const SearchPage = () => {
  const { searchQuery } = useParams();
  const [channelRow, setChannelRow] = useState('');
  const [videoRows, setVideoRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(async () => {
    let timerId;
    try {
      setChannelRow('');
      setIsLoading(true);
      const response1 = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${1}&type=channel&q=${searchQuery}&safeSearch=none&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      );
      const createChannelRow = await apiHelper({
        Type: 'channelRow',
        youtubeData: response1.data['items'][0],
      });
      setIsLoading(false);
      setChannelRow(createChannelRow);

      const response2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${12}&type=video&q=${searchQuery}&safeSearch=none&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      );
      const createVideoRows = await apiHelper({
        Type: 'videoRow',
        youtubeData: response2.data['items'],
      });

      setVideoRows(createVideoRows);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  if (isError) {
    return (
      <Alert severity='error' className='loading'>
        No Results found!
      </Alert>
    );
  }

  return (
    <Box px={1} className={Style.searchPage}>
      <Box className={Style.filter}>
        <Tune />
        <h2>Filter</h2>
      </Box>
      {isLoading ? (
        <CircularProgress className='loading' color='secondary' />
      ) : null}
      <hr className='hr' />
      {!isLoading ? (
        <ChannelRow
          key={channelRow.channelId}
          image={channelRow.image}
          channel={channelRow.title}
          subs={channelRow.subs}
          noOfVideos={channelRow.noOfVideos}
          description={channelRow.description}
        />
      ) : null}
      <hr className='hr' />
      {!isLoading
        ? videoRows.map((item) => {
            return (
              <VideoRow
                key={item.videoId}
                videoId={item.videoId}
                title={item.title}
                image={item.image}
                views={item.views}
                timestamp={item.timestamp}
                channel={item.channel}
                description={item.description}
              />
            );
          })
        : null}
    </Box>
  );
};

export default SearchPage;
