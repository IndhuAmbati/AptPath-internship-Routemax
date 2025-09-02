import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminDashBoard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formMode, setFormMode] = useState(""); // "create" or "edit"
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
     role: "USER"
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8060/admin/getAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchKeyword.trim()) {
        fetchUsers();
        return;
      }
      const response = await axios.get(`http://localhost:8060/admin/searchUsers/${searchKeyword}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", email: "", username: "", phoneNumber: "" });
    setFormMode("");
  };

  const handleCreateClick = () => {
    setFormData({ id: "", name: "", email: "", username: "", phoneNumber: "" });
    setFormMode("create");
  };

  const handleEditClick = (user) => {
    setFormData(user);
    setFormMode("edit");
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8060/admin/deleteUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === "create") {
        await axios.post("http://localhost:8060/admin/addUser", formData);
      } else if (formMode === "edit") {
        await axios.put(`http://localhost:8060/admin/updateUser/${formData.id}`, formData);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
      <div className="admin-dashboard">
      <div className="actions">
        <button className="create-user-btn" onClick={handleCreateClick}>Create User</button>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by name/email/phone"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {formMode && (
        <div className="form-container">
          <h3>{formMode === "create" ? "Create User" : "Edit User"}</h3>
          <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
            <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username" required />
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} placeholder="Phone Number" required />
            <button type="submit"
            style={{
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
            }}>{formMode === "create" ? "Create" : "Update"}</button>
            <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
          </form>
        </div>
      )}

      <div className="user-cards">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-avatar">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="avatar"
                />
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
              </div>
              <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
