import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimerIcon from '@material-ui/icons/Timer';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const OptionsDialog = ({ onClose, selectedValue, open }) => {
  // const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog disablePortal onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Select clock mode</DialogTitle>
      <List>
        <ListItem button onClick={() => handleListItemClick('defaultClock')}>
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="clock" />
        </ListItem>
        <ListItem button onClick={() => handleListItemClick('timer')}>
          <ListItemIcon>
            <TimerIcon />
          </ListItemIcon>
          <ListItemText primary="timer" />
        </ListItem>

        {/* <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem> */}
      </List>
    </Dialog>
  );
};

export default OptionsDialog;
