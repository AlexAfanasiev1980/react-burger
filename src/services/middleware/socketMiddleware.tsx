import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../utils';

export const socketMiddleware = (wsUrl:any) => {
  return (store:any) => {
    const { wsUrlAll, wsUrlUser } = wsUrl;
  
    let socket:any = null;
    let socketUser:any = null;

  return (next:any) => (action:any) => {
    const { dispatch, getState } = store;
    const { type, payload } = action;
    const { user } = getState().user;

    if (type === 'WS_CONNECTION_START') {
      socket = new WebSocket(`${wsUrlAll}`);
    }  

if (socket) {
        socket.onopen = (event:any) => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = (event:any) => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

        socket.onmessage = (event:any) => {
          const { data } = event;
          dispatch({ type: 'WS_GET_MESSAGE', payload: JSON.parse(data) });
        };

        socket.onclose = (event:any) => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      if (type === 'WS_CONNECTION_START_USER' && user) {
        console.log(getCookie('token'));
        socketUser = new WebSocket(`${wsUrlUser}?token=${getCookie('token')}`);
      }

    if (socketUser) {
      console.log(socketUser.readyState)

            socketUser.onopen = (event:any) => {
              dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
            };

            socketUser.onerror = (event:any) => {
              dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
            };
    
            socketUser.onmessage = (event:any) => {
              const { data } = event;
              dispatch({ type: 'WS_GET_MESSAGE_USER', payload: JSON.parse(data) });
            };

            socketUser.onclose = (event:any) => {
              dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
            };
    
            if (type === 'WS_SEND_MESSAGE') {
              const message = payload;
              socketUser.send(JSON.stringify(message));
            }
          }
    
          next(action);
        };
        };
      };
