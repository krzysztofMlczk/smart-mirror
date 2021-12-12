import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from 'renderer/context/UserContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import CalendarNavigator from './CalendarNavigator';
import EventRow from './EventRow';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: 'inherit',
  },
  centerAll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  scrollBar: {
    height: '70%', // needs height to make overflow works (navigator takes 30%)
    overflowY: 'auto',
    overflowX: 'hidden',
  },
});

const CalendarWidget = () => {
  const [events, setEvents] = useState(null);
  const [dayShift, setDayShift] = useState(0);
  const { userData } = useContext(UserContext);
  const { accessToken, email } = userData;
  const classes = useStyles();
  const loading = events === null;
  const noEventsAvailable = events?.length === 0;

  useEffect(() => {
    window.middleware.google.apis.calendar
      .getCalendarEvents(accessToken, email, dayShift)
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, [dayShift]);

  return (
    <div className={classes.root}>
      <CalendarNavigator dayShift={dayShift} setDayShift={setDayShift} />
      <div
        className={
          loading || noEventsAvailable ? classes.centerAll : classes.scrollBar
        }
      >
        {loading && <CircularProgress color="secondary" />}
        {noEventsAvailable && (
          <Typography variant="overline">No events</Typography>
        )}
        {events &&
          events.map((event) => <EventRow key={event.id} event={event} />)}
      </div>
    </div>
  );
};

export default CalendarWidget;
