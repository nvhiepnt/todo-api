let express = require("express");
let router = express.Router();
let authController = require("../controller/authController");
let validate = require("../validate/authValidation");

/* POST login */
router.post("/login", validate.login, authController.login);

/* POST register */
router.post("/register", validate.register, authController.register);

/* POST login social*/
router.post("/login-social", validate.loginSocial, authController.loginsocial);

module.exports = router;
