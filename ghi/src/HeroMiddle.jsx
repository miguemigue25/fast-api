import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

import signup from "./assets/signup.png";
const HeroMiddle = () => {
  return (
    <div className="hero-timer-container">
      <div className="signup">
        <div className=" hero-timer-right hero-timer-left">
          <Link to="login">
            <h2>Signup to get started</h2>
          </Link>
          <div className="images-container"></div>
          <div className="bottom-text">
            Signup now and start creating your flashcards now!
          </div>
          <img src={signup} alt="" className="" />
          <div className="input-container">
            {/* <Link to="login">
              <button className="btn">Get Started</button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMiddle;
