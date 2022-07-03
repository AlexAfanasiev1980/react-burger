export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';
import { getUserRequest, apdateTokenRequest, loginRequest, logoutRequest } from '../api';
import { checkResponse } from './index';
import { deleteCookie, setCookie } from '../utils';
import { AppDispatch, AppThunk } from '../../utils/index';

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: { password: string, email: string, name: string };
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: {name: string, email: string, password: string};
}

export interface ILogoutUserAction {
  readonly type: typeof LOGOUT_USER;
}

export type TUserActions =
| IGetUserSuccessAction
| IUpdateUserSuccessAction
| ILogoutUserAction;

export const getUserDate: AppThunk = (user:{ password: string, email: string, name: string }) => {
  return function(dispatch: AppDispatch) {
    getUserRequest()
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: { password: localStorage.getItem('password'), ...data.user }
        })
      }
      return data.success;
    })
    .catch(e => {
      if (user.name) {
        const data:any = apdateTokenRequest()
        .then(checkResponse)
        .then(data => {
          let authToken;
          if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
            authToken = data.accessToken.split('Bearer ')[1];
          }
          if (authToken) {
            setCookie('token', authToken, 0);
            localStorage.setItem('refreshToken', `${data.refreshToken}`);
            console.log('Token обновлен')
          }
        })
        .catch(e => {
          console.log(e.type);
        }) 
      }
      console.log(e.type);
    }) 
  }
}

export const signInUser: AppThunk = (form: {email: string, password: string}) => {
  return function(dispatch: AppDispatch) {
    loginRequest(form)
      .then(checkResponse)
      .then(data => {
        let authToken;
        if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
          authToken = data.accessToken.split('Bearer ')[1];
        }
        if (authToken) {
          setCookie('token', authToken, 0);
          localStorage.setItem('refreshToken', `${data.refreshToken}`);
        }
      if (data.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {...form, ...data.user}
        })
        localStorage.setItem('password', `${form.password}`);
      }
      })
      .catch(e => {
        console.log(e.type);
      })
        
  }
}

export const signOutUser: AppThunk = (token:string|null) => {
  return function(dispatch: AppDispatch) {
    logoutRequest(token)
    .then(checkResponse)
    .then(data => data)
    .catch(e => {
        console.log(e.type);
    })
    dispatch({
      type: LOGOUT_USER
    })
    deleteCookie('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('password');
  }
}

