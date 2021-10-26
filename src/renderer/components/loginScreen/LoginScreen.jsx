import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import { Loading } from 'react-loading-dot';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import UserContext from 'renderer/context/UserContext';
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
  const [recognizedUserId, setRecognizedUserId] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  /**
   * This useEffect calls C++ face recognition module
   * to begin recognizing the user flow
   */
  useEffect(() => {
    window.middleware.faceRecognition.recognize(setRecognizedUserId);
  }, []);

  /**
   * This useEffect:
   * - will be called when user has been recognized (recognizedUserId is not null)
   * - reads userName, avatar and refreshToken from DB (users collection)
   * - fetches new accessToken (valid for 1h) using refreshToken from DB
   * - fetches dynamic Google Profile data using just received accessToken
   * - saves all relevant data into react.Context (see UserContext.js for the context object structure)
   */
  useEffect(() => {
    /* eslint-disable @typescript-eslint/naming-convention */
    async function logIn() {
      // GET USER FROM DB BY GOOGLE ID
      const { userName, avatar, googleData } =
        await window.middleware.db.users.readUserById(recognizedUserId);
      // FETCH NEW ACCESS TOKEN
      const { access_token, expires_in, token_type, id_token } =
        await window.middleware.google.refreshAccessToken(
          googleData.tokens.refreshToken
        );
      // FETCH DYNAMIC GOOGLE PROFILE DATA
      const { email, locale, name, picture } =
        await window.middleware.google.fetchGoogleProfile(access_token);
      // SAVE ALL RELEVANT DATA INTO REACT.CONTEXT
      setUserData({
        userName,
        avatar,
        accessToken: access_token,
        expiresIn: expires_in,
        tokenType: token_type,
        idToken: id_token,
        email,
        locale,
        name,
        picture,
      });
    }
    if (recognizedUserId) {
      try {
        logIn();
        history.push('/mainscreen'); // go to main screen on successful recognition
      } catch (err) {
        // TODO: Implement valid error handling
        // There might be a lot of reasons why the logIn function might fail
        // but the most probable is that the refreshToken is not valid anymore
        // which happens when: https://developers.google.com/identity/protocols/oauth2#expiration
        // to obtain new refreshToken user has to authenticate with credentials
        history.push('/login-with-credentials');
      }
    }
  }, [recognizedUserId, setUserData, history]);

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
