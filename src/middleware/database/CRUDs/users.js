/* HERE ARE FUNCTIONS TO PERFORM CRUD OPERATIONS ON users COLLECTION */
const { users } = require('../setup');

const createUser = async () => {
  // TODO: implement body of this function
  const newUser = await users.insert({
    userName: 'RoyDonson',
    email: 'roy_donson@gmail.com',
    avatarId: 1,
    faceRecognitionData: '3fs45sedf355wsfwr2',
  });
  return newUser;
};

const deleteUser = async () => {
  // TODO: implement body of this function
};

module.exports = {
  createUser,
  deleteUser,
};
