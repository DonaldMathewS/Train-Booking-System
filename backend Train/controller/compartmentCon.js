const compartment = require("../model/compartmentModel");

exports.createcompartment = async (req, res) => {
  try {
    const postcompartment = await compartment.create(req.body);
    res.status(201).json({
      success: true,
      message: "compartment created successfully",
      data: postcompartment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the compartment.",
      error: error.message,
    });
  }
};

exports.findCompartment = async (req, res) => {
  try {
    const find = await compartment.find();
    res.status(201).json({
      success: true,
      message: "All compartments found successfully",
      data: find,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while find the compartments.",
      error: error.message,
    });
  }
};

//addRouter
const Compartment = require("../model/compartmentModel");

exports.getCompartmentDetails = async (req, res) => {
  try {
    const compartments = await Compartment.find()
      .populate("trainId", "name code status") // Populate train details (name, code, status)
      .exec();

    res.status(200).json({
      success: true,
      message: "Compartment details fetched successfully",
      data: compartments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching compartment details.",
      error: error.message,
    });
  }
};

exports.deleteCompartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteco = await compartment.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Compartment Delete successfully",
      data: deleteco,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while Deleting compartment details.",
      error: error.message,
    });
  }
};
