const express = require("express");
const router = express.Router();
const {
  registration, 
  login,
  logout,
  refresh,
  me
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

router.route("/reg").post(registration);
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/refresh").get(refresh)
router.route("/me").get(protect, me) 

module.exports = router;