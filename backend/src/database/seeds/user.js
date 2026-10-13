const bcrypt = require('bcryptjs');
const User = require('../models/user');

const seedUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'Test@1234',
};

const up = async () => {
  const existingUser = await User.findOne({
    where: { username: seedUser.username },
  });

  if (existingUser) {
    return existingUser;
  }

  const hashedPassword = await bcrypt.hash(seedUser.password, 10);

  return User.create({
    username: seedUser.username,
    email: seedUser.email,
    password: hashedPassword,
  });
};

const down = async () => {
  await User.destroy({
    where: { username: seedUser.username },
  });
};

module.exports = { up, down };
module.exports.default = { up, down };
