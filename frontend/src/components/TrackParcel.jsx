import React, { useState } from 'react';
import axios from 'axios';
import './TrackParcel.css';

const statusStages = ['Pending', 'Dispatched', 'In Transit', 'Delivered'];

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError('❗ Please enter a tracking ID.');
      setParcel(null);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8060/parcel/track/${trackingId}`);
      setParcel(res.data);
      setError('');
    } catch (err) {
      setParcel(null);
      setError('❌ Parcel not found. Please check your tracking ID.');
    }
  };

  const getStatusIndex = (status) => {
    return statusStages.findIndex(
      (s) => s.toLowerCase() === status?.toLowerCase()
    );
  };

  const currentStatusIndex = getStatusIndex(parcel?.status);

  return (
    <div className="track-user-container">
      <h2>📦 Quick Parcel Tracking</h2>

      <div className="track-form">
        <input
          type="text"
          placeholder="Enter your tracking ID (e.g., TS101)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={handleTrack}>Track Parcel</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {parcel && (
        <div className="parcel-info">
          <h3>Parcel Details</h3>
          <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
          <p><strong>Sender:</strong> {parcel.sender || 'N/A'}</p>
          <p><strong>Recipient:</strong> {parcel.recipientUsername || 'N/A'}</p>
          <p><strong>Description:</strong> {parcel.description || 'N/A'}</p>
          <p><strong>Status:</strong> {parcel.status || 'N/A'}</p>
          <p><strong>Source Location:</strong> {parcel.location || 'N/A'}</p>
          <p><strong>Current Location:</strong> {parcel.currentLocation || 'N/A'}</p>
          <p><strong>Estimated Delivery:</strong> {parcel.estimatedDelivery || 'N/A'}</p>

          <div className="status-bar">
            {statusStages.map((stage, index) => (
              <div className="status-step-wrapper" key={stage}>
                {index > 0 && (
                  <div
                    className={`line ${
                      index <= currentStatusIndex ? 'active' : ''
                    }`}
                  />
                )}
                <div
                  className={`circle ${
                    index <= currentStatusIndex ? 'active' : ''
                  }`}
                />
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
