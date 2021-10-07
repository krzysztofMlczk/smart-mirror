import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import BackNextBtnsRow from '../../buttons/BackNextBtnsRow';
import GoogleAccountRow from './GoogleAccountRow';

const GoogleCredentials = ({ next, back, user, saveUser }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const beginAuthorization = () => {
    window.middleware.google
      .signIn()
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
          <BackNextBtnsRow
            marginTop="24px"
            onBack={onBack}
            isNextDisabled={!currentUser}
            onNext={onNext}
          />
        </Container>
      )}
    </>
  );
};

export default GoogleCredentials;
