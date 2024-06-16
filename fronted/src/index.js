import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';  // Assuming you have some global styles
import {Provider}  from "react-redux"
import store from './Store';
import { AuthProvider } from './contextapi/User';
import reportWebVitals from './reportWebVitals';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
   
  
      <App />
</Provider>
     

  </React.StrictMode>
);
reportWebVitals();