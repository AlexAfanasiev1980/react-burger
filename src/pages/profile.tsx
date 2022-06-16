import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route } from "react-router-dom";
import { ProfileDataPage, OrdersPage, NotFound404 } from ".";
import { WS_CONNECTION_CLOSED } from '../services/action-types';
import { WS_CONNECTION_START_USER } from '../services/action-types/wsActionTypes';
import { useAuth } from "../services/auth";
import { ProtectedRoute } from "../components/protected-routh";
import { RootState } from '../services/reducers';
const links = ["Профиль", "История заказов", "Выход"];

export function ProfilePage(props:any) {
  let auth: any = useAuth();
  const dispatch = useDispatch();
  const { onClick } = props;
  let logout = useCallback(
    (e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem("token"));
      dispatch({ type: WS_CONNECTION_CLOSED });
    },
    [auth]
  );
  const state = useSelector((store:RootState) => {
    return store.user
  });

  useEffect(
    () => {
      if (state.user.name) {
        dispatch({ type: WS_CONNECTION_START_USER });
      }
    },
    [state.user.name]
  );

  return (
    <>
      <div className={styles.wrapperProfile}>
        <div className={`${styles.container} ${styles.containerItems}`}>
          <nav>
            <ul className={styles.items}>
              {links.map((link: string, index) => {
                let to = "";
                link === "Профиль"
                  ? (to = "/profile")
                  : link === "История заказов"
                  ? (to = "/profile/orders")
                  : (to = "/login");
                if (link === "Выход") {
                  return (
                    <li
                      className={`${styles.item} text text_type_main-medium`}
                      key={index}
                    >
                      <NavLink
                        key={index}
                        className={styles.linkProfile}
                        activeClassName={styles.activeLink}
                        to={`${to}`}
                        onClick={logout}
                      >
                        {link}
                      </NavLink>
                    </li>
                  );
                }

                return (
                  <li
                    className={`${styles.item} text text_type_main-medium`}
                    key={index}
                  >
                    <NavLink
                      key={index}
                      className={styles.linkProfile}
                      activeClassName={styles.activeLink}
                      to={`${to}`}
                    >
                      {link}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <p
              className={`${styles.textProfile} text text_type_main-default mt-20`}
            >
              В этом разделе вы можете <br />
              изменить свои персональные данные
            </p>
          </nav>

          <Switch>
            <ProtectedRoute path="/profile" exact={true}>
              <ProfileDataPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
              <OrdersPage onClick={onClick}/>
            </ProtectedRoute>
            <Route path="*">
              <NotFound404 />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
