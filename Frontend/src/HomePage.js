import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Snackbar, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { CheckCircle } from '@mui/icons-material'; // Import icon

// Styled Snackbar for positioning
const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: theme.zIndex.snackbar,
}));

const HomePage = memo(function HomePage() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/notifications');
        setNotifications(res.data);
        const unreadNotification = res.data.find((notification) => !notification.read);
        if (unreadNotification) {
          setCurrentNotification(unreadNotification);
          setOpen(true);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAsRead = async () => {
    if (currentNotification) {
      try {
        await axios.patch(`http://localhost:5000/notifications/${currentNotification._id}/read`);
        setCurrentNotification(null); // Clear current notification after marking as read
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
    setOpen(false);
  };

  const goToNotificationList = () => {
    navigate('/notifications');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary" onClick={goToNotificationList}>
        Go to Notification List
      </Button>
      <StyledSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <IconButton
            color="inherit"
            onClick={handleMarkAsRead}
          >
            <CheckCircle />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClose}
          severity="info"
          action={
            <IconButton
              color="inherit"
              onClick={handleMarkAsRead}
            >
              <CheckCircle />
            </IconButton>
          }
        >
          {currentNotification?.message}
        </Alert>
      </StyledSnackbar>
    </div>
  );
})

export default HomePage;
