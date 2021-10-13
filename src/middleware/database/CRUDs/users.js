/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON users COLLECTION */
const { users } = require('../setup');
const userScheme = require('../SCHEMAS/user');

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

const deleteUser = async () => {
  // TODO: implement body of this function
};

module.exports = {
  createUser,
  deleteUser,
};
