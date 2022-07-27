import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch, useSelector } from '../services/hooks';
import { Router, Switch, Route } from "react-router-dom";
import { ProfileDataPage, OrdersPage, NotFound404 } from ".";
import { WS_CONNECTION_CLOSED } from '../services/action-types';
import { useAuth } from "../services/auth";
import { ProtectedRoute } from "../components/protected-routh";
import { getCookie } from '../services/utils';
import { IAuth, IOrder } from "../utils/types";
const links = ["Профиль", "История заказов", "Выход"];

export function ProfilePage(props: {onClick: (order: IOrder)=> void}) {
  let auth: IAuth = useAuth();
  const dispatch = useDispatch();
  const { onClick } = props;
  let logout = useCallback(
    (e) => {
      e.preventDefault();
      if (localStorage.getItem("refreshToken")) {
        auth.signOut(localStorage.getItem("refreshToken"));
      }
      dispatch({ type: WS_CONNECTION_CLOSED, payload: ''  });
    },
    [auth]
  );
  const state = useSelector((store) => {
    return store.user
  });

  return (
    <>
      <div className={styles.wrapperProfile}>
        <div className={`${styles.container} ${styles.containerItems}`}>
          <nav>
            <ul className={styles.items}>
              {links.map((link, index) => {
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
