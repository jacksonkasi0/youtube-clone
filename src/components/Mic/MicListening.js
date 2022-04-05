import React, { useEffect } from 'react';
import Style from './MicListening.module.css';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch } from 'react-redux';

var mediaRecorder;
const DG_KEY = process.env.REACT_APP_DEEPGRAM_SECRET_API_KEY;

const MicListening = ({ micSate, subState, subtitleState, setMic, setSearchText, searchBoxText }) => {
  const dispatch = useDispatch();

  let currentText = '';

  const recording = () => {
    if (micSate && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().filter((i) => i.stop());
      mediaRecorder = null;
    }
    dispatch(setMic(!micSate));
    console.log('stoped search mic');
    if (subState) {
      dispatch(subtitleState(false))
    };
  };

  const deepGramAudio2text = () => {
    try {
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

        mediaRecorder.start(1200);
        console.log('started');

        socket.onmessage = async (message) => {
          const received = JSON.parse(message.data);
          const transcript = received.channel.alternatives[0].transcript;
          if (transcript && received.is_final) {
            currentText = currentText.concat(' ' + transcript);
            console.log(currentText);
            if (
              currentText !== null &&
              currentText !== undefined &&
              currentText !== ''
            ) {
              dispatch(setSearchText(currentText));
            }
          }
        };
      });
    } catch (error) {
      alert('something went wrong please try again 😥');
      window.location.reload(false);
    }
  };

  useEffect(() => {
    let timerId;
    if (micSate) {
      deepGramAudio2text();
    }
    return () => clearTimeout(timerId);
  }, [micSate]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={micSate}
      onClick={recording}
    >
      <div className={Style.micContainer}>
        <button id='speech' className={Style.micbtn}>
          <div className={Style.pulse_ring}></div>
          <i className='fa-solid fa-microphone'></i>
        </button>

        <p>{searchBoxText}</p>
      </div>
    </Backdrop>
  );
};

export default MicListening;
