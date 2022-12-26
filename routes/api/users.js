const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

const { userController } = require("../../controllers");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", auth, userController.logout); // auth

router.post("/current", auth, userController.current); // auth

router.patch("/", auth, userController.updateSubscription); // auth

module.exports = router;
