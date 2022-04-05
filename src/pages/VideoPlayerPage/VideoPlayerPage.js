import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import apiHelper from '../../api/apiHelper';
import { Alert, Box, Button } from '@mui/material';
import Style from './VideoPlayerPage.module.css';
import Video from '../../components/Video/Video';
import VideoInfo from '../../components/VideoInfo/VideoInfo';
import RecommendedVideos from '../../components/RecommendedVideos/RecommendedVideos';
import Loading from '../../components/Loading/Loading';
import { subtitleState, setMic } from '../../store/action/deepgram';
import Subtitle from '../../components/Subtitle/Subtitle';

const APIKEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const { subState, micSate } = useSelector((state) => state.useDeepgram);

  const [videoInfo, setVideoInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(async () => {
    let timerId;
    setVideoInfo([]);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${APIKEY}`
      );
      const createVideoInfo = await apiHelper({
        Type: 'videoInfo',
        youtubeData: response.data.items[0],
      });

      setVideoInfo(createVideoInfo);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
    return () => clearTimeout(timerId);
  }, [videoId]);

  if (isError) {
    return (
      <Alert severity='error' className='loading'>
        No Results found!
      </Alert>
    );
  }

  return (
    <Box
      p={2}
      sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
      className={Style.videpPlayer}
    >
      <Box className={Style.videoDetails}>
        <Box className={Style.video}>
          {isLoading ? <Loading /> : <Video videoId={videoId} />}
        </Box>
        <Box>
          <Button
            className={Style.subBtn}
            onClick={() => {
              if (!subState) dispatch(subtitleState(!subState));
              if (micSate) {
                dispatch(setMic(false));
                console.log('stoped search mic');
              }
            }}
          >
            show me subtitles✨
          </Button>
        </Box>
        <Box className={Style.videoInfo}>
          {!isLoading ? (
            <VideoInfo
              title={videoInfo.title}
              description={videoInfo.description}
              publishedDate={videoInfo.publishedDate}
              videoTitle={videoInfo.videoTitle}
              channelTitle={videoInfo.channelTitle}
              channelImage={videoInfo.channelImage}
              viewCount={videoInfo.viewCount}
              likeCount={videoInfo.likeCount}
              dislikeCount={videoInfo.dislikeCount}
              subs={videoInfo.subs}
            />
          ) : null}
        </Box>
        <Subtitle />
      </Box>
      <Box className={Style.suggested}>
        <RecommendedVideos />
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;
