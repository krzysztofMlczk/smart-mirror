import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  paper: {
    background: `${theme.palette.primary.main}`,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    width: '270px',
  },
}));

const SettingsDrawer = ({ drawerOpen, startLayoutEditing }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={drawerOpen} classes={{ paper: classes.paper }}>
      <List>
        <ListItem button onClick={startLayoutEditing}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Layout" />
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
};

export default SettingsDrawer;
