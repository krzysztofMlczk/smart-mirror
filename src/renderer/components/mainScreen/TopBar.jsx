import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import { FaGoogle } from 'react-icons/fa';
import { RiNetflixFill } from 'react-icons/ri';

import PowerMenu from '../powerMenu/PowerMenu';
import ToolBox from './ToolBox';

const TopBar = ({
  toggleDrawer,
  editingLayout,
  toolBoxDisabled,
  toolBoxItems,
  onTakeItem,
}) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <ToolBox
          visible={editingLayout}
          disabled={toolBoxDisabled}
          items={toolBoxItems}
          onTakeItem={onTakeItem}
        />
        <div style={{ flexGrow: '1' }} />
        <IconButton
          onClick={() => window.middleware.web.openBrowser('netflix')}
        >
          <RiNetflixFill />
        </IconButton>
        <IconButton onClick={() => window.middleware.web.openBrowser('google')}>
          <FaGoogle />
        </IconButton>
        <IconButton onClick={toggleDrawer}>
          <SettingsIcon color="secondary" />
        </IconButton>
        <PowerMenu />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
