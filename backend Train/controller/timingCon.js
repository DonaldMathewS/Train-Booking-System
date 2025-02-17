const timing = require("../model/timingModel");

exports.createTiming = async (req, res) => {
  try {
    const time = await timing.create(req.body);
    res.status(201).json({
      success: true,
      message: "timing created successfully",
      data: time,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the timing.",
      error: error.message,
    });
  }
};

exports.findTiming = async (req, res) => {
  try {
    const time = await timing.find().populate([
      {
        path: "trainId",
        select: "name code address status", // Include the fields needed for train info
      },
      {
        path: "route.station",
        select: "name code address status", // Include the fields needed for station info
      },
    ]);

    res.status(200).json({
      success: true,
      message: "All timings fetched successfully",
      data: time,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the timings.",
      error: error.message,
    });
  }
};
