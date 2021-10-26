const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'; // see: https://developers.google.com/identity/protocols/oauth2/native-app

/**
 * Fetches google profile data using access token
 *
 * @param accessToken - google access token
 *
 * @returns Promise resolving to response Object {
 *  email: "userName@gmail.com",
 *  family_name: "user",
 *  given_name: "name",
 *  id: "22913887326078037",
 *  locale: "en",
 *  name: "User Name",
 *  picture: "https://lh3.googleusercontent.com/a-/AOh14Ggv8M0zrMqzLCmg4pqn_9s_2qXmsJ_Qb1BuHMKm",
 *  verified_email: true,
 * }
 */
async function fetchGoogleProfile(accessToken) {
  console.log('Fetching google profile');
  const response = await fetch(GOOGLE_PROFILE_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((data) => data.json());

  return response;
}

module.exports = fetchGoogleProfile;
