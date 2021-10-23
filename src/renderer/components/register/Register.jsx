import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import RegisterSuccessfulScreen from './registerSuccessScreen/RegisterSuccessfulScreen';
import ScreenOrientationChooser from './ScreenOrientationChooser';
import UserNameForm from './UserNameForm';
import AvatarChooser from './AvatarChooser';
import CustomStepper from './CustomStepper';
import GoogleCredentials from './googleCredentials/GoogleCredentials';
import FaceScanner from './faceScanner/FaceScanner';

function getSteps(displayOrientationChooser) {
  const steps = [
    { title: 'Creating a new account', bottomLabel: 'Username' },
    { title: 'Choose your Avatar', bottomLabel: 'Avatar' },
    { title: 'Sync with Google', bottomLabel: 'Sync with Google' },
    { title: 'One last thing...', bottomLabel: 'Face Recognition' },
  ];
  if (displayOrientationChooser) {
    steps.unshift({
      title: 'Choose screen orientation',
      bottomLabel: 'Screen Orientation',
    });
  }
  return steps;
}

const Register = ({ displayOrientationChooser }) => {
  const [step, setStep] = useState(0);
  const [orientation, setOrientation] = useState(null);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(' ');
  const [avatar, setAvatar] = useState(null);
  const [googleData, setGoogleData] = useState(null);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const steps = getSteps(displayOrientationChooser);

  const next = () => {
    setStep((step + 1) % 5);
  };

  const back = () => {
    setStep((step - 1) % 5);
  };

  const getCurrentStepContent = (stepIndex) => {
    /* eslint-disable react/jsx-key */
    const componentsForSteps = [
      <UserNameForm
        next={next}
        back={back}
        userName={userName}
        saveUserName={setUserName}
        savedError={error}
        saveError={setError}
        isBackAvailable={displayOrientationChooser}
      />,
      <AvatarChooser
        next={next}
        back={back}
        avatar={avatar}
        saveAvatar={setAvatar}
      />,
      <GoogleCredentials
        next={next}
        back={back}
        googleData={googleData}
        saveGoogleData={setGoogleData}
      />,
      <FaceScanner
        back={back}
        userName={userName}
        setSuccess={setRegisterSuccessful}
      />,
    ];
    if (displayOrientationChooser) {
      componentsForSteps.unshift(
        <ScreenOrientationChooser
          next={next}
          orientation={orientation}
          saveOrientation={setOrientation}
        />
      );
    }
    return componentsForSteps[stepIndex];
  };

  return (
    <>
      {registerSuccessful ? (
        <RegisterSuccessfulScreen
          userData={{ userName, avatar, googleData }}
          firstUserRegistration={displayOrientationChooser}
          orientation={orientation}
        />
      ) : (
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
      )}
    </>
  );
};

export default Register;
