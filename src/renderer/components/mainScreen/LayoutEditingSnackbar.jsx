import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

/* eslint-disable react/jsx-props-no-spreading */
const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const LayoutEditingSnackbar = ({ isOpen, saveLayout, cancelLayoutEditing }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isOpen}
      message="Save new layout?"
      TransitionComponent={TransitionLeft}
      action={
        <>
          <IconButton color="primary" onClick={saveLayout}>
            <CheckIcon />
          </IconButton>
          <IconButton color="primary" onClick={cancelLayoutEditing}>
            <CloseIcon />
          </IconButton>
        </>
      }
    />
  );
};

export default LayoutEditingSnackbar;
