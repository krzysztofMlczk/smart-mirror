import React, { useState } from 'react';

import InfoScreen from './InfoScreen';
import ScannerScreen from './ScannerScreen';

const FaceScanner = ({ back, userName, setSuccess }) => {
  const [scanning, setScanning] = useState(false);

  const onStart = () => {
    setScanning(true);
    window.middleware.faceRecognition.register(userName);
  };

  return (
    <>
      {scanning ? (
        <ScannerScreen userName={userName} setSuccess={setSuccess} />
      ) : (
        <InfoScreen back={back} onStart={onStart} />
      )}
    </>
  );
};

export default FaceScanner;
