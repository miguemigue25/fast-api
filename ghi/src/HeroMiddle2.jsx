import React from "react";
import "./HeroMiddle.css";
import { Link } from "react-router-dom";

import Hero from "./assets/create2.png";

const HeroMiddle2 = () => {
  return (
    <div className="hero-timer-container">
      <div className="create-middle">
        <div className=" hero-timer-right hero-timer-left">
          <h2>Create flashcards</h2>
          <div className="images-container"></div>
          <img src={Hero} alt="" className="img" />
          <div className="bottom-text">
            Generate flashcards based on any subject
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
