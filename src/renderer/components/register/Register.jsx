import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ScreenOrientationChooser from './ScreenOrientationChooser';
import UserNameForm from './UserNameForm';
import AvatarChooser from './AvatarChooser';
import CustomStepper from './CustomStepper';
import GoogleCredentials from './googleCredentials/GoogleCredentials';
import FaceScanner from './FaceScanner';

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
  const [step, setStep] = useState(4);
  const [orientation, setOrientation] = useState(null);
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const steps = getSteps();

  const next = () => {
    setStep((step + 1) % 5);
  };

  const back = () => {
    setStep((step - 1) % 5);
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
        return (
          <GoogleCredentials
            next={next}
            back={back}
            user={user}
            saveUser={setUser}
          />
        );
      case 4:
        return <FaceScanner />;
      default:
        return <UserNameForm next={next} />;
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: '90vh', margin: '5vh 0' }}
    >
      <Typography align="center" variant="h2">
        {steps[step].title}
      </Typography>
      {getCurrentStepContent(step)}
      <CustomStepper activeStepIndex={step} steps={steps} />
    </Grid>
  );
};

export default Register;
