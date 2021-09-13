import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';

const GoogleCredentials = () => {
  useEffect(() => {
    window.middleware.googleSignIn();
  }, []);

  return (
    // <Button
    //   variant="outlined"
    //   color="secondary"
    //   size="large"
    //   onClick={() => window.middleware.googleSignIn()}
    // >
    //   Sync with Google
    // </Button>
    <></>
  );
};

export default GoogleCredentials;
