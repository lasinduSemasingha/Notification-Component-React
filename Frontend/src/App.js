import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import NotificationForm from './NotificationForm';
import NotificationList from './NotificationList';

const App = memo(function App() {
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
    <div style={{ margin: '0',
      backgroundImage: 'url(/background.jpg)', 
      backgroundRepeat: 'no-repeat'
    }}>
      <h1 align='center'>Notification System</h1>
      <NotificationForm fetchNotifications={fetchNotifications} />
      <NotificationList
        notifications={notifications}
        fetchNotifications={fetchNotifications}
      />
    </div>
  );
})

export default App;
