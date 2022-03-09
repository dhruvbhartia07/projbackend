const express = require('express')
const router = express.Router()
const { signup, signout } = require("../controllers/auth");

// Defined Signup route
router.post("/signup", signup);

// Defined Signout route
router.get("/signout", signout);

module.exports = router;