import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

import study from "./assets/study.png";

const HeroMiddle3 = () => {
  return (
    <div className="hero-timer-container">
      <div className="study-middle">
        <div className=" hero-timer-right hero-timer-left">
          <h2>Study and save your flashcard sets</h2>
          <div className="images-container"></div>
          <div className="bottom-text">
            Save your study sessions and all your generated flashcard sets.
            <img src={study} alt="" className="" />
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
