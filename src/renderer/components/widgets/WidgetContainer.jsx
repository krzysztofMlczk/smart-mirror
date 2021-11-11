import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const WidgetContainer = ({ onRemove, editingLayout, children }) => {
  return (
    <div>
      {editingLayout ? (
        <IconButton
          onClick={onRemove}
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          <CloseIcon color="secondary" />
        </IconButton>
      ) : null}
      {children}
    </div>
  );
};

export default WidgetContainer;
