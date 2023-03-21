import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import {
    Router,
    Route,
    Switch
} from 'react-router-dom'

import App from './routes/index';
import './index.css'

import IndexReducer from './store/index-reducer'
import IndexSagas from './store/index-sagas'

const sagaMiddleware = createSagaMiddleware();

export const hist = createBrowserHistory();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


const store = createStore(
    IndexReducer,
    composeSetup(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>
    ,
    document.getElementById('root'),
);
