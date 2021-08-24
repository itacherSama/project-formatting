import React from 'react';
import styles from './App.module.css';

const App: React.FC = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
  </div>
);

export default App;
