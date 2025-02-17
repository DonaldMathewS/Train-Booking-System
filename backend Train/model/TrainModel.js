const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema(
  {
    trainId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "Express",
        "High-Speed",
        "Luxury",
        "Intercity",
        "Regional",
        "Commuter",
        "Night",
        "Tourist",
      ],
    },
    departureStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainStation",
    },
    arrivalStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainStation",
    },
    startTime: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v); // Validates HH:MM format
        },
        message: (props) =>
          `${props.value} is not a valid start time! Use HH:MM format.`,
      },
    },
    endTime: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid end time! Use HH:MM format.`,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ["On Time", "Delayed", "Cancelled", "Departed", "Arrived"],
      default: "On Time",
    },

    runningDays: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    compartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Compartment",
      },
    ],
    upcomingDate: {
      type: Date,
    },
  },

  { timestamps: true }
);

const train = mongoose.model("Train", TrainSchema);
module.exports = train;
