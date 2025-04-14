const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['appointment-create', 'appointment-update', 'appointment-delete'],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
