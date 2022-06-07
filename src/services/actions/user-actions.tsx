export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER'
import { getUserRequest, apdateTokenRequest, loginRequest, logoutRequest } from '../api';
import { checkResponse } from './index';
import { deleteCookie, setCookie } from '../utils';

export function getUserDate(user:any) {
  return function(dispatch: any) {
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

export function signInUser(form:any) {
  return function(dispatch: any) {
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

export function signOutUser(token:any) {
  return function(dispatch: any) {
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

