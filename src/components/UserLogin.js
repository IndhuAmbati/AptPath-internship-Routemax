import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggle = () => setIsSignUp(!isSignUp);

  const handleSignIn = async () => {
    const { username, password } = signInData;
    if (!username || !password) return alert("Please fill in all fields.");

    try {
      const response = await axios.post("http://localhost:8060/account/login", {
        email: username,
        password,
      });
      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("username", response.data.username);
navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check credentials.");
    }
  };

  const handleSignUp = async () => {
    const { name, username, email, phone, password, confirmPassword } = signUpData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !username || !email || !phone || !password || !confirmPassword)
      return alert("Please fill in all fields.");
    if (!emailRegex.test(email)) return alert("Invalid email format.");
    if (!phoneRegex.test(phone)) return alert("Invalid 10-digit phone number.");
    if (password !== confirmPassword) return alert("Passwords do not match.");

    try {
      await axios.post("http://localhost:8060/account/register", {
        name,
        username,
        email,
        phoneNumber: phone,
        password,
        role: "USER",
      });
      alert("Sign up successful! Please sign in.");
      setIsSignUp(false);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Sign up failed. Try a different email.");
    }
  };

  const renderPasswordInput = (value, onChange, visible, toggleVisible) => (
    <div style={{ position: "relative" }}>
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        style={{ paddingRight: "30px" }}
      />
      <FontAwesomeIcon
        icon={visible ? faEyeSlash : faEye}
        onClick={toggleVisible}
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
  );

  return (
    <div className={`cont ${isSignUp ? "s--signup" : ""}`}>
      {/* Sign In Form */}
      <div className="form sign-in">
        <h2>User Login</h2>
        <label>
          <span>Username or Email</span>
          <input
            type="text"
            value={signInData.username}
            onChange={(e) =>
              setSignInData({ ...signInData, username: e.target.value })
            }
          />
        </label>
        <label>
          <span>Password</span>
          {renderPasswordInput(
            signInData.password,
            (e) => setSignInData({ ...signInData, password: e.target.value }),
            showSignInPassword,
            () => setShowSignInPassword(!showSignInPassword)
          )}
        </label>
        <button type="button" className="submit" onClick={handleSignIn}>
          Sign In
        </button>
      </div>

      {/* Toggle Sign In/Sign Up */}
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={handleToggle}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="form sign-up">
          <h2>Create User Account</h2>
          <label>
            <span>Full Name</span>
            <input
              type="text"
              value={signUpData.name}
              onChange={(e) =>
                setSignUpData({ ...signUpData, name: e.target.value })
              }
            />
          </label>
          <label>
            <span>Username</span>
            <input
              type="text"
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
          </label>
          <label>
            <span>Phone Number</span>
            <input
              type="text"
              value={signUpData.phone}
              onChange={(e) =>
                setSignUpData({ ...signUpData, phone: e.target.value })
              }
            />
          </label>
          <label>
            <span>Password</span>
            {renderPasswordInput(
              signUpData.password,
              (e) =>
                setSignUpData({ ...signUpData, password: e.target.value }),
              showSignUpPassword,
              () => setShowSignUpPassword(!showSignUpPassword)
            )}
          </label>
          <label>
            <span>Confirm Password</span>
            {renderPasswordInput(
              signUpData.confirmPassword,
              (e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                }),
              showConfirmPassword,
              () => setShowConfirmPassword(!showConfirmPassword)
            )}
          </label>
          <button type="button" className="submit" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
