import React from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  webcamWrapper: {
    height: '70%',
    margin: '0 auto',
    position: 'relative',
  },
  webcamOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      transformOrigin: 'center',
      transform: 'translate(50%, 25%)',
      width: '50%',
      height: 0,
      paddingBottom: '50%',
      borderRadius: '100%',
      overflow: 'hidden',
      boxShadow: '0px 0px 0px 1000px rgba(0, 0, 0, 0.5)',
    },
  },
  scanner: {
    position: 'absolute',
    top: '200px',
    left: '300px',
    color: 'white',
  },
});

const ScannerScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="overline"
        display="block"
        align="center"
        style={{ fontSize: '20px' }}
      >
        Place your face in the circle
      </Typography>
      <div className={classes.webcamWrapper}>
        <div className={classes.webcamOverlay}>
          <div className={classes.scanner}>Scanner</div>
        </div>
        <Webcam audio={false} height="100%" />
      </div>
      <Typography
        variant="overline"
        display="block"
        align="center"
        style={{ fontSize: '20px' }}
      >
        80%
      </Typography>
    </>
  );
};

export default ScannerScreen;
