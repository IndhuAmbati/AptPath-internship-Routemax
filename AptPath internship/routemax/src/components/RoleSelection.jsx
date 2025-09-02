import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const isLoggedIn = false; // change to true after login

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>📦 RouteGenius</div>
        <div style={styles.navLinks}>
          <Link to="/login/user" style={styles.loginBtn}>Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h1>Fast & Reliable Parcel Tracking</h1>
          <p>
            Track your packages in real-time, get instant updates, and never
            lose sight of your delivery.
          </p>
          <div style={styles.buttonGroup}>
            <Link
              to={isLoggedIn ? "/user/tracking" : "/login/user"}
              style={{ ...styles.btn, backgroundColor: "#002F6C", cursor: "pointer" }}
            >
              📍 Track Parcel
            </Link>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img
            src="https://eliteextra.com/wp-content/uploads/2022/02/AdobeStock_323227103-scaled.jpeg"
            alt="Parcel Tracking"
            style={{ width: "500px" }}
          />
        </div>
      </header>

      {/* How it Works */}
      <section style={styles.howItWorks}>
        <h2>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <span style={styles.stepIcon}>1️⃣</span>
            <p>Sign up or log in to your account</p>
          </div>
          <div style={styles.step}>
            <span style={styles.stepIcon}>2️⃣</span>
            <p>Enter your parcel tracking number</p>
          </div>
          <div style={styles.step}>
            <span style={styles.stepIcon}>3️⃣</span>
            <p>Get live updates on your shipment</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 RouteGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: { fontFamily: "'Segoe UI', sans-serif", color: "#333" },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 50px",
    backgroundColor: "#002F6C",
    color: "#fff",
    alignItems: "center",
  },
  logo: { fontSize: "22px", fontWeight: "bold" },
  navLinks: { display: "flex", gap: "20px" },
  loginBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background 0.3s",
    cursor: "pointer",
  },
  loginBtnHover: {
    backgroundColor: "#218838",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 50px",
    backgroundColor: "#f8f9fa",
  },
  heroText: { maxWidth: "50%" },
  buttonGroup: { marginTop: "20px", display: "flex", gap: "15px" },
  btn: {
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  heroImage: { maxWidth: "45%" },
  howItWorks: { padding: "50px", textAlign: "center" },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "20px",
  },
  step: {
    width: "200px",
    padding: "15px",
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(37, 82, 133, 1)",
  },
  stepIcon: { fontSize: "24px", display: "block", marginBottom: "8px" },
  footer: {
    backgroundColor: "#002F6C",
    color: "#fff",
    textAlign: "center",
    padding: "15px",
    marginTop: "40px",
  },
};

export default HomePage;
