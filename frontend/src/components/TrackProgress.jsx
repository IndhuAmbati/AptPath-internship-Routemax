import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrackProgressPage.css';

const initialFormData = {
  trackingId: '',
  sender: '',
  recipientUsername: '',
  description: '',
  location: '',
  currentLocation: '',
  estimatedDelivery: '',
  status: ''
};

const TrackProgress = () => {
  const [parcels, setParcels] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all parcels from backend
  const getParcels = () => {
    axios.get('http://localhost:8060/parcel/getAllParcels')
      .then(res => setParcels(res.data))
      .catch(err => console.error('Error fetching parcels:', err));
  };

  useEffect(() => {
    getParcels();
  }, []);

  // Handle form field changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation: trackingId required
  const validateForm = () => {
    if (!formData.trackingId.trim()) {
      setError('Tracking ID is required');
      return false;
    }
    setError('');
    return true;
  };

  // Add new parcel
  const handleAdd = () => {
    if (!validateForm()) return;

    setLoading(true);
    axios.post('http://localhost:8060/parcel/addParcel', formData)
      .then(() => {
        getParcels();
        setShowForm(false);
        setFormData(initialFormData);
      })
      .catch(err => console.error('Error adding parcel:', err))
      .finally(() => setLoading(false));
  };

  // Update existing parcel
  const handleUpdate = () => {
    if (!validateForm()) return;

    if (editId === null) {
      setError('No parcel selected to update');
      return;
    }

    setLoading(true);
    axios.put(`http://localhost:8060/parcel/updateParcel/${editId}`, formData)
      .then(() => {
        getParcels();
        setEditId(null);
        setShowForm(false);
        setFormData(initialFormData);
      })
      .catch(err => console.error('Error updating parcel:', err))
      .finally(() => setLoading(false));
  };

  // Delete parcel by id
  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this parcel?')) return;

    axios.delete(`http://localhost:8060/parcel/deleteParcel/${id}`)
      .then(() => getParcels())
      .catch(err => console.error('Error deleting parcel:', err));
  };

  // Load parcel data into form for editing
  const handleEdit = parcel => {
    setFormData({
      ...parcel,
      estimatedDelivery: parcel.estimatedDelivery ? parcel.estimatedDelivery.split('T')[0] : ''
    });
    setEditId(parcel.id);
    setShowForm(true);
    setError('');
  };

  return (
    <div className="track-container">
      <h2>📦 Track Your Parcels</h2>
      <button
        className="add-btn"
        onClick={() => {
          setFormData(initialFormData);
          setShowForm(true);
          setEditId(null);
          setError('');
        }}
      >
        ➕ Add Parcel
      </button>

      {showForm && (
        <div className="form-box">
          {error && <div style={{ color: 'red', marginBottom: '8px' }}>{error}</div>}

          <input
            type="text"
            name="trackingId"
            placeholder="Tracking ID *"
            value={formData.trackingId}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="sender"
            placeholder="Sender"
            value={formData.sender}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="recipientUsername"
            placeholder="Recipient Username"
            value={formData.recipientUsername}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="location"
            placeholder="Source Location"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="currentLocation"
            placeholder="Current Location"
            value={formData.currentLocation}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="date"
            name="estimatedDelivery"
            placeholder="Estimated Delivery"
            value={formData.estimatedDelivery}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
          />

          {editId !== null ? (
            <button onClick={handleUpdate} disabled={loading}>
              {loading ? 'Updating...' : '✅ Update'}
            </button>
          ) : (
            <button onClick={handleAdd} disabled={loading}>
              {loading ? 'Adding...' : '➕ Add'}
            </button>
          )}
          <button
            className="cancel-btn"
            onClick={() => {
              setShowForm(false);
              setError('');
              setLoading(false);
            }}
            disabled={loading}
          >
            ❌ Cancel
          </button>
        </div>
      )}

      <table className="parcel-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Recipient Username</th>
            <th>Description</th>
            <th>Location</th>
            <th>Current Location</th>
            <th>Estimated Delivery</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                No parcels found.
              </td>
            </tr>
          ) : (
            parcels.map(parcel => (
              <tr key={parcel.id}>
                <td>{parcel.trackingId}</td>
                <td>{parcel.sender}</td>
                <td>{parcel.recipientUsername}</td>
                <td>{parcel.description}</td>
                <td>{parcel.location}</td>
                <td>{parcel.currentLocation}</td>
                <td>{parcel.estimatedDelivery ? parcel.estimatedDelivery.split('T')[0] : ''}</td>
                <td>{parcel.status}</td>
                <td>
                  <button onClick={() => handleEdit(parcel)} disabled={loading}>✏️</button>
                  <button onClick={() => handleDelete(parcel.id)} disabled={loading}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackProgress;
