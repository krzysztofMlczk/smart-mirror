import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

const FaceScanner = () => {
  const [scanning, setScanning] = useState(false);

  const onStart = () => {
    setScanning(true);
    window.middleware.faceRecognition.register();
  };

  return (
    <div
      style={{
        textAlign: 'center',
        width: '300px',
        height: '300px',
        margin: 'auto',
        fontSize: '40px',
      }}
    >
      {scanning ? (
        'Face Scanning...'
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={onStart}
        >
          Start Scanning
        </Button>
      )}
    </div>
  );
};

export default FaceScanner;
