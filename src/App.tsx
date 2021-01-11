import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

import FirstPage from './pages/FirstPage';
import ResizePage from './pages/ResizePage';

const App: React.FC = () => {
  return (
    <div className={ styles.container }>
      <div className={ styles.content }>
        <Switch>
          <Route
            exact
            path='/'
          >
            <FirstPage />
          </Route>
          <Route path='/resize'>
            <ResizePage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
