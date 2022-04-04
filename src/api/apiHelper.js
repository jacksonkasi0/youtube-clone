import axios from 'axios';
import { DateTime } from 'luxon';
const APIKEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const apiHelper = ({ Type, youtubeData }) => {
  const homePage = async () => {
    const newVideoCards = [];
    for (const video of youtubeData) {
      const videoId = video.id;
      const snippet = video.snippet;
      const channelData = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${snippet.channelId}&key=${APIKEY}`
      );
      const channelImage = await channelData.data.items[0].snippet.thumbnails
        .medium.url;
      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const views = video.statistics.viewCount;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;
      newVideoCards.push({
        videoId,
        title,
        image,
        channel,
        channelImage,
        views,
        timestamp,
      });
    }
    return newVideoCards;
  };

  const channelRow = async () => {
    const channelId = youtubeData.id.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${APIKEY}`
    );
    const noOfVideos = response.data.items[0].statistics.videoCount;
    const subs = response.data.items[0].statistics.subscriberCount;
    const snippet = youtubeData.snippet;
    const title = snippet.title;
    const description = snippet.description;
    const image = snippet.thumbnails.medium.url;
    return {
      channelId,
      image,
      title,
      subs,
      noOfVideos,
      description,
    };
  };

  const videoRows = async () => {
    const newVideoRows = [];
    for (const video of youtubeData) {
      const videoId = video.id.videoId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${APIKEY}`
      );
      const views = response.data.items[0].statistics.viewCount;
      const snippet = video.snippet;
      const title = snippet.title;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;
      const description = snippet.description;
      const image = snippet.thumbnails.medium.url;

      newVideoRows.push({
        videoId,
        title,
        image,
        views,
        timestamp,
        channel,
        description,
      });
    }
    return newVideoRows;
  };

  const videoInfo = async () => {
    const snippet = youtubeData.snippet;
    const stats = youtubeData.statistics;
    const channelId = snippet.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${APIKEY}`
    );

    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
      'en-GB',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
    const title = snippet.title;
    const description = snippet.description;
    const channelTitle = snippet.channelTitle;
    const viewCount = stats.viewCount;
    const likeCount = stats.likeCount;
    const dislikeCount = stats.dislikeCount;

    return {
      title,
      description,
      publishedDate,
      channelTitle,
      channelImage,
      viewCount,
      likeCount,
      dislikeCount,
      subs,
    };
  };

  if (Type === 'homePage') {
    return homePage();
  } else if (Type === 'channelRow') {
    return channelRow();
  } else if (Type === 'videoRow') {
    return videoRows();
  } else if (Type === 'videoInfo') {
    return videoInfo();
  }
};

export default apiHelper;
