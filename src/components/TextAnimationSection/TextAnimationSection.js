import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TextAnimationSection.css";

gsap.registerPlugin(ScrollTrigger);

const TextAnimationSection = ({ textRef, heroRef, circleRef }) => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".text-wrap",
      {
        y: -500,
        scale: 0.2,
        borderRadius: "10rem",
      },
      {
        y: 0,
        scale: 1,
        borderRadius: "",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onEnterBack: () => {
            gsap.to(heroRef.current, { opacity: 1 });
          },
          onLeave: () => {
            gsap.to(heroRef.current, { opacity: 0 });
          },
        },
      }
    );

    const chars = textRef.current.querySelectorAll("span");

    tl.fromTo(
      ".text-wrap > div",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom top",
          scrub: true,
          // markers: true,
        },
      }
    );

    tl.fromTo(
      chars,
      { color: "rgb(121, 121, 121)" },
      {
        color: "#fff",
        ease: "none",

        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top top",
          end: "bottom bottom",
          // markers: true,
          scrub: true,
          onStart: () => {
            gsap.set(textRef.current, { opacity: 1 });
          },
          onLeave: () => {
            gsap.set(textRef.current, { opacity: 1 });
          },
        },
      }
    );
  }, [textRef, heroRef]);

  return (
    <section ref={textRef} className="text-animation-section">
      <div className="text-wrap">
        <div>
          {"저는 애니메이션을 좋아하는 주니어 개발자입니다."
            .split("")
            .map((char, index) => (
              <span key={index}>{char}</span>
            ))}
        </div>
        <div>
          {"팀원과의 소통과 협력을 중요하게 여기며 "
            .split("")
            .map((char, index) => (
              <span key={`part2-${index}`}>{char}</span>
            ))}
        </div>
        <div>
          {"다양한 프로젝트를 통해 지속적으로 성장하고 있습니다. "
            .split("")
            .map((char, index) => (
              <span key={`part3-${index}`}>{char}</span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TextAnimationSection;
