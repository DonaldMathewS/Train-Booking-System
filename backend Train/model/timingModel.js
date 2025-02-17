const mongoose = require("mongoose");

const TrainTimingSchema = new mongoose.Schema(
  {
    route: [
      {
        station: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TrainStation",
          required: true,
        },
        arrivalTime: {
          type: String,
          required: false,
        },
        departureTime: {
          type: String,
          required: false,
        },
        status: {
          type: String,
          required: true,
          enum: ["On Time", "Delayed", "Cancelled"],
          default: "On Time",
        },
      },
    ],
  },
  { timestamps: true }
);

const timing = mongoose.model("TrainTiming", TrainTimingSchema);

module.exports = timing;
