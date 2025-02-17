const contact = require("../model/contactModel");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const create = await contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: create,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find();
    res.status(200).json({
      success: true,
      message: "retrieved all messages!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
