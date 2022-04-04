import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar/Sidebar';
import MiniSidebar from './components/MiniSidebar/MiniSidebar';
import { Box } from '@mui/material';
import SearchPage from './pages/SearchPage/SearchPage';
import VideoPlayerPage from './pages/VideoPlayerPage/VideoPlayerPage';

const App = () => {
  const { sidebarView, screenWidth } = useSelector(
    (state) => state.appUtilities
  );

  return (
    <Router>
      <Navbar />
      <Box mt={9.5} className='App'>
        {screenWidth >= 900 ? (
          <Sidebar />
        ) : (
          <MiniSidebar sidebarView={sidebarView} />
        )}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:searchQuery' element={<SearchPage />} />
          <Route path='/video/:videoId' element={<VideoPlayerPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
