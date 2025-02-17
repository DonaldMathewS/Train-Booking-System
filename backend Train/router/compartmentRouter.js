const router = require("express").Router();
const {
  createcompartment,
  findCompartment,
  deleteCompartment,
} = require("../controller/compartmentCon");

router.post("/compartment", createcompartment);
router.get("/findComp", findCompartment);
router.delete("/delete/:id", deleteCompartment);

module.exports = router;
