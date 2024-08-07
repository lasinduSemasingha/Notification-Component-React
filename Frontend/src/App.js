import React, { memo } from 'react';
import NotificationForm from './NotificationForm';
import NotificationList from './NotificationList';
import { NotificationProvider } from './NotificationContext';

const App = () => {
  return (
    <NotificationProvider>
      <div style={{ margin: '0', backgroundImage: 'url(/background.jpg)', backgroundRepeat: 'no-repeat' }}>
        <h1 align='center'>Notification System</h1>
        <NotificationForm />
        <NotificationList />
      </div>
    </NotificationProvider>
  );
};

export default memo(App);
