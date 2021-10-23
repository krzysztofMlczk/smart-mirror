import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkmarkCircle: {
    strokeDasharray: 166,
    strokeDashoffset: 166,
    strokeWidth: 2,
    strokeMiterlimit: 10,
    stroke: theme.palette.success.main,
    fill: 'none',
    animation: '$stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
  },

  checkmark: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    display: 'block',
    strokeWidth: 2,
    stroke: theme.palette.secondary.main,
    strokeMiterlimit: 10,
    boxShadow: `inset 0px 0px 0px ${theme.palette.success.main}`,
    animation:
      '$fill .4s ease-in-out .4s forwards, $scale .3s ease-in-out .9s both',
  },

  checkmarkCheck: {
    transformOrigin: '50% 50%',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: '$stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
  },

  '@keyframes stroke': {
    '100%': {
      strokeDashoffset: 0,
    },
  },
  '@keyframes scale': {
    '0%, 100%': {
      transform: 'none',
    },
    '50%': {
      transform: 'scale3d(1.1, 1.1, 1)',
    },
  },
  '@keyframes fill': {
    '100%': {
      boxShadow: `inset 0px 0px 0px 60px ${theme.palette.success.main}`,
    },
  },
}));

const CheckmarkAnimated = () => {
  const classes = useStyles();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      className={classes.checkmark}
    >
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        className={classes.checkmarkCircle}
      />
      <path
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        className={classes.checkmarkCheck}
      />
    </svg>
  );
};

export default CheckmarkAnimated;
