const User = require('../schemas/user');

exports.createAndSaveUser = async(username) => {
  const newUser = new User({username: username});

  try {
    const savedUser = await newUser.save();

    return {username: savedUser.username, _id: savedUser._id};
  } catch (err) {
    return {error: err};
  }
}

exports.findAllUsers = async() => {
  try {
    const allUsers = await User.find({});

    return allUsers.map((user) => ({username: user.username, _id: user._id}));
  } catch (err) {
    return {error: err};
  }
}

exports.findUser = async(userId) => {
  try {
    return await User.findById(userId);
  } catch (err) {
    return {error: err};
  }
}
