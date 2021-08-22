import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Hello from './components/hello/Hello';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Hello name="Adrian" />
        </Route>
      </Switch>
    </Router>
  );
}
