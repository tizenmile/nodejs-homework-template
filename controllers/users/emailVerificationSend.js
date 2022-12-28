const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
sgMail.setApiKey(process.env.API_KEY);
const { User } = require("../../models/usersModel");

const emailVerificationSend = async (req, res) => {
  const verificationToken = uuidv4();
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
  if (!email) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }
  await User.findOneAndUpdate({ email }, { verificationToken });
  const verifyURL =
    req.protocol +
    "://" +
    req.get("host") +
    "/api/users/verify/" +
    verificationToken;
  const msg = {
    to: email, // Change to your recipient
    from: "tizen48@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>To login to you account, please verify your email address <button><a href='${verifyURL}'>Submit verification</a></button></strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  if (!req.register) {
    return res.status(200).json({ message: "Verification email sent" });
  }
};

module.exports = emailVerificationSend;
