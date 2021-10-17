import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  MemoryRouter as Router,
  withRouter,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import LoginScreen from './components/loginScreen/LoginScreen';
import Register from './components/register/Register';
import MainScreen from './components/mainScreen/MainScreen';
import BootingScreen from './components/bootingScreen/BootingScreen';
import theme from './theme/theme';
import './App.global.css';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [displayOrientationChooser, setDisplayOrientationChooser] =
    useState(false);
  const history = useHistory();

  useEffect(() => {
    window.middleware.db.users
      .readAllUsers()
      .then((users) => {
        console.log(users);
        if (users.length === 0) {
          // if no users registered yet, go straight to register
          // and display OrientationChooser in register flow
          setDisplayOrientationChooser(true);
          history.push('/register');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {appReady ? (
        <Switch>
          <Route exact path="/">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <Register displayOrientationChooser={displayOrientationChooser} />
          </Route>
          <Route path="/mainscreen">
            <MainScreen />
          </Route>
        </Switch>
      ) : (
        <BootingScreen setAppReady={setAppReady} />
      )}
    </ThemeProvider>
  );
}
