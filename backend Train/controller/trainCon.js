const train = require("../model/TrainModel");
console.log("Train Model:", train);

exports.createTrain = async (req, res) => {
  try {
    const {
      trainId,
      name,
      type,
      status,
      timing,
      runningDays,
      departureStation,
      arrivalStation,
      compartments,
      startTime,
      endTime,
      upcomingDate,
    } = req.body;

    if (!trainId || !name || !type || !status || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: trainId, name, type, status, startTime, and endTime.",
      });
    }

    const existingTrain = await train.findOne({ trainId });
    if (existingTrain) {
      return res.status(400).json({
        success: false,
        message: "Train with this trainId already exists.",
      });
    }

    const newTrain = await train.create({
      trainId,
      name,
      type,
      status,
      timing,
      runningDays,
      departureStation,
      arrivalStation,
      compartments,
      startTime,
      endTime,
      upcomingDate,
    });

    console.log("Train created:", newTrain);

    res.status(201).json({
      success: true,
      message: "Train details created successfully.",
      data: newTrain,
    });
  } catch (error) {
    console.error("Error creating train:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "Train ID must be unique. A train with this ID already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "An error occurred while creating the train.",
      error: error.message,
    });
  }
};

exports.getTrains = async (req, res) => {
  try {
    const { type, departureStation, arrivalStation, runningDay, status } =
      req.query;

    const filter = {};

    if (type) filter.type = type;
    if (departureStation) filter.departureStation = departureStation;
    if (arrivalStation) filter.arrivalStation = arrivalStation;
    if (runningDay) filter.runningDays = runningDay;
    if (status) filter.status = status;

    const trains = await train
      .find(filter)
      .populate("departureStation")
      .populate("arrivalStation")
      .populate("compartments");

    res.json({
      success: true,
      message: "Filtered Train Details",
      data: trains,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTrainById = async (req, res) => {
  try {
    const { trainId } = req.params;
    const getTrain = await train
      .findById(trainId)
      .populate("departureStation")
      .populate("arrivalStation")
      .populate("compartments");

    if (!getTrain) {
      return res.status(404).json({
        success: false,
        message: "Train not found",
      });
    }

    res.status(200).json({
      success: true,
      data: getTrain,
    });
  } catch (error) {
    console.error("Error fetching train details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the train details.",
      error: error.message,
    });
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    const { trainId } = req.params;

    const deletedTrain = await train.findOneAndDelete({ _id: trainId });

    if (!deletedTrain) {
      return res.status(404).json({
        success: false,
        message: "Train not found. Unable to delete.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Train deleted successfully.",
      data: deletedTrain,
    });
  } catch (error) {
    console.error("Error deleting train:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the train.",
      error: error.message,
    });
  }
};

exports.updatetrains = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedTrain = await train.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTrain) {
      return res
        .status(404)
        .json({ success: false, message: "train not found" });
    }
    res.status(200).json({
      success: true,
      message: "train updated successfully",
      Details: updatedTrain,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the customer",
      error: error.message,
    });
  }
};

exports.getfilterTrains = async (req, res) => {
  try {
    const { type, departureStation, arrivalStation, runningDay } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (departureStation)
      filter["departureStation.name"] = {
        $regex: departureStation,
        $options: "i",
      };
    if (arrivalStation)
      filter["arrivalStation.name"] = { $regex: arrivalStation, $options: "i" };
    if (runningDay) filter.runningDays = runningDay;

    const trains = await train
      .find(filter)
      .populate("departureStation")
      .populate("arrivalStation")
      .populate("compartments");

    res.json({
      success: true,
      message: "Filtered Train Details",
      data: trains,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
