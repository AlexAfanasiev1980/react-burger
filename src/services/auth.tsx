import React, { useContext, createContext, useCallback, FunctionComponent } from "react";
import { deleteCookie, setCookie } from "./utils";
import { loginRequest, getUserRequest, logoutRequest } from "./api";
import { LOGOUT_USER } from "./actions/user-actions";
import { useDispatch, useSelector } from "../services/hooks";
import { checkResponse } from "./actions/index";
import { RootState } from "./reducers";
import { apdateTokenRequest } from "./api";
import { getUserDate, signInUser, signOutUser } from "./actions/user-actions";
import { ILogin, IAuth } from '../utils/types';

const AuthContext = createContext<any>(undefined);

export function ProvideAuth ({ children }: any) {
  const auth: IAuth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => {
    return store.user;
  });

  const getUser = () => dispatch(getUserDate(user));

  const signIn = (form: ILogin) => dispatch(signInUser(form));

  const signOut = (token: string|null) => dispatch(signOutUser(token));

  return {
    user,
    getUser,
    signIn,
    signOut,
  };
}
