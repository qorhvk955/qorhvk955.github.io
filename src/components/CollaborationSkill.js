import React, { useEffect, useRef } from "react";
import { ReactComponent as Collaboration } from "../assets/images/collaboration.svg";
import gsap from "gsap";

const CollaborationSkill = () => {
  const collaborationRef = useRef(null);
  const animationRef = useRef(null);
  useEffect(() => {
    const overlay = collaborationRef.current.querySelector("#overlay");
    const btn = collaborationRef.current.querySelector("#readMore");
    const btnStroke =
      collaborationRef.current.querySelector("#readMore-stroke");
    const btnText = collaborationRef.current.querySelector("#readMore-text");

    const icons = collaborationRef.current.querySelectorAll(".icon");

    gsap.set(btn, { opacity: 0 });

    if (collaborationRef.current) {
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
        const url = "https://www.notion.so/f162fcf78bbc44e19518e6eb6cc745a6";
        const features = `width=${width},height=${height},left=${left},top=${top}`;
        window.open(url, "_blank", features);
      };

      collaborationRef.current.addEventListener("mouseenter", onMouseEnter);
      collaborationRef.current.addEventListener("mouseleave", onMouseLeave);

      collaborationRef.current.addEventListener("click", onClickBtn);

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
        collaborationRef.current.removeEventListener(
          "mouseenter",
          onMouseEnter
        );
        collaborationRef.current.removeEventListener(
          "mouseleave",
          onMouseLeave
        );
      };
    }
  }, [collaborationRef]);
  return <Collaboration ref={collaborationRef} />;
};

export default CollaborationSkill;
