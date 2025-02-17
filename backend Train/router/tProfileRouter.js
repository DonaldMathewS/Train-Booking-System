const express = require("express");
const router = express.Router();
const {
  createProfile,
  getProfile,
  updateProfile,
  getallProfile,
} = require("../controller/tProfileCon"); // Fix object destructuring
const { authMidWare } = require("../middleware/auth");

// Define routes
router.post("/Profile", authMidWare, createProfile);
router.get("/getProfile", authMidWare, getProfile);
router.put("/edit", authMidWare, updateProfile);
router.get("/allProfile", getallProfile);
module.exports = router;
