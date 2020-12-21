import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import FirstPage from './pages/FirstPage';
import ResizePage from './pages/ResizePage';

function App() {
  return (
    <div className="App">
      <section className="container">
        <Switch>
          <Route exact path='/'>
            <FirstPage />
          </Route>
          <Route path='/resize'>
            <ResizePage />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
