const fs = require("fs").promises;
const path = require("path");
const multer = require("multer");
const { User } = require("../../models/usersModel");
const uploadDir = path.join(process.cwd(), "temp");
const storeImage = path.join(process.cwd(), "public/avatars");
const Jimp = require("jimp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { description } = req.body;
  const { path: temporaryName } = req.file;
  const fileName = path.join(storeImage, _id + ".jpeg");
  try {
    await fs.rename(temporaryName, fileName);
    await Jimp.read(fileName)
      .then((lenna) => {
        return lenna
          .resize(250, 250) // resize
          .write(fileName); // save
      })
      .catch((err) => {
        console.error(err);
      });
    await User.findByIdAndUpdate(_id, {
      avatarURL: `${req.protocol + "://" + req.get("host")}/avatars/${
        _id + ".jpeg"
      }`,
    });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({
    description,
    status: 200,
    data: {
      avatarURL: `${req.protocol + "://" + req.get("host")}/avatars/${
        _id + ".jpeg"
      }`,
    },
  });
};

module.exports = { updateUserAvatar, upload };
