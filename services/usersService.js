const User = require("../models/usersModel");

const addUser = ({ login, password, email, subscription, token = null }) => {
  try {
    return User.create({ login, password, email, subscription, token });
  } catch (error) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (err) {
    return false;
  }
};

const getUserByLogin = ({ login }) => {
  try {
    return User.findOne({ login });
  } catch (err) {
    return false;
  }
};

const getUserById = ({ _id }) => {
  try {
    return User.findById({ _id });
  } catch (error) {
    return false;
  }
};

const updateUserToken = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (error) {
    return false;
  }
};

const updateUserRole = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (error) {
    return false;
  }
};

const updateUser = ({ _id, body }) => {
  console.log(body);
  try {
    return User.findOneAndUpdate(
      { _id },
      { $set: body },
      {
        new: true,
      }
    );
  } catch (error) {
    return false;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  getUserByLogin,
  updateUserToken,
  updateUserRole,
  updateUser,
};
