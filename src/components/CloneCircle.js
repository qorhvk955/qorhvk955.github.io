import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./CloneCircle.css";

const CloneCircle = ({ cloneCircleRef }) => {
  return <div className="clone-circle" ref={cloneCircleRef}></div>;
};

export default CloneCircle;
