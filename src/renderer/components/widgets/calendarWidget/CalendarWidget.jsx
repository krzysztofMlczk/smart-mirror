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
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  centerAll: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
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
        console.log(data);
        setEvents(data);
      })
      .catch((err) => console.log(err));
  }, [dayShift]);

  return (
    <div className={classes.root}>
      <CalendarNavigator dayShift={dayShift} setDayShift={setDayShift} />
      <div className={loading || noEventsAvailable ? classes.centerAll : null}>
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
