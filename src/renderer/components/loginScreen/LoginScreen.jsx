import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const LoginScreen = () => {
  return (
    <div>
      THIS IS A LOGIN SCREEN (A DEFAULT SCREEN YOU CAN SEE AFTER WAKE UP)
      <Link to="/register">
        <Button variant="outlined" color="secondary" size="large">
          Click here to register
        </Button>
      </Link>
    </div>
  );
};

export default LoginScreen;
