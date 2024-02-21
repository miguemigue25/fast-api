import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

import gif from "./assets/signup.svg";

const HeroMiddle = () => {
  return (
    <div className="featured">
      <div className="signup hero-timer-container">
        {" "}
        {/* Apply background color to signup class */}
        <div className="right hero-timer-right hero-timer-left">
          <h2>Signup to get started</h2>
          <div>
            <img src={gif} alt="" className="hero-timer-img" />
          </div>

          <p>Signup now and start creating your flashcards now!</p>
          <div className="input-container">
            <Link to="login">
              <button className="btn">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMiddle;
