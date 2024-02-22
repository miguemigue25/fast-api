import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

// import logo from "./assets/logo.png";

const HeroMiddle2 = () => {
  return (
    <div className="hero-timer-container">
      <div className="signup">
        <div className=" hero-timer-right hero-timer-left">
          <h2>Create flashcards</h2>
          <div className="images-container">
            {/* <img src={logo} alt="" className="hero-timer-img" /> */}
          </div>
          <div className="bottom-text">
            Generate your custom flashcards based on your natural language
            prompt input.
          </div>
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

export default HeroMiddle2;
