import React, { useEffect, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import { Loading } from 'react-loading-dot';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import UserContext from 'renderer/context/UserContext';
import routes from '../../routes/routes';
import Hint from './Hint';
import GridContainer from '../layout/GridContainer';
import ParticleComponent from '../visuals/ParticleComponent';
import BtnsRow from '../buttons/BtnsRow';
import PowerMenu from '../powerMenu/PowerMenu';

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
  powerMenu: {
    display: 'flex',
    position: 'absolute',
    height: '64px',
    paddingRight: '24px',
    top: 0,
    right: 0,
  },
});

const LoginScreen = ({ setExpiredRefreshTokenDetected }) => {
  const [recognizedUserId, setRecognizedUserId] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  // FOR DEBUG: automatic recognition
  // useEffect(() => {
  //   const timer = setTimeout(
  //     () => setRecognizedUserId('107622913887326078037'),
  //     20000
  //   );
  //   return () => clearTimeout(timer);
  // });

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
    if (recognizedUserId) {
      (async function logIn() {
        try {
          // GET USER FROM DB BY GOOGLE ID
          const { userName, avatar, googleData, layout } =
            await window.middleware.db.users.readUserById(recognizedUserId);
          // FETCH NEW ACCESS TOKEN
          const accessTokenData = await window.middleware.google
            .refreshAccessToken(googleData.tokens.refreshToken)
            .catch((err) => {
              // REFRESH TOKEN EXPIRATION HANDLING
              // The most important reason why logIn function might fail
              // trying to refresh an accessToken with expired refreshToken
              // refreshToken might expire in scenarios mentioned here: https://developers.google.com/identity/protocols/oauth2#expiration
              // to obtain new refreshToken user has to authenticate with credentials again
              console.log(err);
              setExpiredRefreshTokenDetected(true);
              history.push(routes.CREDENTIALS_LOGIN);
            });
          if (accessTokenData) {
            const { access_token, expires_in, token_type, id_token } =
              accessTokenData;
            // FETCH DYNAMIC GOOGLE PROFILE DATA
            const { email, locale, name, picture } =
              await window.middleware.google.fetchGoogleProfile(access_token);
            // SAVE ALL RELEVANT DATA INTO REACT.CONTEXT
            console.log(access_token);
            setUserData({
              userId: recognizedUserId,
              userName,
              avatar,
              layout,
              accessToken: access_token,
              expiresIn: expires_in,
              tokenType: token_type,
              idToken: id_token,
              email,
              locale,
              name,
              picture,
            });
            // go to main screen on successful recognition and access_token refreshment
            history.push(routes.MAIN);
          }
        } catch (err) {
          // TODO: Implement valid error handling
          // There might be a lot of reasons why the logIn function might fail (especially connection issues)
          // console.log(err);
        }
      })();
    }
  }, [recognizedUserId, setUserData, history, setExpiredRefreshTokenDetected]);

  return (
    <>
      <div className={classes.powerMenu}>
        <PowerMenu />
      </div>
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
