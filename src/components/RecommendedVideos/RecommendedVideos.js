import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Style from './RecommendedVideos.module.css';
import apiHelper from '../../api/apiHelper';
import VideoCard from '../VideoCard/VideoCard';
import { Alert, CircularProgress } from '@mui/material';

const RecommendedVideos = () => {
  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(async () => {
    let timerId;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${10}&regionCode=${'IN'}&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY
        }`
      );
      const createVideos = await apiHelper({
        Type: 'homePage',
        youtubeData: response.data.items,
      });
      setVideoCards(createVideos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
    return () => clearTimeout(timerId);
  }, []);

  if (isError) {
    return (
      <Alert severity='error' className='loading'>
        No Results found!
      </Alert>
    );
  }

  return (
    <div className={Style.recommendedVideos}>
      {isLoading ? <CircularProgress color='secondary' /> : null}
      <div className={Style.videos}>
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
      </div>
    </div>
  );
};

export default RecommendedVideos;
