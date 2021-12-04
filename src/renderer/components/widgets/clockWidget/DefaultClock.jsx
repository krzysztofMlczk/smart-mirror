import React, { useState } from 'react';
import moment from 'moment';
import Clock from 'react-live-clock';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const getAlignment = (index) => {
  let alignment;
  switch (index) {
    case 0:
      alignment = 'start';
      break;
    case 1:
      alignment = 'center';
      break;
    case 2:
      alignment = 'flex-end';
      break;
    default:
      alignment = 'center';
  }
  return alignment;
};

const useStyles = (props) =>
  makeStyles({
    root: {
      height: 'inherit',
      width: 'inherit',
      overflowY: 'auto',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: getAlignment(props.horizontalIndex),
    },
    marginLR: {
      margin: '0 5%',
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
  // Intl.DateTimeFormat().resolvedOptions().timeZone; -> this returns system's timezone
  moment.tz.guess(); // this estimates actual user timezone

const getCurrentDate = () =>
  moment(new Date()).format('dddd, MMMM D, YYYY').split(',').join(', ');

const DefaultClock = ({ horizontalIndex, openOptionsDialog }) => {
  const [timeZone] = useState(() => getCurrentTimeZone());
  const [currentDate, setCurrentDate] = useState(getCurrentDate);
  const classes = useStyles({ horizontalIndex })();

  const checkDate = () => {
    const newDate = getCurrentDate();
    if (currentDate !== newDate) setCurrentDate(newDate);
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        className={`${classes.date} ${classes.marginLR}`}
      >
        {currentDate}
      </Typography>
      <Typography
        variant="h1"
        className={`${classes.hour} ${classes.marginLR}`}
        onClick={openOptionsDialog}
      >
        <Clock
          ticking
          format="HH:mm"
          timezone={timeZone}
          onChange={checkDate}
        />
      </Typography>
      <Typography className={`${classes.timeZone} ${classes.marginLR}`}>
        {timeZone}
      </Typography>
    </div>
  );
};

export default DefaultClock;
