const express = require("express");
const router = express.Router();
let userController = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../validate/userValidation");

var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

/* PUTH update user by id. */
router.put(
  "/",
  authMiddleware,
  upload.single("avatar"),
  validate.update,
  userController.update
);

module.exports = router;
