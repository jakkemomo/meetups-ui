import React from 'react'
import {Provider} from 'react-redux'
import {appStore} from './appStore'
import { RouterProvider } from 'react-router-dom'
import {Provider as ProviderSpectrum} from "@react-spectrum/provider";
import {APIProvider} from "@vis.gl/react-google-maps";
import { config } from "@/shared/config";
import { appRouter } from './appRouter';
import {darkTheme} from "@adobe/react-spectrum";
import {createRoot} from "react-dom/client";

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
    <ProviderSpectrum height={"100%"} theme={darkTheme}>
        <APIProvider apiKey={config.GOOGLE_MAP_API_KEY}>
            <Provider store={appStore}>
                <React.StrictMode>
                    <RouterProvider router={appRouter()} />
                </React.StrictMode>
            </Provider>
        </APIProvider>
    </ProviderSpectrum>
);
