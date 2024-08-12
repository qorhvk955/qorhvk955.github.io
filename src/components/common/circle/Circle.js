import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./Circle.scss";

const Circle = ({ circleRef, textRef }) => {
  return (
    <div className="circle" ref={circleRef}>
      <div className="circle-content">
        <div className="number"></div>
        <div className="divider"></div>
        <div className="total"></div>
      </div>
    </div>
  );
};

export default Circle;
