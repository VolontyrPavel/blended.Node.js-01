const express = require("express");
const router = express.Router();
const { authRegistrate, authLogin } = require("../controllers/authControllers");

router.post("/register", authRegistrate);
router.post("/login", authLogin);
router.post("/logout");

module.exports = { authRouter: router };
