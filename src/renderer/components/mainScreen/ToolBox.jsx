import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import ToolBoxItem from './ToolBoxItem';

const ToolBox = ({ visible, disabled, items, onTakeItem }) => {
  return (
    <Slide direction="right" in={visible} mountOnEnter unmountOnExit>
      <Grid
        container
        alignItems="center"
        spacing={2}
        style={{ pointerEvents: disabled ? 'none' : 'auto' }}
      >
        <Grid item>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            style={{ opacity: disabled ? 0.3 : 1 }}
          >
            Available widgets:
          </Typography>
        </Grid>
        {items.map((item) => (
          <Grid item key={item}>
            <ToolBoxItem
              item={item}
              onTakeItem={onTakeItem}
              disabled={disabled}
            />
          </Grid>
        ))}
      </Grid>
    </Slide>
  );
};

export default ToolBox;
