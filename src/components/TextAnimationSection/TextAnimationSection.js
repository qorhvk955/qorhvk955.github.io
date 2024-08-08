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
      },
      {
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      }
    );

    const chars = textRef.current.querySelectorAll("span");
    console.log(chars);

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
          {"모바일 마케팅 전문 회사로,".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
        <div>
          {"2024년부터 1년간 어쩌구 저쩌구 ".split("").map((char, index) => (
            <span key={`part2-${index}`}>{char}</span>
          ))}
        </div>
        <div>
          {"세번째 1년간 어쩌구 저쩌구 ".split("").map((char, index) => (
            <span key={`part3-${index}`}>{char}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TextAnimationSection;
