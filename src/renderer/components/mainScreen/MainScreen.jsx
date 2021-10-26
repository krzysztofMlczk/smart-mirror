import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserContext from 'renderer/context/UserContext';

const MainScreen = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      {userData ? (
        <div>
          THIS IS A MAIN APPLICATION SCREEN
          <br />
          only registered users should see this screen
          <br />
          <br />
          DATA FROM CONTEXT:
          <br />
          userName: {userData.userName}
          <br />
          <img
            src={userData.avatar}
            alt="Cannot Display"
            style={{ width: '150px' }}
          />
          <br />
          accessToken: {userData.accessToken}
          <br />
          expiresIn: {userData.expiresIn}
          <br />
          tokenType: {userData.tokenType}
          <br />
          idToken: {userData.idToken}
          <br />
          email: {userData.email}
          <br />
          locale: {userData.locale}
          <br />
          name: {userData.name}
          <br />
          <img
            src={userData.picture}
            alt="Cannot Display"
            style={{ background: 'white' }}
          />
        </div>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </>
  );
};

export default MainScreen;
