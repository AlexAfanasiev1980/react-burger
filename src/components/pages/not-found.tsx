import React, { useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';

import styles from './not-found.module.css';

// import { Breadcrumbs } from '../components/breadcrumbs';
// import { HOME_CRUMB } from '../services/breadcrumbs';
const HOME_CRUMB = { path: '/', url: '/', title: 'Home' };

export function NotFound404() {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const errorBreadcrumb = [HOME_CRUMB, { path: pathname, url: pathname, title: '404' }];
    history.replace({ state: errorBreadcrumb });
  }, [history, pathname])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <Breadcrumbs /> */}
        <div className={styles.content}>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <br />
          <br />
          <p>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
        </div>
      </div>
    </div>
  );
}