const express = require("express");

const router = express.Router();
const { postSignup} = require("../controllers/signupController.js");
router.route("/").post(postSignup);
module.exports = router;