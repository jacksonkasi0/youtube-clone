import axios from 'axios';
import { useDispatch } from 'react-redux';
import { findIP } from '../store/action/ip';

const GetIP = async () => {
  const dispatch = useDispatch();
  try {
    const reponce = await axios.get('https://ipapi.co/json/');
    const countrie = await reponce.data.country;
    dispatch(findIP(countrie));
    console.log(countrie);
  } catch (error) {
    console.log(error);
  }
};

export default GetIP;
