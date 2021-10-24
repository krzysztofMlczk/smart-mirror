import React from 'react';
import Grid from '@material-ui/core/Grid';

const BtnsRow = ({ children, marginTop }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop }}
    >
      {children}
    </Grid>
  );
};

export default BtnsRow;
