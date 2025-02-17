const router = require("express").Router();
const {
  createPayment,
  getUserPayments,
  updatePaymentStatus,
  getAllPayments,
} = require("../controller/paymentCon");
const { authMidWare } = require("../middleware/auth");

router.post("/payment", authMidWare, createPayment);
router.get("/getuserpayment", authMidWare, getUserPayments);
router.put("/ubdateUserpayment", updatePaymentStatus);
router.get("/allUserpayment", authMidWare, getAllPayments);

module.exports = router;
