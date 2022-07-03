import { IOrder } from "../../utils/types";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from "../action-types";
import type { TConnectionActions } from '../action-types/wsActionTypes';

type TInitialStateOrder = {
  wsConnected: boolean,
  messages: {
    orders: Array<IOrder>,
    success: boolean,
    total: number,
    totalToday: number
  }
  error: boolean | undefined
}

const initialState: TInitialStateOrder = {
  wsConnected: false,
  messages: {
    orders: [],
    success: false,
    total: 0,
    totalToday: 0
  },
  error: undefined,
};

export const wsReducer = (state = initialState, action: TConnectionActions):TInitialStateOrder => {
  // console.log(action.payload);
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
    default:
      return state;
  }
};
