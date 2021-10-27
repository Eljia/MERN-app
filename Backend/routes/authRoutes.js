const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  register,
  login,
  getAuthUser,
} = require("../controllers/authcontrollers");
const {
  registerRules,
  loginRules,
  validator,
} = require("../middlewares/bodyvalidator");

/**
 * @params post  /auth/register
 * @descreption register user
 * @access PUBLIC
 */
router.post("/register", registerRules(), validator, register);
/**
 * @params post  /auth/login
 * @descreption LOGIN user
 * @access PUBLIC
 */
router.post("/login", loginRules(), validator, login);
/**
 * @params get  /auth/me
 * @descreption get auth user
 * @access PRIVET
 */
router.get("/me", isAuth, getAuthUser);
module.exports = router;
