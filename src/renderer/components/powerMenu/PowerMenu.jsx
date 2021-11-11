import React, { useState, useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import ReplayIcon from '@material-ui/icons/Replay';

import UserContext from 'renderer/context/UserContext';
import routes from '../../routes/routes';

const StyledMenu = withStyles((theme) => ({
  paper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: `${theme.palette.primary.main}`,
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    /* eslint-disable react/jsx-props-no-spreading */
    {...props}
  />
));

const PowerMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const handleLogout = () => {
    setUserData(null);
    history.push(routes.LOGIN);
  };

  const handleShutDown = () => {
    // TODO: implement script for this and call it via window.middleware
  };

  const handleRestart = () => {
    // TODO: implement script for this and call it via window.middleware
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="secondary" onClick={handleClick}>
        <PowerSettingsNewIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {userData ? (
          <div>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
            <Divider style={{ background: 'white', opacity: '0.3' }} />
          </div>
        ) : null}
        <MenuItem>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Shut down" />
        </MenuItem>
        <Divider style={{ background: 'white', opacity: '0.3' }} />
        <MenuItem>
          <ListItemIcon>
            <ReplayIcon />
          </ListItemIcon>
          <ListItemText primary="Restart" />
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default PowerMenu;
