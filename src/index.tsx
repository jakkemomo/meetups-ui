import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Provider as ProviderSpectrum} from "@react-spectrum/provider";
import {darkTheme} from "@adobe/react-spectrum";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Provider} from "react-redux";
import {store} from "./shared/api";
import {GOOGLE_MAP_API_KEY} from "./shared/config";

ReactDOM.render(
    <ProviderSpectrum theme={darkTheme} height={"100%"} UNSAFE_style={{display: 'flex'}}>
        <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
            <Provider store={store}>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </Provider>
        </APIProvider>
    </ProviderSpectrum>,
    document.getElementById('root')
);
