import React from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  webcamWrapper: {
    height: '70%',
    margin: '0 auto',
    position: 'relative',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  overlay: {
    transformOrigin: 'center',
    transform: 'translate(50%, 25%)',
    // these below properties make it possible to keep aspect ration of the circle
    width: '50%',
    height: 0,
    paddingBottom: '50%',
    // ---------------------
    borderRadius: '100%',
    overflow: 'hidden',
    boxShadow: '0px 0px 0px 1000px rgba(0, 0, 0, 0.5)',
  },
  scanner: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '5px',
    background: '#18c89b',
    boxShadow: '0 0 70px 20px #18c89b',
    clipPath: 'inset(0)',
    // fade animation has to last 2 times longer than y animation (so it works)
    animation:
      '$y 1.2s ease-in-out infinite alternate, $fade 2.4s ease-in-out infinite',
  },
  '@keyframes y': {
    to: {
      top: '100%',
    },
  },
  '@keyframes fade': {
    '33%': {
      clipPath: 'inset(-100px 0 0 0)',
    },
    '50%': {
      clipPath: 'inset(0 0 0 0)',
    },
    '83%': {
      clipPath: 'inset(0 0 -100px 0)',
    },
  },
  scannerLabel: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: '25px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#18c89b',
    // animation: '$blinker 1s linear infinite',
  },
  circle: {
    display: 'inline-block',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    background: '#18c89b',
    margin: '0 6px 2px 0',
    animation: '$blinker 1.2s linear infinite',
  },
  '@keyframes blinker': {
    '50%': { opacity: 0 },
  },
  scanningProgress: {
    position: 'absolute',
    top: '25%',
    left: '18.75%',
    color: '#18c89b',
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
        <div className={classes.overlayContainer}>
          <div className={classes.overlay}>
            <div className={classes.scanner} />
          </div>
          <div className={classes.scannerLabel}>
            <span className={classes.circle} />
            Scanning
          </div>
          <CircularProgress
            variant="determinate"
            size="50%"
            thickness="0.5"
            value={50}
            className={classes.scanningProgress}
          />
        </div>
        <Webcam height="100%" audio={false} />
      </div>
    </>
  );
};

export default ScannerScreen;
