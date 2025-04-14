const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// POST: Create a new notification
router.post('/', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ message: 'Failed to create notification' });
  }
});

// GET: Fetch all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// PUT: Mark notification as read
/*router.put('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
});*/
// In your Express route
router.put('/:id', async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        // Convert numeric fields to numbers
        payment: Number(req.body.payment),
        paidAmount: Number(req.body.paidAmount),
        discount: Number(req.body.discount)
      },
      { new: true } // This is crucial to get the updated document
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
});

module.exports = router;
