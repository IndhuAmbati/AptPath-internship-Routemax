import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import AdminDashboard from './components/AdminDashBoard';
import Profile from './components/Profile';
import UserNotification from './components/UserNotification';
import AdminNotifications from './components/AdminNotifications';
import TrackProgressPage from './components/TrackProgress';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar'; // ✅ NEW
import TrackParcel from './components/TrackParcel';
import AdminFeedbacks from './components/AdminFeedback'; // ✅ import


function AppWrapper() {
  const location = useLocation();
  const isUserPath =
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/user/');
  const isAdminPath = location.pathname.startsWith('/admin'); // ✅ NEW

  return (
    <>
      {isUserPath && <UserNavbar />}
      {isAdminPath && <AdminNavbar />} {/* ✅ NEW */}
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/admin/landing" element={<AdminDashboard />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/tracking" element={<TrackProgressPage />} />
        <Route path="/user/notifications" element={<UserNotification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/tracking" element={<TrackParcel />} />
        <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />

</Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
