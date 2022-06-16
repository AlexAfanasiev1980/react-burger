import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware';

// const wsUrl = 'wss://norma.nomoreparties.space/api/orders';
const wsUrl = {
  wsUrlAll: 'wss://norma.nomoreparties.space/orders/all',
  wsUrlUser: 'wss://norma.nomoreparties.space/orders'
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));

export const store = createStore(rootReducer, enhancer);