const mongoose = require("mongoose");

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    birthday: {
      type: String,
      required: [true, "Birthday is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },
    maritalStatus: {
      type: String,
      required: [true, "Marital Status is required"],
      enum: {
        values: ["Single", "Married", "Other"],
        message: "Marital Status must be Single, Married, or Other",
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [10, "Address must be at least 10 characters long"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Pincode must be a 6-digit number"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
      validate: {
        validator: function (value) {
          return value !== "0000000000";
        },
        message: "Phone number cannot be all zeros",
      },
    },
  },
  { timestamps: true }
);

profileSchema.pre("save", function (next) {
  if (this.birthday) {
    const dob = new Date(this.birthday);
    this.birthday = formatDate(dob);
  }
  next();
});

const tProfile = mongoose.model("T_User_Profile", profileSchema);

module.exports = tProfile;
