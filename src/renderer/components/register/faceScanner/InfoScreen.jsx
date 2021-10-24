import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import BtnsRow from 'renderer/components/buttons/BtnsRow';
import BackNextBtn from '../../buttons/BackNextBtn';
import ParticleComponent from '../../visuals/ParticleComponent';

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
        <BtnsRow marginTop="24px">
          <BackNextBtn variant="back" onClick={back}>
            Back
          </BackNextBtn>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={onStart}
          >
            Start Scanning
          </Button>
        </BtnsRow>
      </Container>
      <ParticleComponent />
    </>
  );
};

export default InfoScreen;
