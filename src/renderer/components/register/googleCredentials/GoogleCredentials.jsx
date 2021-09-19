import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import BackNextBtn from '../../buttons/BackNextBtn';
import GoogleAccountRow from './GoogleAccountRow';

const GoogleCredentials = ({ next, back, user, saveUser }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const beginAuthorization = () => {
    window.middleware
      .googleSignIn()
      .then((authorizedUser) => setCurrentUser(authorizedUser))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!currentUser) {
      beginAuthorization();
    }
  }, [currentUser]);

  const onNext = () => {
    saveUser(currentUser);
    next();
  };

  const onBack = () => {
    saveUser(currentUser);
    back();
  };

  return (
    <>
      {currentUser && (
        <Container maxWidth="xs">
          <GoogleAccountRow user={currentUser} />
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<AccountCircleOutlinedIcon />}
            style={{ width: '100%', marginTop: '24px' }}
            onClick={beginAuthorization}
          >
            Choose another account
          </Button>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: '24px' }}
          >
            <BackNextBtn variant="back" onClick={onBack}>
              Back
            </BackNextBtn>
            <BackNextBtn
              variant="next"
              disabled={!currentUser}
              onClick={onNext}
            >
              Next
            </BackNextBtn>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default GoogleCredentials;
