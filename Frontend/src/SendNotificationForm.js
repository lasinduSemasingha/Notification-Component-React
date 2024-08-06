import React, { useState, memo } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert, Typography, Container } from '@mui/material';

const SendNotificationForm = memo(function SendNotificationForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/notifications', { title, message });
      if (response.status === 200) {
        setAlertMessage('Notification sent successfully');
        setOpen(true);
        setTitle('');
        setMessage('');
      } else {
        setAlertMessage('Failed to send notification');
        setOpen(true);
      }
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          multiline
          rows={4}
          style={{ marginBottom: '20px' }}
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
})

export default SendNotificationForm;
