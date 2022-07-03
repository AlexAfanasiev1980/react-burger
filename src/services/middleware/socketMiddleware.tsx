import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../utils';

export const socketMiddleware = (wsUrl:any, wsActions:any) => {
  return (store:any) => {
  let socket:any = null;
  return (next:any) => (action:any) => {
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
        socket.onopen = (event:any) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event:any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event:any) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };

        socket.onclose = (event:any) => {
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
