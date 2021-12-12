import React, { useContext, useEffect, useState } from 'react';
import UserContext from 'renderer/context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

import MailboxRow from './MailboxRow';

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
  },
});

const MailboxWidget = () => {
  const [emails, setEmails] = useState(null);
  const { userData } = useContext(UserContext);
  const { userId, accessToken } = userData;
  const classes = useStyles();
  const loading = emails === null;
  const noUnreadAvailable = emails?.length === 0;
  const maxMsgs = 5;

  const fetchMessages = () => {
    window.middleware.google.apis.gmail
      .getMessages(userId, accessToken, maxMsgs)
      .then((msgs) => {
        setEmails(msgs);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onMarkedAsRead = (emailId) => {
    // inform gmail api about this event
    window.middleware.google.apis.gmail
      .markAsRead(userId, accessToken, emailId)
      // refetch messages
      .then(() => fetchMessages())
      .catch((err) => console.log(err));
  };

  const getContainerClasses = () => {
    if (loading || noUnreadAvailable) {
      return `${classes.root} ${classes.centerAll}`;
    }
    return `${classes.root}`;
  };

  return (
    <div className={getContainerClasses()}>
      {loading && <CircularProgress color="secondary" />}
      {noUnreadAvailable && (
        <>
          <IconButton onClick={fetchMessages}>
            <ReplayIcon color="secondary" />
          </IconButton>
          <Typography variant="overline">No new messages available</Typography>
        </>
      )}
      {emails &&
        emails.map((email) => (
          <MailboxRow
            key={email.id}
            email={email}
            emailId={email.id}
            onMarkedAsRead={onMarkedAsRead}
          />
        ))}
    </div>
  );
};

export default MailboxWidget;
