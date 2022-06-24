import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, legacy_createStore as createStore} from "redux";
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from "./_reducers";
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, promiseMiddleware, logger))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
        <App />
    </Provider>
  </React.StrictMode>
);