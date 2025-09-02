import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserNotification() {
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState('');
  const [feedbackVisibleFor, setFeedbackVisibleFor] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")?.trim();
    if (storedUsername) {
      setUsername(storedUsername);
      axios.get(`http://localhost:8060/notifications/user/${storedUsername}`)
        .then(res =>
          setNotifications(
            res.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          )
        )
        .catch(err => console.error("Error fetching user notifications", err));
    }
  }, []);

  const handleSubmitFeedback = (trackingId) => {
    const feedback = {
      trackingId,
      rating,
      comments: comment,
      username
    };

    axios.post("http://localhost:8060/feedbacks/add", feedback)
      .then(() => {
        alert("Feedback submitted successfully!");
        setFeedbackVisibleFor(null);
        setComment('');
        setRating(5);
      })
      .catch(err => {
        console.error("Error submitting feedback", err);
        alert("Failed to submit feedback.");
      });
  };

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f9fbfd',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ marginBottom: 20, color: '#2c3e50' }}>
        📩 {username ? `${username}'s` : 'Your'} Notifications
      </h2>

      {notifications.length === 0 ? (
        <p style={{ color: '#777' }}>No notifications found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {notifications.map((notif) => {
            const isDelivered = notif.message.includes("DELIVERED");
            const trackingIdMatch = notif.message.match(/Tracking ID: (\w+)/);
            const trackingId = trackingIdMatch ? trackingIdMatch[1] : null;

            return (
              <div key={notif.id} style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 12,
                borderLeft: '5px solid #3e4db1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <p style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: 10
                }}>
                  {notif.message}
                </p>
                <p style={{ color: '#888', fontSize: 12 }}>
                  ⏰ {new Date(notif.timestamp).toLocaleString()}
                </p>

                {isDelivered && trackingId && (
                  <div style={{ marginTop: 15 }}>
                    <button
                      style={{
                        backgroundColor: '#002F6C',
                        color: 'white',
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer'
                      }}
                      onClick={() => setFeedbackVisibleFor(trackingId)}
                    >
                      📝 Submit Feedback
                    </button>

                    {feedbackVisibleFor === trackingId && (
                      <div style={{
                        marginTop: 15,
                        backgroundColor: '#f1f1f1',
                        padding: 15,
                        borderRadius: 8
                      }}>
                        <div style={{ marginBottom: 10 }}>
                          <label style={{ fontWeight: 500 }}>Rating:</label><br />
                          <div>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <span
                                key={num}
                                onClick={() => setRating(num)}
                                style={{
                                  fontSize: 24,
                                  cursor: 'pointer',
                                  color: num <= rating ? '#f1c40f' : '#ccc',
                                  marginRight: 4
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: 10 }}>
                          <label style={{ fontWeight: 500 }}>Comments:</label><br />
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            placeholder="Write your feedback..."
                            style={{
                              width: '100%',
                              padding: 8,
                              borderRadius: 6,
                              border: '1px solid #ccc',
                              marginTop: 6
                            }}
                          />
                        </div>

                        <button
                          onClick={() => handleSubmitFeedback(trackingId)}
                          style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '8px 14px',
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          ✅ Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserNotification;
