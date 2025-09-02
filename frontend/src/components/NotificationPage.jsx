import React, { useEffect, useState } from 'react';
import './NotificationPage.css'; // Optional: include if you have styles

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:8060/notification/getAllNotifications");
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error.message);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-page">
      <h2>📢 Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification, index) => (
            <li key={index} className="notification-item">
              <strong>{notification.title || 'New Notification'}:</strong> {notification.message}
              <br />
              <small>{new Date(notification.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
