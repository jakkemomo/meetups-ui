import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import '@/shared/base.css'
import {appStore} from './appStore'
import {Provider as ProviderSpectrum} from "@react-spectrum/provider";
import {darkTheme} from "@adobe/react-spectrum";
import {APIProvider} from "@vis.gl/react-google-maps";
import {GOOGLE_MAP_API_KEY} from "@/shared/config";
import App from "@/app/index";

ReactDOM.render(
    <ProviderSpectrum theme={darkTheme} height={"100%"} UNSAFE_style={{display: 'flex'}}>
        <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Provider store={appStore}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
        </APIProvider>
    </ProviderSpectrum>,
    document.getElementById('root')
);
