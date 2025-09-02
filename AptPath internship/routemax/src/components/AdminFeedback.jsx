import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminFeedbacks.css';

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

 useEffect(() => {
  axios.get('http://localhost:8060/feedbacks/all')
    .then(response => {
      console.log("Fetched feedbacks:", response.data); // <-- DEBUG HERE
      setFeedbacks(response.data);
    })
    .catch(error => console.error('Error fetching feedbacks:', error));
}, []);


  return (
    <div className="admin-feedbacks">
      <h2>All User Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Username</th>
              <th>Rating</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, index) => (
              <tr key={index}>
                <td>{fb.trackingId}</td>
                <td>{fb.username}</td>
                <td>{'⭐'.repeat(fb.rating)}</td>
                <td>{fb.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFeedbacks;
