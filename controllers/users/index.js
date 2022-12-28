const current = require("./current");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const verifyEmail = require("./verifyEmail");
const emailVerificationSend = require("./emailVerificationSend");
const updateSubscription = require("./updateSubscription");
const { updateUserAvatar, upload } = require("./updateUserAvatar");

module.exports = {
  current,
  login,
  logout,
  register,
  updateSubscription,
  updateUserAvatar,
  upload,
  verifyEmail,
  emailVerificationSend,
};
