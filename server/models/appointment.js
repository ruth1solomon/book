const mongoose = require('mongoose');

/*const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  payment: { type: String, required: true },
  status: { type: String, default: 'pending' },
  discount: {
    type: Number,
    default: 0, // Store discount percentage
  }, // 'pending', 'done'
});*/


const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  payment: { type: Number, required: true },
  discount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);

