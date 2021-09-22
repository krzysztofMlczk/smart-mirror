import React from 'react';
import StepIcon from '@material-ui/core/StepIcon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const CustomIcon = withStyles({
  root: {
    opacity: 0.5,
    color: '#ffffff!important',
    '& text': {
      fill: '#000000',
    },
    '&$active': {
      opacity: 1,
    },
    '&$completed': {
      opacity: 1,
    },
  },
  active: {},
  completed: {},
})(StepIcon);

const CustomConnector = withStyles({
  active: {
    '& $line': {
      opacity: 1,
    },
  },
  completed: {
    '& $line': {
      opacity: 1,
    },
  },
  line: {
    opacity: 0.5,
    borderColor: '#ffffff',
    borderTopWidth: 2,
  },
})(StepConnector);

const CustomStepper = ({ activeStepIndex, steps }) => {
  return (
    <Container maxWidth="xl">
      <Stepper
        alternativeLabel
        activeStep={activeStepIndex}
        connector={<CustomConnector />}
        style={{ backgroundColor: 'transparent' }}
      >
        {steps.map((step) => (
          <Step key={step.bottomLabel}>
            <StepLabel StepIconComponent={CustomIcon}>
              {step.bottomLabel}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default CustomStepper;
