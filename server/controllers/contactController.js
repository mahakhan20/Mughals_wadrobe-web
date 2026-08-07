const Contact = require("../models/Contact");

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "Name, email, subject, and message are all required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({
      success: true,
      message: "Your message has been sent. We'll get back to you soon!",
      data: { id: contact._id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
};

// Admin use - viewing submitted messages requires login
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch messages", error: error.message });
  }
};

module.exports = { submitContact, getAllContacts };