import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Front } from "../../../assets/images/front.svg";
import gsap from "gsap";
// import "./Test.css";

const FrontSkill = () => {
  const frontRef = useRef(null);
  const animationRef = useRef(null);

  // const [btnClick, setBtnClick] = useState(0);

  useEffect(() => {
    const overlay = frontRef.current.querySelector("#overlay");
    const btn = frontRef.current.querySelector("#readMore");
    const btnStroke = frontRef.current.querySelector("#readMore-stroke");
    const btnText = frontRef.current.querySelector("#readMore-text");

    const icons = frontRef.current.querySelectorAll(".icon");

    gsap.set(btn, { opacity: 0 });

    if (frontRef.current) {
      const onMouseEnter = () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }

        const hover = gsap.timeline();
        animationRef.current = hover;

        hover
          .fromTo(
            icons,
            {
              y: 0,
            },
            {
              duration: 1,
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
        if (animationRef.current) {
          animationRef.current.kill();
        }

        const leave = gsap.timeline();
        animationRef.current = leave;

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

        const url = "https://www.notion.so/efe8e171fbf04f5687e69e9050f3960b";
        const features = `width=${width},height=${height},left=${left},top=${top}`;
        window.open(url, "_blank", features);
      };

      frontRef.current.addEventListener("mouseenter", onMouseEnter);
      frontRef.current.addEventListener("mouseleave", onMouseLeave);

      frontRef.current.addEventListener("click", onClickBtn);

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
        frontRef.current.removeEventListener("mouseenter", onMouseEnter);
        frontRef.current.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [frontRef]);

  return <Front ref={frontRef} />;
};

export default FrontSkill;
