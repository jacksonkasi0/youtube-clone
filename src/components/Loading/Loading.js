import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress className='loading' color='secondary' />
    </Backdrop>
  );
};

export default Loading;
