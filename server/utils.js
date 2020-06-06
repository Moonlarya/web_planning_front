const bcrypt = require("bcrypt");
console.log(process.env.BCRYPT_SALT_WORK_FACTOR);

module.exports.getPasswordHash = (password) =>
  bcrypt.hash(password, +process.env.BCRYPT_SALT_WORK_FACTOR);

module.exports.comparePasswords = (password, hash) =>
  bcrypt.compareSync(password, hash);
