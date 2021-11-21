import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.primary.main,
  },
  title: {
    fontSize: 14,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const getCurrentDate = (dayShift) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const today = new Date();
  const current = new Date();
  current.setDate(today.getDate() + dayShift);

  const date = current.toLocaleDateString('en-US', options).trim().split(',');
  return {
    dayName: date[0],
    monthDay: date[1],
    year: date[2],
  };
};

const CalendarNavigator = ({ dayShift, setDayShift }) => {
  const { dayName, monthDay, year } = getCurrentDate(dayShift);
  const classes = useStyles();

  const dayShiftIncrease = () => {
    setDayShift((prev) => prev + 1);
  };

  const dayShiftDecrease = () => {
    setDayShift((prev) => prev - 1);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.card}>
        <IconButton color="secondary" onClick={dayShiftDecrease}>
          <ArrowBackIosIcon />
        </IconButton>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          onClick={() => setDayShift(0)}
        >
          <Grid item>
            <Typography className={classes.title} color="textSecondary">
              {dayName}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>{monthDay}</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.title} color="textSecondary">
              {year}
            </Typography>
          </Grid>
        </Grid>
        <IconButton color="secondary" onClick={dayShiftIncrease}>
          <ArrowForwardIosIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CalendarNavigator;
