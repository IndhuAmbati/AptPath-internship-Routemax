// FeedbackForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css'; // Optional styling

const FeedbackForm = ({ parcel }) => {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comments) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8060/feedbacks/add", {
        trackingId: parcel.trackingId,
        username: parcel.recipientUsername,
        rating: parseInt(rating),
        comments: comments.trim()
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (parcel.status.toLowerCase() !== "delivered") return null;

  return (
    <div className="feedback-form-container">
      <h3>📝 Leave Feedback for Parcel: {parcel.trackingId}</h3>

      {submitted ? (
        <p>✅ Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="feedback-form">
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>

          <label>
            Comments:
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write your feedback here..."
              required
            />
          </label>

          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
