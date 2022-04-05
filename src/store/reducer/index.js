import setUtilities from './utilities';
import useDeepgram from './deepgram';
import useIpApi from './ip';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  appUtilities: setUtilities,
  useDeepgram: useDeepgram,
  useIpApi: useIpApi,
});

export default rootReducer;
