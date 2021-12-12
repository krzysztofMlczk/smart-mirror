import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, useHistory } from 'react-router-dom';
import LoginScreen from './components/loginScreen/LoginScreen';
import LoginWithCredentials from './components/loginWithCredentials/LoginWithCredentials';
import Register from './components/register/Register';
import MainScreen from './components/mainScreen/MainScreen';
import BootingScreen from './components/bootingScreen/BootingScreen';
import routes from './routes/routes';
import UserContext from './context/UserContext';
import theme from './theme/theme';
import './App.global.css';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [firstUserRegistration, setFirstUserRegistration] = useState(false);
  const [expiredRefreshTokenDetected, setExpiredRefreshTokenDetected] =
    useState(false);
  const [userData, setUserData] = useState(null); // this will be populated using context
  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]); // context value should change only when userData is updated

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
          history.push(routes.REGISTER);
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
        <UserContext.Provider value={contextValue}>
          <Switch>
            <Route exact path={routes.LOGIN}>
              <LoginScreen
                setExpiredRefreshTokenDetected={setExpiredRefreshTokenDetected}
              />
            </Route>
            <Route exact path={routes.CREDENTIALS_LOGIN}>
              <LoginWithCredentials
                expiredRefreshTokenDetected={expiredRefreshTokenDetected}
                setExpiredRefreshTokenDetected={setExpiredRefreshTokenDetected}
              />
            </Route>
            <Route exact path={routes.REGISTER}>
              <Register displayOrientationChooser={firstUserRegistration} />
            </Route>
            <Route exact path={routes.MAIN}>
              <MainScreen />
            </Route>
          </Switch>
        </UserContext.Provider>
      ) : (
        <BootingScreen setAppReady={setAppReady} />
      )}
    </ThemeProvider>
  );
}
