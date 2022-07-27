import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../reducers';
import { getCookie } from '../utils';
import { TConnectionActions, TWSActions } from '../action-types/wsActionTypes'

export const socketMiddleware = (wsUrl:string, wsActions:TWSActions):Middleware => {
  return (store) => {
  let socket: WebSocket | null = null;
  return (next) => (action) => {
    const { dispatch, getState } = store;
    const { type, payload } = action;
    const { user } = getState().user;
    const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}${payload}`);
    }  

    if (socket && type === onClose) {
      socket.close(1000);
    }  


if (socket) {
        socket.onopen = (event:Event) => {
         
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event:Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event:MessageEvent) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event:Event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
          next(action);
        };
        };
      };
