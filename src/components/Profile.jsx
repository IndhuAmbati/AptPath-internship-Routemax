import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")?.trim();
    if (storedUsername) {
      axios.get(`http://localhost:8060/account/getByUsername/${storedUsername}`)
        .then(res => {
          setUser(res.data);
          setFormData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setMessage('Failed to load profile data.');
          setLoading(false);
        });
    } else {
      setMessage('No user logged in.');
      setLoading(false);
    }
  }, []);

  if (loading) return <p style={{textAlign: 'center', marginTop: '50px'}}>Loading profile...</p>;
  if (!user) return <p style={{textAlign: 'center', marginTop: '50px', color: 'red'}}>User not found.</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put('http://localhost:8060/account/update', formData)
      .then(res => {
        setUser(res.data);
        setEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 4000);
      })
      .catch(() => {
        setMessage('Update failed. Please try again.');
        setTimeout(() => setMessage(''), 4000);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      axios.delete(`http://localhost:8060/account/delete/${user.id}`)
        .then(() => {
          alert('Profile deleted successfully.');
          localStorage.removeItem('username');
          window.location.reload();
        })
        .catch(() => alert('Failed to delete profile.'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/login/user';
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">👤 User Profile</h2>
        <button className="profile-actions logout" onClick={handleLogout}>Logout</button>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="profile-info">
        {!editing ? (
          <>
            <p><strong>👩‍💼 Name:</strong> {user.name}</p>
            <p><strong>🆔 Username:</strong> {user.username}</p>
            <p><strong>📧 Email:</strong> {user.email}</p>
            <p><strong>📱 Phone:</strong> {user.phoneNumber && user.phoneNumber.trim() !== '' ? user.phoneNumber : 'Not provided'}</p>
            <p><strong>🔐 Role:</strong> {user.role}</p>
          </>
        ) : (
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Username (cannot edit)</label>
              <input
                name="username"
                value={formData.username || ''}
                disabled
                style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>
          </form>
        )}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {editing ? (
          <>
            <button className="btn save" onClick={handleUpdate}>Save</button>
            <button className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn edit" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn cancel" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
