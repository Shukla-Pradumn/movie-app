import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore}>
    <App />
  </Provider>
);

reportWebVitals();
