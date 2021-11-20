import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const WidgetContainer = ({ onRemove, editingLayout, children }) => {
  return (
    <>
      {editingLayout ? (
        <IconButton
          onClick={onRemove}
          style={{ position: 'absolute', top: 0, right: 0, zIndex: '100' }}
        >
          <CloseIcon color="secondary" />
        </IconButton>
      ) : null}
      <div
        style={{
          pointerEvents: editingLayout ? 'none' : 'auto',
          height: 'inherit',
          width: 'inherit',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default WidgetContainer;
