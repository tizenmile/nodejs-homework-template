const { User } = require("../../models/usersModel");

const verifyEmail = async (req, res, next) => {
  const verificationToken = req.params.verificationToken;
  try {
    const user = await User.findOneAndUpdate(
      { verificationToken: verificationToken },
      { verify: true, verificationToken: null }
    );
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `User not found`,
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: `Verification successful`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
