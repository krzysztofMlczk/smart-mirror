import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import useWindowDimensions from 'renderer/hooks/useWindowDimensions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = (props) =>
  makeStyles((theme) => ({
    accordion: {
      background: theme.palette.primary.main,
    },
    grid: {
      maxWidth: `${props.width / 3.5}px`,
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      opacity: 0.9,
    },
    body: {
      overflowWrap: 'break-word',
      width: '100%',
      whiteSpace: 'pre-wrap',
    },
  }));

const MailboxRow = ({ email, emailId, onMarkedAsRead }) => {
  const [markedAsRead, setMarkedAsRead] = useState(false);
  const { from, date, snipet, body } = email;
  const { width } = useWindowDimensions();
  const classes = useStyles({ width })();

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      onMarkedAsRead(emailId);
    }
    setMarkedAsRead(event.target.checked);
  };

  const getSenderInitials = () => {
    const splitted = from.split(' ');
    return splitted.length > 2 ? `${splitted[0][0]}${splitted[1][0]}` : from[0];
  };

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          spacing={2}
          className={classes.grid}
        >
          <Grid item>
            <Avatar className={classes.avatar}>{getSenderInitials()}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{snipet}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="overline" display="inline">
              Mark as read:
            </Typography>
            <Checkbox checked={markedAsRead} onChange={handleCheckbox} />
          </Grid>
          <Grid item>
            <Typography>
              <span style={{ fontStyle: 'italic' }}>From</span>: {from}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <span style={{ fontStyle: 'italic' }}>Date</span>: {date}
            </Typography>
          </Grid>
          <Grid item className={classes.body}>
            <Typography>{body}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default MailboxRow;
