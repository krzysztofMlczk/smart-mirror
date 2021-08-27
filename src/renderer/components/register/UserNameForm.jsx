import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import BackNextBtn from '../buttons/BackNextBtn';

const UserNameForm = ({ next }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(' ');

  const userNameEmpty = username === '';
  const errorOccured = error !== ' ';

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
    if (validate(username)) {
      next();
    }
  };

  return (
    <Container maxWidth="xs">
      <Box textAlign="center">
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
