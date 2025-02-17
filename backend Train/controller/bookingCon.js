const Booking = require("../model/bookingModel");

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      trainId,
      trainName,
      compartmentId,
      compartmentType,
      numPassengers,
      totalPrice,
    } = req.body;

    if (
      !trainId ||
      !trainName ||
      !compartmentId ||
      !compartmentType ||
      !numPassengers ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    const newBooking = new Booking({
      user: userId,
      trainId,
      trainName,
      compartmentId,
      compartmentType,
      numPassengers,
      totalPrice,
      paymentStatus: "Pending",
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking successful!",
      data: { bookingId: newBooking._id, ...newBooking._doc },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const userBookings = await Booking.find({ user: userId })
      .populate("trainId", "name")
      .populate("compartmentId", "type price")
      .sort({ createdAt: -1 })
      .select("-__v");

    if (!userBookings.length) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found." });
    }

    res.status(200).json({
      success: true,
      message: "User bookings retrieved successfully.",
      data: userBookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find()
      .populate("trainId", "name")
      .populate("compartmentId", "type price")
      .sort({ createdAt: -1 })
      .select("-__v");

    if (!allBookings.length) {
      return res
        .status(404)
        .json({ success: false, message: "No bookings found." });
    }

    res.status(200).json({
      success: true,
      message: "All bookings retrieved successfully.",
      data: allBookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
