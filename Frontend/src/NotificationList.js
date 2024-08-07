import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, CardActions, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete, Markunread, MarkEmailRead } from '@mui/icons-material'; // Import icons

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/notifications/${id}`);
      if (response.status === 200) {
        setNotifications(notifications.filter(notification => notification._id !== id));
        setMessage('Notification deleted successfully');
        setOpen(true);
      } else {
        setMessage('Failed to delete notification');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      setMessage('Failed to delete notification');
      setOpen(true);
    }
  };

  const handleMarkAsRead = async (id, readStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/notifications/${id}/${readStatus ? 'unread' : 'read'}`, { read: !readStatus });
      if (response.status === 200) {
        setNotifications(notifications.map(notification =>
          notification._id === id ? { ...notification, read: !readStatus } : notification
        ));
      }
    } catch (error) {
      console.error('Error marking notification as read/unread:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Notification List
      </Typography>
      <Button variant="contained" color="primary" onClick={goToHomePage} style={{ marginBottom: '20px' }}>
        Go to Home Page
      </Button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {notifications.map((notification) => (
          <Card
            key={notification._id}
            style={{
              width: '100%',
              maxWidth: '800px',
              marginBottom: '10px',
              backgroundColor: notification.read ? 'white' : '#f5f5f5',
              border: notification.read ? 'none' : '1px solid #ddd',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              position: 'relative'
            }}
            onClick={() => handleMarkAsRead(notification._id, notification.read)}
          >
            <CardContent style={{ backgroundColor: notification.read ? 'lightblue' : 'lightpink' }}>
              <Typography style={{ fontWeight: '700', fontSize: '22px'}} variant="h6">{notification.title}</Typography>
              <Typography variant="body1">{notification.message}</Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between' }}>
              <IconButton 
                edge="end" 
                color="primary" 
                onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notification._id, notification.read); }}
              >
                {notification.read ? <MarkEmailRead /> : <Markunread />}
              </IconButton>
              <IconButton 
                edge="end" 
                color="error" 
                onClick={(e) => { e.stopPropagation(); handleDelete(notification._id); }}
              >
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.includes('Failed') ? 'error' : 'success'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationList;
