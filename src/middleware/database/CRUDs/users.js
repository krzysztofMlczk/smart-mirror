/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON users COLLECTION */
const { users } = require('../setup');
const userScheme = require('../SCHEMAS/user');

/* CREATE */
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
 * @returns Promise resolving to array of userNames
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
// --------
/* DELETE */
const deleteUser = async () => {
  // TODO: implement body of this function
};

module.exports = {
  /* CREATE */
  createUser,
  /* READ */
  readAllUserNames,
  /* UPDATE */
  /* DELETE */
  deleteUser,
};
