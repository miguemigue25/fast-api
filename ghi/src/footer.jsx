// Footer.js

import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-bg">
      <div className="container">
        <div>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1 className="text-color">
              Flashcard<span className="primary">Ai</span>
            </h1>
          </Link>
        </div>
        <div className="contact text-color">
          <div className="">
            <a href="/">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
