import React from 'react';
import Button from '@material-ui/core/Button';

const Hello = ({ name }) => {
  return (
    <div>
      Hello {name}!
      <Button variant="outlined" color="secondary">
        Lmao
      </Button>
      <Button variant="contained" color="secondary">
        Click Me
      </Button>
    </div>
  );
};

export default Hello;
