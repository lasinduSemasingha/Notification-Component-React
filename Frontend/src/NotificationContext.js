import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

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

  const addNotification = async (notification) => {
    try {
      await axios.post('http://localhost:5000/notifications', notification);
      // Refresh notifications after adding a new one
      const res = await axios.get('http://localhost:5000/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const updateNotification = async (id, readStatus) => {
    try {
      await axios.patch(`http://localhost:5000/notifications/${id}/read`, { read: readStatus });
      const res = await axios.get('http://localhost:5000/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notifications/${id}`);
      const res = await axios.get('http://localhost:5000/notifications');
      setNotifications(res.data);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, updateNotification, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
