import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DefaultClock from './DefaultClock';
import Timer from './Timer';
import OptionsDialog from './OptionsDialog';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: 'inherit',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
  },
});

const ClockWidget = () => {
  const [optionsDialogOpen, setOptionsDialogOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('defultClock');
  const classes = useStyles();

  const handleClickOpen = () => {
    setOptionsDialogOpen(true);
  };

  const handleClose = (value) => {
    setOptionsDialogOpen(false);
    setSelectedMode(value);
  };

  const getCurrentComponent = (mode) => {
    let current;
    switch (mode) {
      case 'defaultClock':
        current = <DefaultClock openOptionsDialog={handleClickOpen} />;
        break;
      case 'timer':
        current = <Timer openOptionsDialog={handleClickOpen} />;
        break;
      default:
        current = <DefaultClock openOptionsDialog={handleClickOpen} />;
    }
    return current;
  };

  return (
    <div className={classes.root}>
      <OptionsDialog
        selectedValue={selectedMode}
        open={optionsDialogOpen}
        onClose={handleClose}
      />
      {getCurrentComponent(selectedMode)}
    </div>
  );
};

export default ClockWidget;
