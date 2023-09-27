import React from "react";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Jaggery Cosmetics. All rights
        reserved. |{" "}
        <a className="footer-link" href="/privacy-policy">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a className="footer-link" href="/terms-of-service">
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
