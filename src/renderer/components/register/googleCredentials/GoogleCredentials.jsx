import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import BackNextBtnsRow from '../../buttons/BackNextBtnsRow';
import GoogleAccountRow from './GoogleAccountRow';

const GoogleCredentials = ({ next, back, googleData, saveGoogleData }) => {
  const [currentGoogleData, setCurrentGoogleData] = useState(googleData);

  const beginAuthorization = () => {
    window.middleware.google
      .signIn()
      .then((resultData) => setCurrentGoogleData(resultData))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!currentGoogleData) {
      beginAuthorization();
    }
  }, [currentGoogleData]);

  const onNext = () => {
    saveGoogleData(currentGoogleData);
    next();
  };

  const onBack = () => {
    saveGoogleData(currentGoogleData);
    back();
  };

  return (
    <>
      {currentGoogleData && (
        <Container maxWidth="xs">
          <GoogleAccountRow userData={currentGoogleData.userData} />
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
            isNextDisabled={!currentGoogleData}
            onNext={onNext}
          />
        </Container>
      )}
    </>
  );
};

export default GoogleCredentials;
