const mongoose = require("mongoose");

const CompartmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Sleeper",
        "AC First Class",
        "AC Second Class",
        "AC Third Class",
        "General",
        "Chair Car",
      ],
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    bookedSeats: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableSeats: {
      type: Number,
      default: function () {
        return this.capacity - this.bookedSeats;
      },
      min: 0,
    },
  },
  { timestamps: true }
);

// Middleware to update availableSeats when bookedSeats changes
CompartmentSchema.pre("save", function (next) {
  this.availableSeats = this.capacity - this.bookedSeats;
  next();
});

const Compartment = mongoose.model("Compartment", CompartmentSchema);
module.exports = Compartment;
