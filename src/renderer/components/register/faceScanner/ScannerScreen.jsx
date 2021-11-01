import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  instruction: {
    fontSize: '20px',
    fontStyle: 'italic',
  },
  // helps to set dimensions of webcam video realatively to screen size
  webcamWrapper: {
    height: '70%',
    margin: '0 auto',
    position: 'relative', // relative, so the centeringContainers can be positioned absolutely
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  // centeringContainer helps to overlap overlay circle and CircularProgress to keep them in the same place
  centeringContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // adds blending with background
  blender: {
    boxShadow: 'inset 0px 0px 100px black',
  },
  overlay: {
    borderRadius: '100%',
    // these below properties make it possible to keep aspect ration of the circle
    width: '50%',
    height: 0,
    paddingBottom: '50%',
    // ---------------------
    position: 'relative', // scanner must have position relative to this element
    overflow: 'hidden', // scanner should not display outside the overlay circle
    boxShadow: '0px 0px 0px 1000px rgba(0, 0, 0, 0.7)', // blur background excluding circle in the middle
  },
  // scanner bar class
  scanner: {
    position: 'absolute', // positioned relatively to overlay element
    top: '0',
    left: '0',
    width: '100%',
    height: '5px',
    background: '#18c89b',
    boxShadow: '0 0 70px 20px #18c89b',
    clipPath: 'inset(0)',
    // fade animation has to last 2 times longer than y animation (so it works properly)
    animation:
      '$y 1.2s ease-in-out infinite alternate, $fade 2.4s ease-in-out infinite',
  },
  // scanner movement animation
  '@keyframes y': {
    to: {
      top: '100%',
    },
  },
  // scanner shadow animation
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
  },
  circle: {
    display: 'inline-block',
    width: '15px',
    height: '15px',
    borderRadius: '100%',
    background: '#ff0000',
    margin: '0 6px 2px 0',
    animation: '$blinker 1.2s linear infinite',
  },
  '@keyframes blinker': {
    '50%': { opacity: 0 },
  },
});

const ScannerScreen = ({ userId, setSuccess }) => {
  const [webcamReady, setWebcamReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState([]);
  const overlayRef = useRef(null);
  const classes = useStyles();

  const handleDevices = useCallback(
    (mediaDevices) => {
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
    },
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(handleDevices)
      .catch((err) => console.log(err));
  }, [handleDevices]);

  const onSuccess = useCallback(() => {
    setSuccess(true);
  }, [setSuccess]);

  // FOR DEBUG: successful face registration mock up
  // useEffect(() => {
  //   onSuccess();
  // }, [onSuccess]);

  useEffect(() => {
    window.middleware.faceRecognition.setSuccessCallback(onSuccess);
  }, [onSuccess]);

  useEffect(() => {
    window.middleware.faceRecognition.setProgressCallback(setProgress);
  }, [setProgress]);

  useEffect(() => {
    window.middleware.faceRecognition.register(userId);
  }, [userId]);

  return (
    <>
      <Typography
        variant="overline"
        align="center"
        className={classes.instruction}
      >
        Place your face in the circle
      </Typography>
      <div className={classes.webcamWrapper}>
        {webcamReady ? (
          <>
            <div className={`${classes.centeringContainer} ${classes.blender}`}>
              <div ref={overlayRef} className={classes.overlay}>
                <div className={classes.scanner} />
              </div>
            </div>
            <div className={classes.centeringContainer}>
              <CircularProgress
                variant="determinate"
                color="secondary"
                value={progress}
                thickness={0.6}
                // needs the same size as overlay circle!
                size={`${overlayRef?.current?.clientWidth}px`}
              />
            </div>
            <div className={classes.scannerLabel}>
              <span className={classes.circle} />
              Scanning
            </div>
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
        {devices.length ? (
          <Webcam
            height={webcamReady ? '100%' : '0%'}
            audio={false}
            onUserMedia={() => setWebcamReady(true)}
            videoConstraints={{ deviceId: devices[2].deviceId }}
          />
        ) : null}
      </div>
    </>
  );
};

export default ScannerScreen;
