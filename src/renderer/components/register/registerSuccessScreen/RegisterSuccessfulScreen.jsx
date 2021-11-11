import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import routes from '../../../routes/routes';
import CheckmarkAnimated from './CheckmarkAnimated';
import UserContext from '../../../context/UserContext';

const RegisterSuccessfulScreen = ({
  userName,
  avatar,
  googleData,
  firstUserRegistration,
  orientation,
}) => {
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  /**
   * This useEffect:
   * - creates new user document in the users collection
   * - saves all relevant data into react.Context (see UserContext.js for the context object structure)
   */
  useEffect(() => {
    /* eslint-disable @typescript-eslint/naming-convention */
    const { tokens, userData } = googleData;
    const { access_token, expires_in, token_type, id_token } = tokens;
    const { email, locale, name, picture } = userData;
    // SAVE ALL RELEVANT DATA INTO REACT.CONTEXT
    setUserData({
      userName,
      avatar,
      layout: window.middleware.db.defaults.layout,
      accessToken: access_token,
      expiresIn: expires_in,
      tokenType: token_type,
      idToken: id_token,
      email,
      locale,
      name,
      picture,
    });
    // CREATE NEW USER IN DB ON SUCCESSFUL REGISTRATION
    window.middleware.db.users.createUser({ userName, avatar, googleData });
  }, [userName, avatar, googleData, setUserData]);

  useEffect(() => {
    if (firstUserRegistration && orientation) {
      /* && orientation - just a sanity check */
      // global settings document is created ONLY when the first user registers successfully!
      window.middleware.db.globalSettings.createGlobalSettings(orientation);
    }
  }, [firstUserRegistration, orientation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push(routes.MAIN);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: '90vh' }}
      >
        <Grid item>
          <CheckmarkAnimated />
        </Grid>
        <Grid item>
          <Typography variant="h1" display="block" align="center">
            Success!
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            display="block"
            align="center"
            style={{ fontWeight: '100' }}
          >
            Welcome on board
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterSuccessfulScreen;
