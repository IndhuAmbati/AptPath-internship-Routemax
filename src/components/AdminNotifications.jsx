import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'; 
function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8060/notifications/getAdminNotifications')
      .then(res => setNotifications(
  res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
))

      .catch(err => console.error('Error fetching admin notifications:', err));
  }, []);

  return (
    <div style={{ padding: '30px', backgroundColor: '#eaf4fc', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#1f3c88', fontWeight: 'bold' }}>
        📢 Admin Notifications
      </h2>

      {notifications.length === 0 ? (
        <p style={{ color: '#555' }}>No notifications found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {notifications.map((notif, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderLeft: '6px solid #1f3c88',
              }}
            >
              <p style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>
                {notif.message}
              </p>
              {notif.recipientUsername && (
                <p style={{ margin: '5px 0', color: '#1a73e8' }}>
                  👤 <strong>To:</strong> {notif.recipientUsername}
                </p>
              )}
              <p style={{ fontSize: '13px', marginTop: '10px', color: '#888' }}>
                ⏰ {new Date(notif.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminNotifications;
