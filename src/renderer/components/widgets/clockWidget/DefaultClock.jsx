import React, { useState } from 'react';
import moment from 'moment';
import Clock from 'react-live-clock';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: 'inherit',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  date: {
    opacity: '0.7',
  },
  hour: {},
  timeZone: {
    opacity: '0.5',
  },
});

const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const getCurrentDate = () =>
  moment(new Date()).format('dddd, MMMM D, YYYY').split(',').join(', ');

const DefaultClock = ({ openOptionsDialog }) => {
  const [timeZone] = useState(() => getCurrentTimeZone());
  const [currentDate, setCurrentDate] = useState(getCurrentDate);
  const classes = useStyles();

  const checkDate = () => {
    const newDate = getCurrentDate();
    if (currentDate !== newDate) setCurrentDate(newDate);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.date}>
        {currentDate}
      </Typography>
      <Typography
        variant="h1"
        className={classes.hour}
        onClick={openOptionsDialog}
      >
        <Clock
          ticking
          format="HH:mm"
          timezone={timeZone}
          onChange={checkDate}
        />
      </Typography>
      <Typography className={classes.timeZone}>{timeZone}</Typography>
    </div>
  );
};

export default DefaultClock;
