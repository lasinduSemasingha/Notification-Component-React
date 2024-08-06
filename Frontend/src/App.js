import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationForm from './NotificationForm';
import NotificationList from './NotificationList';

const App = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1 align='center'>Notification System</h1>
      <NotificationForm fetchNotifications={fetchNotifications} />
      <NotificationList
        notifications={notifications}
        fetchNotifications={fetchNotifications} // Ensure this is passed
      />
    </div>
  );
};

export default App;
