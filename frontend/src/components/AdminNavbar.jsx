import React from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-title">Admin Dashboard</div>
      <ul className="admin-navbar-links">
        <li><Link to="/admin/landing">User Management</Link></li>
        <li><Link to="/admin/tracking">Parcel Management</Link></li>
        <li><Link to="/admin/notifications">Notifications</Link></li>
        <li><Link to="/admin/feedbacks">Feedbacks</Link></li> {/* ✅ Added Feedbacks link */}
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
