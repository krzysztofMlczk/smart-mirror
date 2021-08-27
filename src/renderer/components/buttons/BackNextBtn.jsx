import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const BackNextBtn = ({ variant, children, disabled, onClick }) => {
  const text = children;
  const endIcon = variant === 'next' ? <ArrowForwardIosIcon /> : null;
  const startIcon = variant === 'back' ? <ArrowBackIosIcon /> : null;

  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      style={{ marginTop: '40px' }}
    >
      {text}
    </Button>
  );
};

export default BackNextBtn;
