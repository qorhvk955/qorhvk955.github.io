import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./CloneCircle.scss";

const CloneCircle = ({ cloneCircleRef }) => {
  return <div className="clone-circle" ref={cloneCircleRef}></div>;
};

export default CloneCircle;
