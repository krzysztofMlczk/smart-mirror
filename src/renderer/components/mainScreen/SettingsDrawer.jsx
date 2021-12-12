import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: `${theme.palette.primary.main}`,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    width: '270px',
  },
}));

const SettingsDrawer = ({
  drawerOpen,
  toggle,
  startLayoutEditing,
  restoreDefaultLayout,
}) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggle}
      classes={{ paper: classes.paper }}
    >
      <List>
        <ListItem button onClick={startLayoutEditing}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Layout" />
        </ListItem>
        <Divider />
        <ListItem button onClick={restoreDefaultLayout}>
          <ListItemIcon>
            <SettingsBackupRestoreIcon />
          </ListItemIcon>
          <ListItemText primary="Restore default layout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SettingsDrawer;
