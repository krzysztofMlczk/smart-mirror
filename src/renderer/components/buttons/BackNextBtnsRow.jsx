import React from 'react';
import Grid from '@material-ui/core/Grid';

import BackNextBtn from './BackNextBtn';

const BackNextBtnsRow = ({ marginTop, onBack, isNextDisabled, onNext }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ marginTop }}
    >
      <BackNextBtn variant="back" onClick={onBack}>
        Back
      </BackNextBtn>
      <BackNextBtn variant="next" disabled={isNextDisabled} onClick={onNext}>
        Next
      </BackNextBtn>
    </Grid>
  );
};

export default BackNextBtnsRow;
