import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Hello from './components/hello/Hello';
import Register from './components/register/Register';
import theme from './theme/theme';
import './App.global.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
