import React, { useContext, useState, createContext, useCallback } from 'react';
import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest } from './api';
import { GET_USER_SUCCESS, LOGOUT_USER } from './actions/user-actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkResponse } from './actions/index';
import { RootState } from './reducers';
import { apdateTokenRequest } from './api';
import { getUserDate, signInUser, signOutUser } from './actions/user-actions';

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
  const { user } = useSelector((store:RootState) => {
    return store.user
  });

  const getUser = () => dispatch(getUserDate(user));

  const signIn = (form: any) => dispatch(signInUser(form));

  const signOut = (token: any) => dispatch(signOutUser(token));

  return {
    user,
    getUser,
    signIn,
    signOut
  };
}