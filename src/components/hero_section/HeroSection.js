import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSection.scss";
import RollingText from "./RollingText";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ textRef, heroRef }) => {
  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-section__stage">
        <RollingText />
      </div>
      <div className="hero-section__description">-PORTFOLIO-</div>
    </section>
  );
};

export default HeroSection;
