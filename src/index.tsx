// import React from 'react';
import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as Router,
// } from 'react-router-dom';
// import App from './App';
import history from './router/history';
import router from './router/router';

import './index.css';

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root'),
  
// );

const render = async (location: any) => {
  const element: any = await router.resolve(location);
  ReactDOM.render(
          element,
      document.getElementById('root'),
  );
};

render(history.location);
history.listen(render);
