import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Meetup from './Meetup';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Meetup />
  </React.StrictMode>
);
