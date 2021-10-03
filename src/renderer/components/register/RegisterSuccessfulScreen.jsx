import React from 'react';

const RegisterSuccessfulScreen = ({ userName }) => {
  return (
    <div style={{ height: '200px', width: '300px', margin: 'auto' }}>
      REGISTERED SUCCESSFULLY <br />
      HELLO {userName}, Good to see you!
    </div>
  );
};

export default RegisterSuccessfulScreen;
