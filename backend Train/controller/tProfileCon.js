const Profile = require("../model/tProfileModel");

exports.createProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await Profile.findOne({ user: userId });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "A profile already exists for this user.",
      });
    }

    const {
      name,
      birthday,
      gender,
      maritalStatus,
      address,
      pincode,
      state,
      nationality,
      phone,
    } = req.body;

    const newProfile = await Profile.create({
      user: userId,
      name,
      birthday,
      gender,
      maritalStatus,
      address,
      pincode,
      state,
      nationality,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating profile",
      error: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await Profile.findOne({ user: userId });
    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please create one first.",
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

exports.getallProfile = async (req, res) => {
  try {
    const pofile = await Profile.find();
    res.status(200).json({
      success: true,
      message: "getting Profile  successfully",
      data: pofile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};
