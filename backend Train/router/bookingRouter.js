const router = require("express").Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
} = require("../controller/bookingCon");
const { authMidWare } = require("../middleware/auth");

router.post("/booking", authMidWare, createBooking);
router.get("/getbooking", authMidWare, getUserBookings);
router.get("/allBookings", getAllBookings);

module.exports = router;
