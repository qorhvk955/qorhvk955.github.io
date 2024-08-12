import React, { useEffect, useRef } from "react";
import { ReactComponent as Back } from "../../../assets/images/back.svg";
import gsap from "gsap";

const BackSkill = () => {
  const backRef = useRef(null);
  const backAnimationRef = useRef(null);

  useEffect(() => {
    const overlay = backRef.current.querySelector("#overlay");
    const icons = backRef.current.querySelectorAll(".icon");

    const btn = backRef.current.querySelector("#readMore");
    const btnStroke = backRef.current.querySelector("#readMore-stroke");
    const btnText = backRef.current.querySelector("#readMore-text");

    gsap.set(btn, { pointerEvents: "auto" });
    gsap.set(btn, { opacity: 0 });

    const onMouseEnter = () => {
      if (backAnimationRef.current) {
        backAnimationRef.current.kill();
      }

      const hover = gsap.timeline();
      backAnimationRef.current = hover;

      hover
        .fromTo(
          icons,
          {
            y: 0,
          },
          {
            duration: 2,
            y: -10,
            rotationY: 0,
            ease: "elastic.out",
            stagger: 0.2,
          }
        )
        .to(overlay, { fillOpacity: 0.5 }, "<")
        .to(btn, { opacity: 1, zIndex: 9999 }, "<")
        .to(icons, {
          duration: 1,
          y: 0,
          ease: "elastic.out",
          stagger: 0.2,
        });
    };

    const onMouseLeave = () => {
      if (backAnimationRef.current) {
        backAnimationRef.current.kill();
      }

      const leave = gsap.timeline();
      backAnimationRef.current = leave;

      leave.set(overlay, { fillOpacity: 0 });
      leave.set(btn, { opacity: 0 });
      leave.set(icons, { y: 0 });
    };

    const onClickBtn = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const width = viewportWidth;
      const height = viewportHeight;
      const left = 0;
      const top = 0;
      const url = "https://www.notion.so/f162fcf78bbc44e19518e6eb6cc745a6";
      const features = `width=${width},height=${height},left=${left},top=${top}`;
      window.open(url, "_blank", features);
    };

    backRef.current.addEventListener("mouseenter", onMouseEnter);
    backRef.current.addEventListener("mouseleave", onMouseLeave);

    btn.addEventListener("click", onClickBtn);

    btn.addEventListener("mouseenter", () => {
      gsap.to(btnStroke, { stroke: "#fff", fill: "#fff" });
      gsap.to(btnText, { fill: "#000" });
      document.body.style.cursor = "pointer";
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btnStroke, { stroke: "white", fill: "" });
      gsap.to(btnText, { fill: "#fff" });
      document.body.style.cursor = "";
    });

    return () => {
      backRef.current.removeEventListener("mouseenter", onMouseEnter);
      backRef.current.removeEventListener("mouseleave", onMouseLeave);
      btn.removeEventListener("click", onClickBtn);
      btn.removeEventListener("mouseenter", () => {
        gsap.to(btnStroke, { stroke: "#fff", fill: "#fff" });
        gsap.to(btnText, { fill: "#000" });
        document.body.style.cursor = "pointer";
      });
      btn.removeEventListener("mouseleave", () => {
        gsap.to(btnStroke, { stroke: "white", fill: "" });
        gsap.to(btnText, { fill: "#fff" });
        document.body.style.cursor = "";
      });
    };
  }, []);

  return <Back ref={backRef} />;
};

export default BackSkill;
