import React from "react";
import { Hero } from "./hero";
import HeroMiddle from "./HeroMiddle";
import "./splash.css";
import HeroMiddle2 from "./HeroMiddle2";
import HeroMiddle3 from "./HeroMiddle3";
import Footer from "./footer";
import "./footer";

const Splash = () => {
  return (
    <div className="hero-gradient">
      <Hero />
      <div className="margin-space splash-container">
        <HeroMiddle />
        <HeroMiddle2 />
        <HeroMiddle3 />
      </div>
      <Footer />
    </div>
  );
};

export default Splash;
