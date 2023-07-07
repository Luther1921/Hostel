const express = require("express");

const router = express.Router();
const {
  registerUser,
  getUser,
  userLogin,
  currentUser,
} = require("../controller/StaffController");
const validateToken = require("../middleware/validateTokenHandler");

//router.post("/register", registerUSer);
router.post("/register", registerUser);
router.get("/", getUser);
router.post("/login", userLogin);
router.get("/current", validateToken, currentUser);
module.exports = router;
