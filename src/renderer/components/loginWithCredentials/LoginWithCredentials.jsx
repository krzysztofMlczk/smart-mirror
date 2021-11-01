import React, { useState, useCallback, useContext } from 'react';
import UserContext from 'renderer/context/UserContext';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import routes from '../../routes/routes';

import GridContainer from '../layout/GridContainer';
import BackNextBtn from '../buttons/BackNextBtn';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
  info: {
    fontSize: '20px',
    lineHeight: '30px',
    fontStyle: 'italic',
  },
  error: {
    whiteSpace: 'pre-line',
    marginTop: '24px',
    color: 'red',
  },
  btn: {
    marginTop: '24px',
  },
});

const LoginWithCredentials = ({
  expiredRefreshTokenDetected,
  setExpiredRefreshTokenDetected,
}) => {
  const [error, setError] = useState(null);
  const [displayCreateAcc, setDisplayCreateAcc] = useState(false);
  const { setUserData } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const logIn = useCallback(async () => {
    /* eslint-disable @typescript-eslint/naming-convention */
    try {
      // INVOKE GOOGLE SIGN IN FLOW AND COLLECT DATA
      const { tokens, userData } = await window.middleware.google
        .signIn()
        .catch((err) => {
          // console.log(err);
          setError('We need your consent to proceed');
          throw new Error('User denied access to Google scopes');
        });
      const { access_token, expires_in, token_type, id_token, refresh_token } =
        tokens;
      const { id, email, locale, name, picture } = userData;
      // GET USER FROM DB BY GOOGLE ID
      const user = await window.middleware.db.users
        .readUserById(id)
        .catch((err) => {
          console.log(err);
          setError(
            'User with this account was not registered yet.\nCreate an account to proceed'
          );
          setDisplayCreateAcc(true);
        });
      if (user) {
        const { userName, avatar } = user;
        // UPDATE USER'S REFRESH TOKEN IN DB
        await window.middleware.db.users.updateUsersRefreshToken(
          id,
          refresh_token
        );
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
        // go to the main screen when successful
        history.push(routes.MAIN);
      }
    } catch (err) {
      console.log(err);
    }
  }, [history, setUserData, setError]);

  const onBack = () => {
    // Information related to the refreshToken expiration
    // should only be visible when user is redirected to this component
    // automatically when app detects that refresh token expired
    setExpiredRefreshTokenDetected(false); // don't show refreshToken expiration info next time
    history.goBack();
  };

  return (
    <>
      <GridContainer>
        <Typography align="center" variant="h2">
          Sign In with Google
        </Typography>
        <Container maxWidth="sm" className={classes.container}>
          {expiredRefreshTokenDetected ? (
            <Typography
              align="center"
              variant="overline"
              display="block"
              className={classes.info}
            >
              From time to time you have to authenticate with your credentials,
              so we know it is the real you! <br />
              Now is the time ;)
            </Typography>
          ) : (
            <Typography
              align="center"
              variant="overline"
              display="block"
              className={classes.info}
            >
              Click below to start
            </Typography>
          )}
          {displayCreateAcc ? (
            <Link to="/register">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<AddIcon />}
                className={classes.btn}
              >
                Create an account
              </Button>
            </Link>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<AccountCircleOutlinedIcon />}
              className={classes.btn}
              onClick={logIn}
            >
              {error ? 'Try again' : 'Sign In'}
            </Button>
          )}
          <Typography
            align="center"
            variant="overline"
            display="block"
            className={classes.error}
          >
            {error ? `${error}` : null}
          </Typography>
        </Container>
        <Container maxWidth="sm" className={classes.container}>
          <BackNextBtn variant="back" onClick={onBack}>
            Back
          </BackNextBtn>
        </Container>
      </GridContainer>
    </>
  );
};

export default LoginWithCredentials;
