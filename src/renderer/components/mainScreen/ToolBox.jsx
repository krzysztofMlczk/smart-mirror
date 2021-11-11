import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import ToolBoxItem from './ToolBoxItem';

const ToolBox = ({ visible, items, onTakeItem }) => {
  return (
    <Slide direction="right" in={visible} mountOnEnter unmountOnExit>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="button" display="block" gutterBottom>
            Available widgets:
          </Typography>
        </Grid>
        {items.map((item) => (
          <Grid item key={item.i}>
            <ToolBoxItem item={item} onTakeItem={onTakeItem} />
          </Grid>
        ))}
      </Grid>
    </Slide>
  );
};

export default ToolBox;
