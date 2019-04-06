import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/login';
import Feed from './pages/feed';
import Document from './pages/document';
import './index.css';
import * as serviceWorker from './serviceWorker';

const App = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Login} />
      <Route path="/feed" component={Feed} />
      <Route path="/document/:id" component={Document} />
    </React.Fragment>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
