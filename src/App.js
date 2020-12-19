import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import DropzonePage from './components/DropzonePage';
import ResizePage from './components/ResizePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact to='/'>
          <DropzonePage />
        </Route>
        <Route to='/resize'>
          <ResizePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
