import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import BackNextBtn from '../buttons/BackNextBtn';

const UserNameForm = ({ next, userName, saveUserName }) => {
  const [username, setUsername] = useState(userName);
  const [taken, setTaken] = useState(null);
  const [error, setError] = useState(' ');

  const userNameEmpty = username === '';
  const errorOccured = error !== ' ';

  useEffect(() => {
    window.middleware.db.users
      .readAllUserNames()
      .then((userNames) => setTaken(userNames))
      .catch((err) => console.log(err));
  }, [setTaken]);

  const validate = (value) => {
    // returns false if validation fails
    const minLength = 5;
    const maxLength = 37;
    if (value.length < minLength) {
      setError(`Username has to be at least ${minLength} characters long`);
    } else if (value.length > maxLength) {
      setError(`Username has to be less then ${maxLength} characters long`);
    } else {
      setError(' ');
      return true;
    }
    return false;
  };

  const isTaken = (value) => {
    const isUserNameTaken = taken.includes(value);
    if (isUserNameTaken) {
      setError('This username is already taken');
    } else {
      setError(' ');
    }
    return isUserNameTaken;
  };

  const handleChange = (e) => {
    // get rid of additional whitespaces
    // (thanks to this user actually cannot enter whitespaces in username field)
    const value = e.target.value.trim();
    setUsername(value);
    if (errorOccured) {
      // validate dynamically when error already visible
      validate(value);
    }
  };

  const onNext = () => {
    if (validate(username) && !isTaken(username)) {
      saveUserName(username);
      next();
    }
  };

  return (
    <Container maxWidth="xs">
      <TextField
        fullWidth
        label="Username"
        color="secondary"
        error={errorOccured}
        helperText={error}
        autoFocus={false}
        value={username}
        onChange={handleChange}
      />
      <Box textAlign="center" mt={5}>
        <BackNextBtn
          variant="next"
          disabled={userNameEmpty || errorOccured}
          onClick={onNext}
        >
          Next
        </BackNextBtn>
      </Box>
    </Container>
  );
};

export default UserNameForm;
