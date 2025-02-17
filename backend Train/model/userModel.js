const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ticketData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);
const user = mongoose.model("train user", userschema);
module.exports = user;
