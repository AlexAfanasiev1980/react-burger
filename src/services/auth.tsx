import React, { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import { GET_USER_SUCCESS, LOGOUT_USER } from './actions/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkResponse } from './actions/index';
import { RootState } from './reducers';
import { apdateTokenRequest } from './api';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }:any) {
  const auth:any = useProvideAuth();
  return <AuthContext.Provider value={auth}>
           {children}
         </AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);
  const { user } = useSelector((store:RootState) => {
    return store.user
  });
  const getUser = async () => {
    return await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: { password: localStorage.getItem('password'), ...data.user }
          })
          // setUser({ ...data.user });
        }
        return data.success;
      })
      .catch(e => {
        if (user.name) {
          const data:any = apdateTokenRequest()
          .then(checkResponse)
          .then(data => data)
          .catch(e => {
            console.log(e.type);
          })
          let authToken;
        if (data.accessToken && data.accessToken.indexOf('Bearer') === 0) {
          authToken = data.accessToken.split('Bearer ')[1];
        }
        if (authToken) {
          setCookie('token', authToken, 0);
          localStorage.setItem('refreshToken', `${data.refreshToken}`);
          console.log('Token обновлен')
        }
        }
        console.log(e.type);
      })
  };

  const signIn = async (form:any) => {
    const data = await loginRequest(form)
      .then(res => {
        return res.json();
      })
      .then(data => data)
      .catch(e => {
        console.log(e.type);
      })
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
        // setUser({ ...data.user });
      }
  };

  const signOut = async (token:string) => {
    await logoutRequest(token);
    dispatch({
      type: LOGOUT_USER
    })
    deleteCookie('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('password');
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}