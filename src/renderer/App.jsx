import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleCredentials from './components/register/GoogleCredentials';
import theme from './theme/theme';
import './App.global.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/">
            <GoogleCredentials />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
