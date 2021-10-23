import React from 'react';
import {
  MemoryRouter as Router,
  withRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
