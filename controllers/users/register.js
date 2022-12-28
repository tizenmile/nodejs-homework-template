
const { User } = require("../../models/usersModel");
const gravatar = require("gravatar");
const emailVerificationSend = require("./emailVerificationSend");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const avatar = gravatar.url(email, { protocol: "https" });
    
    const newUser = new User({ email, avatarURL: avatar, verificationToken: "null" });
    await newUser.setPassword(password);
    await newUser.save();
    req.register = true
    await emailVerificationSend(req, res);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
