const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

const Appointment = require('/models/appointment'); // Ensure the model is imported correctly

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmails = async () => {
  const today = new Date();
  const threeDaysAhead = new Date(today);
  threeDaysAhead.setDate(today.getDate() + 3);

  const appointments = await Appointment.find({
    date: {
      $gte: today.toISOString().split('T')[0],
      $lte: threeDaysAhead.toISOString().split('T')[0],
    },
  });

  appointments.forEach((appointment) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'client@example.com', // Replace with client's email address
      subject: 'Appointment Reminder',
      text: `Dear ${appointment.fullName}, just a reminder that you have an appointment for ${appointment.service} on ${appointment.date} at ${appointment.time}. We look forward to seeing you!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  });
};

sendReminderEmails().then(() => {
  mongoose.connection.close();
});
