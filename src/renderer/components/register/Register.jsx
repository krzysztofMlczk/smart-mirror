import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ScreenOrientationChooser from './ScreenOrientationChooser';
import UserNameForm from './UserNameForm';
import AvatarChooser from './AvatarChooser';
import CustomStepper from './CustomStepper';
import GoogleCredentials from './GoogleCredentials';

function getSteps() {
  return [
    { title: 'Choose screen orientation', bottomLabel: 'Screen Orientation' },
    { title: 'Creating a new account', bottomLabel: 'Username' },
    { title: 'Choose your Avatar', bottomLabel: 'Avatar' },
    { title: 'Sync with Google', bottomLabel: 'Sync with Google' },
    { title: 'One last thing...', bottomLabel: 'Face Recognition' },
  ];
}

const Register = () => {
  // const [state, setState] = useState({
  //   step: 2,
  //   username: '',
  //   avatar: '',
  //   faceScan: '',
  // });
  const [step, setStep] = useState(0);
  const [orientation, setOrientation] = useState(null);
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const steps = getSteps();

  const next = () => {
    setStep((step + 1) % 4);
  };

  const back = () => {
    setStep((step - 1) % 4);
  };

  // WARNING: need to implement logic related to when ScreenOrientationChooser
  // should and when should not be displayed!!!
  const getCurrentStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <ScreenOrientationChooser
            next={next}
            orientation={orientation}
            saveOrientation={setOrientation}
          />
        );
      case 1:
        return (
          <UserNameForm
            next={next}
            userName={userName}
            saveUserName={setUserName}
          />
        );
      case 2:
        return (
          <AvatarChooser
            next={next}
            back={back}
            avatar={avatar}
            saveAvatar={setAvatar}
          />
        );
      case 3:
        return <GoogleCredentials />;
      default:
        return <UserNameForm next={next} />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        style={{ height: '100vh' }}
      >
        <Typography align="center" variant="h2">
          {steps[step].title}
        </Typography>
        {getCurrentStepContent(step)}
        <CustomStepper activeStepIndex={step} steps={steps} />
      </Grid>
    </Container>
  );
};

export default Register;
