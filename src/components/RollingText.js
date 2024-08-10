import React, { useEffect, useRef } from "react";
import gsap from "gsap";
// import "./RollingText.scss";

const RollingText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const text = textElement.innerText;
    textElement.innerHTML = "";
    const spans = [];
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.classList.add("char");
      span.innerHTML = `<div class="originalText">${char}</div><div class="cloneText">${char}</div>`;
      textElement.appendChild(span);
      spans.push(span);
      gsap.set(span.children[1], { yPercent: i % 2 === 0 ? -100 : 100 });
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .to([span.children[0], span.children[1]], {
          yPercent: i % 2 === 0 ? "+=100" : "-=100",
          ease: "none",
          duration: 4,
          stagger: {
            each: 0.1,
            ease: "none",
          },
        });
    });
  }, []);

  return (
    <h1 className="hero-section__rolling-text" ref={textRef}>
      JungHee
    </h1>
  );
};

export default RollingText;
