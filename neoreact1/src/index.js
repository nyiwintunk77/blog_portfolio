import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';

import { HelmetProvider } from 'react-helmet-async';

import App from './App';

const saga = createSagaMiddleware();
const middleWares = [saga];
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleWares.push(logger);
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
const persistor = persistStore(store);
function loadLS() {
    try {
        const user = localStorage.getItem('user');
        if (!user) return;
        store.dispatch(tempSetUser(JSON.parse(user)));
        store.dispatch(check());
    } catch (error) {
        console.log(error);
    }
}

saga.run(rootSaga);
loadLS();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
