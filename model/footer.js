const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  location: String,
  address: String,
});

const contactSchema = new mongoose.Schema({
  location: String,
  phoneNumber: String,
});

const emailSchema = new mongoose.Schema({
  email: String,
});

const dataSchema = new mongoose.Schema({
  addresses: [addressSchema],
  contactInfo: {
    contacts: [contactSchema],
    emails: [emailSchema],
  },
});

module.exports = mongoose.model("Footer", dataSchema);
