const mongoose = require("mongoose");

const TrainStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "under construction", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const station = mongoose.model("TrainStation", TrainStationSchema);

module.exports = station;
