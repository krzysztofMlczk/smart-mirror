import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const BootingScreen = ({ setAppReady }) => {
  // TODO: implement this component - windows booting screen like animation
  useEffect(() => {
    // mechanism responsible for displaying this component for specific period of time
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <CircularProgress color="secondary" />;
};

export default BootingScreen;
