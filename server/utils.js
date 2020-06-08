const bcrypt = require("bcrypt");

module.exports.getPasswordHash = (password) =>
  bcrypt.hash(password, +process.env.BCRYPT_SALT_WORK_FACTOR);

module.exports.comparePasswords = (password, hash) =>
  bcrypt.compareSync(password, hash);
