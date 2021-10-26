import React, { useState } from 'react';

import InfoScreen from './InfoScreen';
import ScannerScreen from './ScannerScreen';

const FaceScanner = ({ back, userId, setSuccess }) => {
  const [scanning, setScanning] = useState(false);

  const onStart = () => {
    setScanning(true);
    window.middleware.faceRecognition.register(userId);
  };

  return (
    <>
      {scanning ? (
        <ScannerScreen userId={userId} setSuccess={setSuccess} />
      ) : (
        <InfoScreen back={back} onStart={onStart} />
      )}
    </>
  );
};

export default FaceScanner;
