import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridContainer = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: '90vh', margin: '5vh 0' }}
    >
      {children}
    </Grid>
  );
};

export default GridContainer;
