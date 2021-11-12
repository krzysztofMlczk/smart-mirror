import React from 'react';
import { widgetIdToIcon } from '../widgets/widgetIdMap';

const ToolBoxItem = ({ onTakeItem, item, disabled }) => {
  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    <div
      style={{
        opacity: disabled ? 0.3 : 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: '40px',
        height: '40px',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid white',
      }}
      onClick={onTakeItem.bind(undefined, item)}
    >
      {React.createElement(widgetIdToIcon[item])}
    </div>
  );
};

export default ToolBoxItem;
