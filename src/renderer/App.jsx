import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, useHistory } from 'react-router-dom';
import LoginScreen from './components/loginScreen/LoginScreen';
import Register from './components/register/Register';
import MainScreen from './components/mainScreen/MainScreen';
import BootingScreen from './components/bootingScreen/BootingScreen';
import theme from './theme/theme';
import './App.global.css';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [firstUserRegistration, setFirstUserRegistration] = useState(false);
  const history = useHistory();

  /**
   * This useEffect checks what screen orientation
   * should be set while application is booting.
   * If there is no global settings (no orientation set),
   * then we don't have any users registered yet =>
   * go straight to Register flow and display OrientationChooser.
   * Otherwise just set the system orientation
   */
  useEffect(() => {
    window.middleware.db.globalSettings
      .readGlobalSettings()
      .then((globalSettings) => {
        console.table({ globalSettings });
        if (!globalSettings) {
          setFirstUserRegistration(true);
          history.push('/register');
        } else {
          window.middleware.screenOrientation.changeScreenOrientation(
            globalSettings.orientation
          );
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
            <Register displayOrientationChooser={firstUserRegistration} />
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
