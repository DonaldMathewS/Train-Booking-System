const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "train user",
      required: true,
    },
    trainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    compartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Compartment",
      required: true,
    },
    compartmentType: {
      type: String,
      required: true,
    },
    numPassengers: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1 });
bookingSchema.index({ trainId: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
