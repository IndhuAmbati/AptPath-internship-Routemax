import React, { useState } from "react";
import "./AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    const { username, password } = signInData;
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8060/admin/login", signInData);
      if (res.status === 200) {
        navigate("/admin/landing");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="cont">
      <div className="form sign-in">
        <h2>Admin Login</h2>
        <label>
          <span>Username</span>
          <input
            type="text"
            value={signInData.username}
            onChange={(e) => setSignInData({ ...signInData, username: e.target.value })}
          />
        </label>

        <label>
          <span>Password</span>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={signInData.password}
              onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
              style={{ paddingRight: "30px" }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            />
          </div>
        </label>

        <button type="button" className="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </div>

      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>🛘 Not an admin?</h3>
            <button
              type="button"
              className="switch-btn"
              style={{ marginTop: "10px", color: "#fff", backgroundColor: "grey" }}
              onClick={() => navigate("/login/user")}
            >
              Go to User Login
            </button>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
