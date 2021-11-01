const GOOGLE_AUTHORIZATION_SERVER_URL = 'https://oauth2.googleapis.com/token';
const keys = require('./keys.json');

/**
 * Fetches new access token with the use of refresh token
 *
 * @param refreshToken - google refresh token
 *
 * @returns Promise resolving to response Object {
 *  access_token: "a0ARrdaM-OOl01IvK2IBKLkCyUgyPPnzVHCVarSUyuIngZ5-kdpElKijt3xpRbjDg-BIgB-tKzVnY9miFufxXjUDnw0UUx23NYh-wKPGah3wmv4RvW3ya-KNgVuPfcC28KFUcRCEaNphQ7cbkAZjwEhr9VX_JJ",
 *  expiresIn: 3599,
 *  id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJiZDJhYzdjNGM1ZWI4YWRjOGVlZmZiYzhmNWEyZGQ2Y2Y3NTQ1ZTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY",
 *  scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
 *  token_type: "Bearer",
 * }
 * returned promise resolves to null when refresh token is not valid / expired
 */
async function refreshAccessToken(refreshToken) {
  console.log('Refreshing access token');
  const response = await fetch(GOOGLE_AUTHORIZATION_SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
      client_id: keys.clientId,
      grant_type: 'refresh_token',
    }),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.json();
  });

  // console.log(response);
  return response;
}

module.exports = refreshAccessToken;
