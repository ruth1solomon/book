const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  payment: { type: String, required: true },
  status: { type: String, default: 'pending' }, // 'pending', 'done'
});

module.exports = mongoose.model('Appointment', appointmentSchema);

