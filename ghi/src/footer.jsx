// Footer.js

import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";

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
      {/* <img src={logo} alt="Logo" className="logo-footer"></img> */}
    </div>
  );
};

export default Footer;
