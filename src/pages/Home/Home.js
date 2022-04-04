import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import Style from './Home.module.css';
import axios from 'axios';
import VideoCard from '../../components/VideoCard/VideoCard';
import apiHelper from '../../api/apiHelper';

const APIKEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const HOME_VIDEO_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${24}&regionCode=${'IN'}&key=${APIKEY}`;

const Home = () => {
  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(async () => {
    let timerId;
    try {
      const response = await axios.get(HOME_VIDEO_URL);
      await createVideoCards(response.data.items);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    return () => clearTimeout(timerId);
  }, []);

  const createVideoCards = async (youtubeData) => {
    const newVideoCards = await apiHelper({
      Type: 'homePage',
      youtubeData: youtubeData,
    });
    setVideoCards(newVideoCards);
    setIsLoading(false);
  };

  if (isError) {
    return (
      <Alert severity='error' className='loading'>
        No Results found!
      </Alert>
    );
  }

  return (
    <Box className={Style.home}>
      {isLoading ? (
        <CircularProgress className='loading' color='secondary' />
      ) : null}

      <Box className={Style.recommendedVideos}>
        {videoCards.map((item) => {
          return (
            <VideoCard
              key={item.videoId}
              videoId={item.videoId}
              title={item.title}
              image={item.image}
              views={item.views}
              timestamp={item.timestamp}
              channel={item.channel}
              channelImage={item.channelImage}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
