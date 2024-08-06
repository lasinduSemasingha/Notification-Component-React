import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Snackbar, Alert } from '@mui/material';

const NotificationForm = ({ fetchNotifications }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/notifications', { title, message });
      setTitle('');
      setMessage('');
      fetchNotifications();
      setAlertMessage('Notification sent successfully');
      setOpen(true);
    } catch (error) {
      console.error('Error sending notification:', error);
      setAlertMessage('Failed to send notification');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Send Notification
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          multiline
          rows={4}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Send Notification
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMessage.includes('Failed') ? 'error' : 'success'}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NotificationForm;
