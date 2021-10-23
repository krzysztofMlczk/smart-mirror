import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BackNextBtn from '../../buttons/BackNextBtn';
import ParticleComponent from './ParticleComponent';

const InfoScreen = ({ back, onStart }) => {
  return (
    <>
      <Container maxWidth="md" style={{ textAlign: 'center' }}>
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: '20px' }}
        >
          We need to scan your face.
        </Typography>
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: '24px', fontStyle: 'italic' }}
        >
          Please stand still in front of the mirror.
        </Typography>
        <Typography
          variant="overline"
          display="block"
          style={{ fontSize: '20px' }}
        >
          Tap the button to start.
        </Typography>
      </Container>
      <Container maxWidth="xs">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: '24px' }}
        >
          <BackNextBtn variant="back" onClick={back}>
            Back
          </BackNextBtn>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            // startIcon={<AccountCircleOutlinedIcon />}
            onClick={onStart}
          >
            Start Scanning
          </Button>
        </Grid>
      </Container>
      <ParticleComponent />
    </>
  );
};

export default InfoScreen;
