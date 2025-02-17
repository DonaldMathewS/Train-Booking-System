const router = require("express").Router();
const {
  createTrain,
  getTrains,
  getTrainById,
  updatetrains,
  deleteTrain,
  getfilterTrains,
} = require("../controller/trainCon");

router.post("/createTrain", createTrain);
router.get("/getTrains", getTrains);
router.get("/getfilterTrains", getfilterTrains);
router.get("/trainInfo/:trainId", getTrainById);
router.delete("/delete/:trainId", deleteTrain);
router.put("/update/:id", updatetrains);

module.exports = router;
