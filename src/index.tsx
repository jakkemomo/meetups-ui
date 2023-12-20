import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Meetup from './Meetup';
import { Provider } from 'react-redux';
import { store } from './store';
import { APIProvider } from '@vis.gl/react-google-maps';
import {darkTheme, defaultTheme, Provider as ProviderSpectrum} from '@adobe/react-spectrum';

const apiKey: string = (process.env.REACT_APP_GOOGLE_MAP_API_KEY as string)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  /* pass height and display for centering the whole page layouts */
  <ProviderSpectrum theme={darkTheme} height={"100%"} UNSAFE_style={{ display: 'flex'}}>
    <APIProvider apiKey={apiKey}>
      <Provider store={store}>
        <React.StrictMode>
          <Meetup />
        </React.StrictMode>
      </Provider>
    </APIProvider>
  </ProviderSpectrum>
);
