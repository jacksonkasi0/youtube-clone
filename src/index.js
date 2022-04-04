import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import setUtilities from './store/reducer/utilities';
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
  appUtilities: setUtilities,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
