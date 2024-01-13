import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {appStore} from './appStore'
import { RouterProvider } from 'react-router-dom'
import {Provider as ProviderSpectrum} from "@react-spectrum/provider";
import {APIProvider} from "@vis.gl/react-google-maps";
import { GOOGLE_MAP_API_KEY } from "@/shared/config";
import { appRouter } from './appRouter'

ReactDOM.render(
    <ProviderSpectrum height={"100%"}>
        <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Provider store={appStore}>
                <React.StrictMode>
                    <RouterProvider router={appRouter()} />
                </React.StrictMode>
            </Provider>
        </APIProvider>
    </ProviderSpectrum>,
    document.getElementById('root')
);
