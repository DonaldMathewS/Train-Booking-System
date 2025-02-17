const Booking = require("../model/bookingModel");
const Payment = require("../model/paymentModel");
const userModel = require("../model/userModel");

exports.createPayment = async (req, res) => {
  try {
    console.log("Received Payment Request:", req.body);
    console.log("User ID:", req.user?.id);

    const userId = req.user?.id;
    const { bookingId, amount, status } = req.body;

    // Basic validation to check if bookingId and amount are provided
    if (!bookingId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and amount are required.",
      });
    }

    // Ensure the bookingId and userId are valid strings
    if (!userId || !bookingId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Booking ID are required.",
      });
    }

    // Fetch the booking details from the database
    const book = await Booking.findById(bookingId);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    // Fetch the user details
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Ensure the booking belongs to the user
    if (String(book.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to make payment for this booking.",
      });
    }

    // Validate the status parameter
    if (
      status &&
      !["Pending", "Completed", "Failed", "Refunded"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status.",
      });
    }

    // Default status to "Pending" if no status is provided
    const paymentStatus = status || "Pending";

    // Create the payment record
    const newPayment = await Payment.create({
      bookingId: book._id,
      bookingDate: book.createdAt,
      amount,
      status: paymentStatus,
      cancellation: false,
    });

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Payment created successfully.",
      data: { payment: newPayment },
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update the payment status after successful payment
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId, status } = req.body;

    // Validate the status
    if (!["Completed", "Failed", "Refunded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status.",
      });
    }

    // Find the payment record by its ID
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    payment.status = status;
    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully.",
      data: { payment },
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. User ID is required.",
      });
    }

    const bookings = await Booking.find({ user: userId });
    const bookingIds = bookings.map((booking) => booking._id);

    const payments = await Payment.find({ bookingId: { $in: bookingIds } });

    res.status(200).json({
      success: true,
      data: { payments },
    });
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find()
      .populate("bookingId", "trainId user")
      .sort({ createdAt: -1 })
      .select("-__v");

    if (!allPayments.length) {
      return res
        .status(404)
        .json({ success: false, message: "No payments found." });
    }

    res.status(200).json({
      success: true,
      message: "All payments retrieved successfully.",
      data: allPayments,
    });
  } catch (error) {
    console.error("Error fetching all payments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
