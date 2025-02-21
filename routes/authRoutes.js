
const express = require("express");
const { login } = require("../controller/authController");

const router = express.Router();

// Punch Out Route
router.post("/login", login);

module.exports = router;