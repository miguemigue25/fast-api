import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

import hero from "./assets/hero.png";

const HeroMiddle3 = () => {
  return (
    <div className="hero-timer-container">
      <div className="signup">
        <div className=" hero-timer-right hero-timer-left">
          <h2>Study and save your flashcard sets</h2>
          <div className="images-container">
            {/* <img src={hero} alt="" className="hero-timer-img" /> */}
          </div>
          <div className="bottom-text">
            Save your study sessions and all your generated flashcard sets.
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

export default HeroMiddle3;
