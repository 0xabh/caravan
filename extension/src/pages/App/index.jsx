import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './app';
import './index.css';
import {Store} from 'webext-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {HashRouter} from 'react-router-dom';
import {decodeJSON} from "../Background/utils";
import {getExistingAccountData, setExistingAccountData} from "../Background/redux-slices/account";

const store = new Store();

Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
});

const container = document.getElementById('app-container');

store
    .ready()
    .then(() => {
        if (container) {
            const data = decodeJSON(localStorage.getItem('state'));
            console.log('data', data);
            // if (data.account) {
            //     store.dispatch(setExistingAccountData(data.account.account));
            // }
            const root = createRoot(container); // createRoot(container!) if you use TypeScript
            root.render(
                <Provider store={store}>
                    <HashRouter>
                        <App/>
                    </HashRouter>
                </Provider>
            );
        }
    })
    .catch(console.log);
