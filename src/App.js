import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

import FirstPage from './pages/FirstPage';
import ResizePage from './pages/ResizePage';

function App() {
  return (
    <div className={ styles.container }>
      <Switch>
        <Route exact path='/'>
          <FirstPage />
        </Route>
        <Route path='/resize'>
          <>
            <ResizePage />

          </>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
