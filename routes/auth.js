const express = require("express");
const router = express.Router();
const { signup, signout } = require("../controllers/auth");
const { check } = require("express-validator");

// Defined Signup route
router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password should be atleast 3 char").isLength({ min: 3 })
  ],
  signup
);

// Defined Signout route
router.get("/signout", signout);

module.exports = router;
