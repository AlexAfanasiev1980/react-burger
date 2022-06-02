import React, { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import { GET_USER_SUCCESS } from './actions/user-actions';
import { useDispatch } from 'react-redux';

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
  const [user, setUser] = useState(null);
  const getUser = async () => {
    return await getUserRequest()
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({ ...data.user });
        }
        return data.success;
      });
  };

  const signIn = async (form:any) => {
    const data = await loginRequest(form)
      .then(res => {
        return res.json();
      })
      .then(data => data);
        let authToken;
        if (data.accessToken.indexOf('Bearer') === 0) {
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
        setUser({ ...data.user });
      }
  };

  const signOut = async (token:string) => {
    await logoutRequest(token);
    setUser(null);
        // Удаляем куку token
    deleteCookie('token');
    localStorage.removeItem('refreshToken');
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}