const express = require("express");
const router = express.Router();
const {
  registration, 
  login,
  logout,
  refresh
} = require("../controllers/authController");

router.route("/reg").post(registration);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/refresh").get(refresh)

module.exports = router;