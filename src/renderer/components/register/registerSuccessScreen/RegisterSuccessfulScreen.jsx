import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import CheckmarkAnimated from './CheckmarkAnimated';

const RegisterSuccessfulScreen = ({
  userData,
  firstUserRegistration,
  orientation,
}) => {
  const history = useHistory();

  useEffect(() => {
    // create user on successful registration
    window.middleware.db.users.createUser(userData);
  }, [userData]);

  useEffect(() => {
    if (firstUserRegistration && orientation) {
      /* && orientation - just a sanity check */
      // global settings document is created ONLY when the first user registers successfully!
      window.middleware.db.globalSettings.createGlobalSettings(orientation);
    }
  }, [firstUserRegistration, orientation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/mainscreen');
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
