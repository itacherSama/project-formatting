import React from 'react';
import { Router } from '@reach/router';
import MainPage from 'pages/MainPage';

import { initLocalStorage } from 'effector/init';
import styles from './App.module.css';

initLocalStorage();

const AppRoute = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <Router>
        <MainPage path="/" />
      </Router>
    </div>
  </div>
);

export default AppRoute;
