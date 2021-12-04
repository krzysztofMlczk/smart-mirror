/* This code is based on https://blog.ecliptic.io/google-auth-in-electron-a47b773940ae */
/* Official google instructions are here: https://developers.google.com/identity/protocols/oauth2/native-app#step-2:-send-a-request-to-googles-oauth-2.0-server */
const { ipcRenderer } = require('electron');
const qs = require('qs');
const keys = require('./keys.json');
const fetchGoogleProfile = require('./profile');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'; // see: https://developers.google.com/identity/protocols/oauth2/native-app
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'; // see: https://developers.google.com/identity/protocols/oauth2/native-app

async function signInWithPopup() {
  // TODO: Generate and validate PKCE code_challenge value
  const urlParams = {
    response_type: 'code',
    redirect_uri: keys.redirectUri,
    client_id: keys.clientId,
    scope:
      'email https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar',
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
      client_id: keys.clientId,
      redirect_uri: keys.redirectUri,
      grant_type: 'authorization_code',
    }),
  }).then((data) => data.json());

  return response;
}

/**
 *
 * @returns {
 *  tokens: {
 *    access_token: "a0ARrdaM-t-pmHJGn_K_iN7WCOzmQRF8U9lSlTZUeQadEqv52OwBwy8gg7uElT1P-bHEDpcFUav0wyoWGK7xgmLlZ9ceMQcTTNRgsQ1we0YaRKAWngwG2A8XO11H3SrT7gDOPTePORsNCaNoDq42FM6ZTyjxvx",
 *    expires_in: 3599,
 *    id_token: "iOiJSUzI1NiIsImtpZCI6ImFkZDhjMGVlNjIzOTU0NGFmNTNmOTM3MTJhNTdiMmUyNmY5NDMzNTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTIxOTkwMTk3NjQtcHBqcXRhZzM2OTdjZ2N0aHNhMDdqbGV0bGE1MmI0N2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTIxOTkwMTk3NjQtcHBqcXRhZzM2OTdjZ2N0aHNhMDdqbGV0bGE1MmI0N2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc2MjI5MTM4ODczMjYwNzgwMzciLCJlbWFpbCI6InNtYXJ0Lm1pcnJvci5kZXZlbG9wZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJOdEViZ3U4eFNpMXZZNTZudUNhempnIiwibmFtZSI6IlNtYXJ0IE1pcnJvciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3Y4TTB6ck1xekxDbWc0cHFuXzlzXzJxWG1zSl9RYjFCdUhNS209czk2LWMiLCJnaXZlbl9uYW1lIjoiU21hcnQiLCJmYW1pbHlfbmFtZSI6Ik1pcnJvciIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjM0MTU3NDEzLCJleHAiOjE2MzQxNjEwMTN9.g60iM_4YTghPvZ84dyWRseNM-ZRhWsSJmG4TkcBNIhadjCUKyJIKEU4N0_brf4UhuxHXbkzELywlW65nK-2RSasNAnvQ9Men9U6--6tSVLsdXIuBa58Cyn5OJ6vuDpUq58Xp_svFMXwepAvjOaE5ScECpbO9N_F5Rj_tki1GVnv0CKqJVvUX4sFAOYSwVDTQo2N7eVG37wPA70ONCz5LZ91GzAPwwLr-1RWeNOsVhSCyJb40Exxsqay7dRSo4sjOHUiKKy_-gPyqIk_vyGLxXA59WNm9gLmEC27N0wnYvc59OGjzOBymiagTkxh-y1TpU13kmJ9L9PcH1_nPV5fEBw",
 *    refresh_token: "8biCQL01D_QCgYIARAAGAwSNwF-L9IrBwrNr4ZhCTWZlc-_9ZUEnxhJqgoO0wQ5Nr87PEyUy46k3FO_nL_nRAhQ9bRc2RuPX0g",
 *    scope: "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
 *    token_type: "Bearer",
 *  },
 *  userData: {
 *    email: "userName@gmail.com",
 *    family_name: "user",
 *    given_name: "name",
 *    id: "22913887326078037",
 *    locale: "en",
 *    name: "User Name",
 *    picture: "https://lh3.googleusercontent.com/a-/AOh14Ggv8M0zrMqzLCmg4pqn_9s_2qXmsJ_Qb1BuHMKm",
 *    verified_email: true,
 *  }
 * }
 */
async function signIn() {
  const code = await signInWithPopup(); // authorization code needed to request tokens
  const tokens = await fetchAccessTokens(code);
  const userData = await fetchGoogleProfile(tokens.access_token);
  const result = { userData, tokens };
  // console.log(result);
  return result;
}

module.exports = signIn;
