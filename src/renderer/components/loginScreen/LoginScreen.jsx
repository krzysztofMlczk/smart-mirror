import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import { Loading } from 'react-loading-dot';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import Hint from './Hint';
import GridContainer from '../layout/GridContainer';
import ParticleComponent from '../visuals/ParticleComponent';
import BtnsRow from '../buttons/BtnsRow';

const useStyles = makeStyles({
  bottomLabel: {
    fontSize: '24px',
    fontStyle: 'italic',
  },
  btn: {
    width: '240px',
  },
  separatorText: {
    fontSize: '17px',
    fontStyle: 'italic',
  },
});

const LoginScreen = () => {
  const [recognized, setRecognized] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.middleware.faceRecognition.recognize(setRecognized);
  }, []);

  useEffect(() => {
    if (recognized) {
      // TODO: get all user data from NeDB
      // TODO: save all user data into react.context
      // go to mainScreen
      history.push('/mainscreen');
    }
  }, [recognized, history]);

  return (
    <>
      <GridContainer>
        <Typography align="center" variant="h2">
          Face Recognition
        </Typography>
        <div>
          <Loading background="rgb(255,255,255)" duration="0.8s" />
        </div>
        <Hint timeout={7} />
        <Container maxWidth="sm">
          <Typography
            align="center"
            variant="overline"
            display="block"
            className={classes.bottomLabel}
          >
            You can always:
          </Typography>
          <BtnsRow marginTop="50px">
            <Link to="/register">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<AddIcon />}
                className={classes.btn}
              >
                Add new user
              </Button>
            </Link>
            <Typography
              align="center"
              variant="overline"
              display="block"
              className={classes.separatorText}
            >
              or
            </Typography>
            <Link to="/login-with-credentials">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                className={classes.btn}
              >
                LogIn with credentials
              </Button>
            </Link>
          </BtnsRow>
        </Container>
      </GridContainer>
      <ParticleComponent />
    </>
  );
};

export default LoginScreen;
