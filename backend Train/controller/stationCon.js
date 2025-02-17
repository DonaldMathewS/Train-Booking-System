const station = require("../model/stationModel");

exports.createStation = async (req, res) => {
  try {
    const { name, code, address, status } = req.body;

    if (!name || !code || !address) {
      return res.status(400).json({
        success: false,
        message: "Name, code, and address are required fields.",
      });
    }

    const validStatuses = [
      "active",
      "inactive",
      "under construction",
      "closed",
    ];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value. Accepted values are: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    const existingStation = await station.findOne({ code });
    if (existingStation) {
      return res.status(400).json({
        success: false,
        message: "A station with this code already exists.",
      });
    }

    const newStation = await station.create(req.body);

    res.status(201).json({
      success: true,
      message: "Station created successfully",
      data: newStation,
    });
  } catch (error) {
    console.error("Error creating station:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the station.",
      error: error.message,
    });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const id = req.params.id;

    const foundStation = await station.findById(id);

    if (!foundStation) {
      return res.status(404).json({
        success: false,
        message: "Station not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Station details retrieved successfully.",
      data: foundStation,
    });
  } catch (error) {
    console.error("Error fetching station details by ID:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the station details.",
      error: error.message,
    });
  }
};

exports.getAllStations = async (req, res) => {
  try {
    const stations = await station.find();

    if (stations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No stations found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "All stations retrieved successfully.",
      data: stations,
    });
  } catch (error) {
    console.error("Error fetching all stations:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the stations.",
      error: error.message,
    });
  }
};
