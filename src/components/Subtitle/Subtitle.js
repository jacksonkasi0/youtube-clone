import React, { useEffect, useState } from 'react';
import { setSubtitle, subtitleState } from '../../store/action/deepgram';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import Style from './Subtitle.module.css';
import { Box } from '@mui/system';

var mediaRecorder;
const DG_KEY = process.env.REACT_APP_DEEPGRAM_SECRET_API_KEY;

const Subtitle = () => {
  let currentText = '';

  const dispatch = useDispatch();
  const { subtitleText, subState } = useSelector((state) => state.useDeepgram);
  let words = subtitleText.split(' ');

  const [fullTrans, setFullTrans] = useState(false);

  const fullTranscript = () => {
    setFullTrans((state) => !state);
  };

  const recording = () => {
    if (fullTrans) return alert("please click 'SHOW LESS' button");
    if (subState && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().filter((i) => i.stop());
      mediaRecorder = null;
      dispatch(subtitleState(false));
      console.log('stoped subtitle mic');
    }
  };

  const deepGramAudio2text = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        return alert('Browser not supported');
      }

      var options = { mimeType: 'video/webm' };
      mediaRecorder = new MediaRecorder(stream, options);

      let socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        DG_KEY,
      ]);

      socket.onopen = () => {
        mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && socket.readyState == 1) {
            // console.log(event.data);
            socket.send(event.data);
          }
        });
      };

      mediaRecorder.start(1200); // if you need fast transcript, change it between 100 - 250.
      console.log('started');

      socket.onmessage = async (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript && received.is_final) {
          currentText = currentText.concat(' ' + transcript);
          if (
            currentText !== null &&
            currentText !== undefined &&
            currentText !== ''
          ) {
            dispatch(setSubtitle(currentText));
          }
        }
      };
    });
  };

  useEffect(() => {
    let timerId;
    if (subState) {
      deepGramAudio2text();
    }
    return () => clearTimeout(timerId);
  }, [subState]);

  return (
    <Box
      className={`${Style.subtitle} ${fullTrans ? Style.autoHeight : ''}`}
      sx={{ position: 'absolute', height: subState ? '150px' : 0 }}
    >
      <Box className={Style.btnContainer}>
        <Button onClick={fullTranscript}>
          {fullTrans ? 'show less' : 'show more'}
        </Button>
        <Button onClick={recording}>close</Button>
      </Box>
      <h3>{words.slice(-25, -10).map((i) => i + ' ')}</h3>
      <h3>{words.slice(-10).map((i) => i + ' ')}</h3>
      <br />
      <br />
      <br />
      <hr />
      <br />
      <h4>{subtitleText}</h4>
    </Box>
  );
};

export default Subtitle;
