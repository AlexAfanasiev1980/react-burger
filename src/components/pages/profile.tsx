import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './login.module.css';
import { Router, Switch, Route } from 'react-router-dom';
import { ProfileDataPage, OrdersPage, NotFound404 } from '../pages';
import { useAuth } from '../../services/auth';
import { ProtectedRoute } from '../protected-routh';
const links = ["Профиль", "История заказов", "Выход"];


export function ProfilePage() {
  let auth:any = useAuth();
  let logout = useCallback(
    e => {
      e.preventDefault();
      auth.signOut(localStorage.getItem('token'));
    },
    [auth]
  );

  return (
    <>
    <div className={styles.wrapperProfile}>
      <div className={`${styles.container} ${styles.containerItems}`}>
        <nav>
        <ul className={styles.items}>
          {links.map((link:string, index) => {
            let to = '';
            link === "Профиль" ? to = '/profile' : link === "История заказов" ? to = '/profile/orders' : to = '/login';
            if (link === "Выход") {
            return (<li className={`${styles.item} text text_type_main-medium`} key={index}>
              <NavLink
                key={index} 
                className={styles.linkProfile} 
                activeClassName={styles.activeLink}
                to={`${to}`}
                onClick={logout}
                >
                {link}
              </NavLink>
              </li>)
            }
            
            return (<li className={`${styles.item} text text_type_main-medium`} key={index}>
              <NavLink 
                key={index}
                className={styles.linkProfile} 
                activeClassName={styles.activeLink}
                to={`${to}`}
                >
                {link}
              </NavLink>
            </li>)
          })}
        </ul>
        <p className={`${styles.textProfile} text text_type_main-default mt-20`}>
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
        </nav>
        
          <Switch>
            <ProtectedRoute path="/profile" exact={true}>
                <ProfileDataPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
                <OrdersPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders/:id" exact={true}>
                {/* <ProfileDataPage /> */}
            </ProtectedRoute>
            <Route path='*'>
                <NotFound404 />
            </Route>
          </Switch>
        
      </div>
    </div>
    </>
  );
}