const express = require("express");
const router = express.Router();

const { createUser, loginUser, allUser } = require("../controller/userCon");

router.post("/createUser", createUser);
router.post("/login", loginUser);
router.get("/finduser", allUser);

module.exports = router;
