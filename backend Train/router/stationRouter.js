const router = require("express").Router();
const {
  createStation,
  getAllStations,
  getStationById,
} = require("../controller/stationCon");
router.post("/createStation", createStation);
router.get("/allStations", getAllStations);
router.get("/oneStation/:id", getStationById);

module.exports = router;
