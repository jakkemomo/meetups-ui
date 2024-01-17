import React from 'react'
import {Provider} from 'react-redux'
import {appStore} from './appStore'
import { RouterProvider } from 'react-router-dom'
// import {Provider as ProviderSpectrum} from "@react-spectrum/provider";
// import {darkTheme} from "@adobe/react-spectrum";
import {APIProvider} from "@vis.gl/react-google-maps";
import { config } from "@/shared/config";
import { appRouter } from './appRouter';
import {createRoot} from "react-dom/client";
import './index.css';

const root = document.getElementById('root')!

createRoot(root).render(
  <React.StrictMode>
{/*    <ProviderSpectrum height={"100%"} theme={darkTheme}>*/}
      <APIProvider apiKey={config.GOOGLE_MAP_API_KEY}>
        <Provider store={appStore}>
          <RouterProvider router={appRouter} />
        </Provider>
      </APIProvider>
    {/*</ProviderSpectrum>*/}
  </React.StrictMode>
);
