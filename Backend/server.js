const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://lkddsas2001:hasine1992@agroapp.sm5vf59.mongodb.net/', {
    serverSelectionTimeoutMS: 50000 // Increase timeout if needed
});

const notificationSchema = new mongoose.Schema({
    title: String,
    message: String,
    date: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }, // Add this field
});


const Notification = mongoose.model('Notification', notificationSchema);

app.post('/notifications', async (req, res) => {
    const { title, message } = req.body;
    const notification = new Notification({ title, message });
    await notification.save();
    res.status(201).send(notification);
});

app.get('/notifications', async (req, res) => {
    const notifications = await Notification.find();
    res.send(notifications);
});

app.patch('/notifications/:id/read', async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    res.send(notification);
});
app.patch('/notifications/:id/unread', async (req, res) => {
  const { id } = req.params;
  const notification = await Notification.findByIdAndUpdate(id, { read: false }, { new: true });
  res.send(notification);
});
app.delete('/notifications/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Attempting to delete notification with ID: ${id}`);
  
      // Check if ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log(`Invalid ID format: ${id}`);
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      const result = await Notification.findByIdAndDelete(id);
  
      if (!result) {
        console.log(`Notification with ID: ${id} not found`);
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      console.log(`Notification with ID: ${id} deleted successfully`);
      res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
      console.error('Error deleting notification:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
