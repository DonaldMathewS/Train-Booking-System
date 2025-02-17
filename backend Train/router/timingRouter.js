const router = require("express").Router();
const { createTiming, findTiming } = require("../controller/timingCon");

router.post("/Timing", createTiming);
router.get("/findTiming", findTiming);

module.exports = router;
