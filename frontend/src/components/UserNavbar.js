import React from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = () => {
  return (
    <nav className="user-navbar">
      <div className="user-logo">📦 ParcelApp</div>
      <ul className="user-nav-links">
        <li><Link to="/profile">👤 Profile</Link></li>
        <li><Link to="/user/tracking">📍 Track Parcel</Link></li>
        <li><Link to="/user/notifications">🔔 Notifications</Link></li>
        <li><Link to="/login/user">🚪 Logout</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
