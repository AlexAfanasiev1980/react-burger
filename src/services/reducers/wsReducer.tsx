import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_USER
} from "../action-types";

const initialState = {
  wsConnected: false,
  messages: [],
  messagesUser: [],
  error: undefined,
};

export const wsReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
                error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
                error: undefined,
        messages: action.payload
      };
      case WS_GET_MESSAGE_USER:
        return {
          ...state,
                  error: undefined,
          messagesUser: action.payload
        };
    default:
      return state;
  }
};
