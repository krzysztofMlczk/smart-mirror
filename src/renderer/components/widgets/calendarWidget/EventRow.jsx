import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.primary.main,
  },
  title: {
    fontSize: 14,
  },
}));

const EventRow = ({ event }) => {
  const { summary, start, end } = event;
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography>{summary}</Typography>
        <Typography className={classes.title} color="textSecondary">
          {start} - {end}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventRow;
