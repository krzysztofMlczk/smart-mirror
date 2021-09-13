/* This code is based on https://blog.ecliptic.io/google-auth-in-electron-a47b773940ae */
const { ipcRenderer } = require('electron');
const qs = require('qs');

const GOOGLE_CLIENT_ID =
  '492199019764-ppjqtag3697cgcthsa07jletla52b47k.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'com.smartMirror:/oauth2Callback'; // more info on RedirectUris for installed/iOS apps: https://groups.google.com/forum/#!topic/oauth2-dev/P7bY0dThhuQ
const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'; // see: https://developers.google.com/identity/protocols/oauth2/native-app
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'; // see: https://developers.google.com/identity/protocols/oauth2/native-app
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'; // see: https://developers.google.com/identity/protocols/oauth2/native-app

async function signInWithPopup() {
  // TODO: Generate and validate PKCE code_challenge value
  const urlParams = {
    response_type: 'code',
    redirect_uri: GOOGLE_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    scope: 'profile email',
  };
  const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`;
  const code = await ipcRenderer.invoke('google-auth-modal', authUrl);
  return code;
}

async function fetchAccessTokens(code) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  }).then((data) => data.json());

  return response;
}

async function fetchGoogleProfile(accessToken) {
  const response = await fetch(GOOGLE_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json());

  return response;
}

async function googleSignIn() {
  const code = await signInWithPopup(); // authorization code needed to request tokens
  const tokens = await fetchAccessTokens(code);
  const { id, email, name } = await fetchGoogleProfile(tokens.access_token);
  const providedUser = {
    uid: id,
    email,
    displayName: name,
    idToken: tokens.id_token,
  };
  // console.table(providedUser);
  return providedUser;
}

module.exports = googleSignIn;
