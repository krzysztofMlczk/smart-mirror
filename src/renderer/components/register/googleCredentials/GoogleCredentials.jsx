import React, { useEffect, useState, useCallback } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';

import BackNextBtnsRow from '../../buttons/BackNextBtnsRow';
import GoogleAccountRow from './GoogleAccountRow';

const GoogleCredentials = ({
  next,
  back,
  googleAccessDenied,
  setGoogleAccessDenied,
  googleData,
  saveGoogleData,
}) => {
  const [currentGoogleData, setCurrentGoogleData] = useState(googleData);

  const beginAuthorization = useCallback(() => {
    window.middleware.google
      .signIn()
      .then((resultData) => setCurrentGoogleData(resultData))
      .catch((err) => {
        console.log(err);
        setGoogleAccessDenied(true);
      });
  }, [setCurrentGoogleData, setGoogleAccessDenied]);

  useEffect(() => {
    if (!currentGoogleData && !googleAccessDenied) {
      beginAuthorization();
    }
  }, [currentGoogleData, beginAuthorization, googleAccessDenied]);

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
      <Container maxWidth="xs">
        {currentGoogleData && (
          <>
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
          </>
        )}
        {googleAccessDenied && !currentGoogleData && (
          <>
            <Typography
              variant="overline"
              style={{ fontSize: '18px', color: 'red' }}
            >
              Google authorization is mandatory
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<AccountCircleOutlinedIcon />}
              style={{ width: '100%', marginTop: '24px' }}
              onClick={beginAuthorization}
            >
              Try again
            </Button>
          </>
        )}
        {(currentGoogleData || googleAccessDenied) && (
          <BackNextBtnsRow
            marginTop="24px"
            onBack={onBack}
            isNextDisabled={!currentGoogleData}
            onNext={onNext}
          />
        )}
      </Container>
    </>
  );
};

export default GoogleCredentials;
