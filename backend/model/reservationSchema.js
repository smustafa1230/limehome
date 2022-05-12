
const mongoose = require('mongoose');
const reservationSchema = new mongoose.Schema({
  email: String,
  checkInDate: Date,
  checkOutDate: Date,
  firstName: String,
  lastName: String,
  billingAddress: String,
  country: String,
  noOfGuests: Number,
  city: String,
  postalCode: String,
  phoneNumber: String
  });

module.exports = mongoose.model('reservation', reservationSchema);