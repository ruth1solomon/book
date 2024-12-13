const express = require('express');
const Appointment = require('../models/appointment'); // Import Appointment model
const appointment = require('../models/appointment');
const router = express.Router();

// Get All Pending Appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'pending' });
    res.status(200).send(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err });
  }
});

// Mark Appointment as Done
/*router.put('/:id/done', async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status: 'Done' });
    res.status(200).json({ message: 'Appointment marked as done',appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment', error: err });
  }
});
router.get('/done', async (req, res) => {
  try {
    const doneAppointments = await Appointment.find({ status: 'Done' });
    res.status(200).json(doneAppointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching done appointments', error: err.message });
  }
});*/



// Mark an appointment as done
router.put('/:id/done', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Done' },
      { new: true }
    );
    if (!appointment) {
      console.error('Appointment not found:', req.params.id);
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment marked as done', appointment });
  } catch (err) {
    console.error('Error marking appointment as done:', err);
    res.status(500).json({ message: 'Error marking appointment as done', error: err.message });
  }
});


// Fetch all appointments marked as done
router.get('/done', async (req, res) => {
  try {
    const doneAppointments = await appointment.find({ status: 'Done' });
    res.status(200).json(doneAppointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching done appointments', error: err.message });
  }
});



// Delete Appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment', error: err });
  }
});

// Create Appointment
router.post('/create', async (req, res) => {
  try {
    const appointments = req.body;
    console.log('Incoming Appointment Data:', appointments); // Log incoming data

    await Appointment.insertMany(appointments);
    res.status(201).json({ message: 'Appointments created successfully!' });
  } catch (error) {
    console.error('Error creating appointments:', error);
    res.status(500).json({ error: 'Failed to create appointments', details: error.message });
  }
});


// Edit Appointment
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Extract the appointment ID from the URL
  const { fullName, phoneNumber, date, time, service, payment } = req.body; // Extract the updated fields from the request body

  try {
    // Find the appointment by ID and update it with new data
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { fullName, phoneNumber, date, time, service, payment },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    // If the appointment is not found, send a 404 error
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send the updated appointment as the response
    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment: updatedAppointment,
    });
  } catch (error) {
    // Handle any errors during the update process
    res.status(500).json({
      message: 'Failed to update appointment',
      error: error.message,
    });
  }
});


module.exports = router;

