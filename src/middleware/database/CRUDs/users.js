/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON users COLLECTION */
const { users } = require('../setup');
const userScheme = require('../SCHEMAS/user');

/* CREATE */
/**
 *
 * @param userData = {
 *  "userName": "Usrnm",
 *  "avatar": "https://avatars.dicebear.com/api/bottts/usrnm.svg",
 *  "googleData": {
 *    "tokens": {
 *      "access_token": "a0ARrdaM-OOl01IvK2IBKLkCyUgyPPnzVHCVarSUyuIngZ5-kdpElKijt3xpRbjDg-BIgB-tKzVnY9miFufxXjUDnw0UUx23NYh-wKPGah3wmv4RvW3ya-KNgVuPfcC28KFUcRCEaNphQ7cbkAZjwEhr9VX_JJ",
 *      "expires_in": 3599,
 *      "id_token": "OiJSUzI1NiIsImtpZCI6ImFkZDhjMGVlNjIzOTU0NGFmNTNmOTM3MTJhNTdiMmUyNmY5NDMzNTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTIxOTkwMTk3NjQtcHBqcXRhZzM2OTdjZ2N0aHNhMDdqbGV0bGE1MmI0N2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTIxOTkwMTk3NjQtcHBqcXRhZzM2OTdjZ2N0aHNhMDdqbGV0bGE1MmI0N2suYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc2MjI5MTM4ODczMjYwNzgwMzciLCJlbWFpbCI6InNtYXJ0Lm1pcnJvci5kZXZlbG9wZXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJPWjVsejdCM0tfZHlNX1JPSV9nSVFnIiwibmFtZSI6IlNtYXJ0IE1pcnJvciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ3Y4TTB6ck1xekxDbWc0cHFuXzlzXzJxWG1zSl9RYjFCdUhNS209czk2LWMiLCJnaXZlbl9uYW1lIjoiU21hcnQiLCJmYW1pbHlfbmFtZSI6Ik1pcnJvciIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjM0MTU4NjQ4LCJleHAiOjE2MzQxNjIyNDh9.gaKbA0gxgE-57Y-MJUb3mGX7y8mBn-Z5XaugGAjChCnwuZoI2QClRofVKtTVy27gT1i04-eaIgWXZ486ZsGFD3MP1oC29gTpAPnpYFDq288oJla89CXFdEYc7Fw8Gtt-lzp31Uee2o6jihV6ETQNjmZoTz81wljswsUfaWM-pXdZrsVwHcryAYG1MIeJjCScxNnJ3N-TE9ea3OryGllGXNfcwbHMbBEg9EOiRS87Rqwdy15LD2dwtdoJVzfsVuxOAW2GD6JJBgw-futFWKcygSMnvUxxyRYzckZ9bFs4ezubtRIyB1cl8PhetGl5cQENU3tRiwm27ZdSue763zzfPQ",
 *      "refresh_token": "0ao8wGDPQJNCgYIARAAGAwSNwF-L9IrrXGnnNiElATXOfzV0mX3nDEMBfkJevlxKXcmon8IyWrm3llTt2ryP2R9IRyE0kPG5WA",
 *      "scope": "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
 *      "token_type": "Bearer"
 *    },
 *    "userData": {
 *      "email": "usrnm@gmail.com",
 *      "family_name": "Usr",
 *      "given_name": "Nm",
 *      "id": "107622913887326078037",
 *      "locale": "en",
 *      "name": "Usr Nm",
 *      "picture": "https://lh3.googleusercontent.com/a-/AOh14Ggv8M0zrMqzLCmg4pqn_9s_2qXmsJ_Qb1BuHMKm=",
 *      "verified_email": true
 *    }
 *  }
 * }
 *
 * @returns Promise resolving to the object of newly created user {
 *  "userName": "Usrnm",
 *  "avatar": "https://avatars.dicebear.com/api/bottts/usrnm.svg",
 *  "googleData": {
 *    "tokens": {
 *      "refreshToken": "0ao8wGDPQJNCgYIARAAGAwSNwF-L9IrrXGnnNiElATXOfzV0mX3nDEMBfkJevlxKXcmon8IyWrm3llTt2ryP2R9IRyE0kPG5WA",
 *      "scope": "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
 *      "tokenType": "Bearer"
 *    },
 *    "userData": {
 *      "id": "107622913887326078037",
 *      "verifiedEmail": true
 *    }
 *  },
 *  ...REST (default values for widget settings etc.)
 * }
 */
const createUser = async (userData) => {
  let newUser;
  try {
    newUser = await users.insert(userScheme(userData));
    console.log('User Created');
  } catch (err) {
    // TODO: add error handling for CRUD operations
    console.log(err);
  }
  return newUser;
};

/* READ */
/**
 *
 * @param userId - googleId of a user
 *
 * @returns Promise resolving to the user document object {
 *  "userName": "Usrnm",
 *  "avatar": "https://avatars.dicebear.com/api/bottts/usrnm.svg",
 *  "googleData": {
 *    "tokens": {
 *      "refreshToken": "0ao8wGDPQJNCgYIARAAGAwSNwF-L9IrrXGnnNiElATXOfzV0mX3nDEMBfkJevlxKXcmon8IyWrm3llTt2ryP2R9IRyE0kPG5WA",
 *      "scope": "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
 *      "tokenType": "Bearer"
 *    },
 *    "userData": {
 *      "id": "107622913887326078037",
 *      "verifiedEmail": true
 *    }
 *  },
 *  ...REST (default values for widget settings)
 * }
 */
const readUserById = async (userId) => {
  const fetchedUser = await users.findOne({ 'googleData.userData.id': userId });
  if (fetchedUser === null) {
    throw new Error('Could not find user by id');
  }
  return fetchedUser;
};
/**
 *
 * @returns Promise resolving to an array of userNames
 */
const readAllUserNames = async () => {
  let userNames;
  try {
    userNames = await (
      await users.find({}, { userName: 1, _id: 0 })
    ).map((user) => user.userName);
  } catch (err) {
    // TODO: add error handling for CRUD operations
    console.log(err);
  }
  return userNames;
};

/* UPDATE */
const updateUsersRefreshToken = async (userId, newRefreshToken) => {
  try {
    await users.update(
      { 'googleData.userData.id': userId }, // specify which document to update
      { $set: { 'googleData.tokens.refreshToken': newRefreshToken } } // specify field and value to update
    );
  } catch (err) {
    console.log(err);
  }
};

/* DELETE */
const deleteUser = async () => {
  // TODO: implement body of this function
};

module.exports = {
  /* CREATE */
  createUser,
  /* READ */
  readUserById,
  readAllUserNames,
  /* UPDATE */
  updateUsersRefreshToken,
  /* DELETE */
  deleteUser,
};
