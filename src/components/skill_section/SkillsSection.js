import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./SkillsSection.scss";
import FrontSkill from "./skills/FrontSkill";
import BackSkill from "./skills/BackSkill";
import CollaborationSkill from "./skills/CollaborationSkill";

import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import computer from "../../assets/images/computer-svgrepo-com.svg";

gsap.registerPlugin(TextPlugin);

const SkillsSection = ({
  circleRef,
  textRef,
  skillRef,
  spaceZero,
  cloneCircleRef,
  spaceReal,
  spaceOneRef,
  tl2,
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const fillRef = useRef(null);
  const rightRef = useRef(null);

  let num, divider, total;

  const move = () => {
    const svg = rightRef.current.querySelectorAll("svg");

    tl2.current = gsap.timeline({
      repeat: -1,
      paused: true,

      defaults: {
        duration: 1,
        ease: "power1.inOut",
        immediateRender: false,
      },
    });
    tl2.current
      .set(["#o-box1", "#o-box2", "#o-box3"], {
        xPercent: 0,
        scale: 1,
      })
      .set(["#c-box1", "#c-box2", "#c-box3"], {
        xPercent: 0,
        scale: 1,
      })

      .to("#o-box1", { xPercent: -50, duration: 0, delay: 0 })
      .to("#o-box2", { scale: 1.2, duration: 0, delay: 0 }, "<")
      .to("#o-box3", { xPercent: 50, duration: 0, delay: 0 }, "<")

      .to("#o-box1", { scale: 1, xPercent: "-=100", delay: 1 })
      .to("#o-box2", { scale: 1, xPercent: "-=150" }, "<")
      .to("#o-box3", { xPercent: -100, scale: 1.2 }, "<")
      .to("#c-box1", { xPercent: -50 }, "<")
      .set("#o-box1", { xPercent: "+=600", delay: 0 })

      .to("#o-box3", { scale: 1, xPercent: "-=150", delay: 1 })
      .to("#o-box2", { xPercent: "-=100" }, "<")
      .to("#c-box1", { xPercent: "-=150", scale: 1.2 }, "<")
      .to("#c-box2", { xPercent: "-=150" }, "<")
      .set("#o-box2", { xPercent: "+=600", delay: 0 })

      .to("#c-box1", { scale: 1, xPercent: "-=150", delay: 1 })
      .to("#o-box3", { xPercent: "-=100" }, "<")
      .to("#c-box2", { xPercent: "-=150", scale: 1.2 }, "<")
      .to("#c-box3", { xPercent: "-=250" }, "<")
      .set("#o-box3", { xPercent: "+=600", delay: 0 })

      .to("#c-box2", { scale: 1, xPercent: "-=150", delay: 1 })
      .to("#c-box1", { xPercent: "-=100" }, "<")
      .to("#c-box3", { xPercent: "-=150", scale: 1.2 }, "<")
      .to("#c-box3", { xPercent: "-=150" }, "<")
      .to("#o-box1", { xPercent: "-=200" }, "<")
      .set("#c-box1", { xPercent: "+=600", delay: 0 })

      .to("#c-box3", { scale: 1, xPercent: "-=150", delay: 1 })
      .to("#c-box2", { xPercent: "-=100" }, "<")
      .to("#o-box1", { xPercent: "-=150", scale: 1.2 }, "<")
      .to("#o-box2", { xPercent: "-=200" }, "<")
      .set("#c-box2", { xPercent: "+=600", delay: 0 })

      .to("#o-box1", { scale: 1, xPercent: "-=150", delay: 1 })
      .to("#c-box3", { xPercent: "-=100" }, "<")
      .to("#o-box2", { xPercent: "-=150", scale: 1.2 }, "<")
      .to("#o-box3", { xPercent: "-=200" }, "<")
      .set("#c-box3", { xPercent: "+=600", delay: 0 });

    svg.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        tl2.current.pause();
      });

      item.addEventListener("mouseleave", () => {
        tl2.current.play();
      });
    });
  };

  useEffect(() => {
    if (circleRef.current) {
      num = circleRef.current.querySelector(".number");
      divider = circleRef.current.querySelector(".divider");
      total = circleRef.current.querySelector(".total");
    }
  }, [circleRef]);

  const circleText = () => {
    gsap.set(num, { text: "01" });
    gsap.to(divider, { duration: 0.5, opacity: 1, ease: "none" });
    gsap.set(total, { text: "03" });
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const space = spaceZero.current;
    const contetnLeft = skillRef.current.querySelector(".skills-section__left");
    const contetnRight = skillRef.current.querySelector(
      ".skills-section__right"
    );

    if (textRef.current && skillRef.current && cloneCircleRef.current) {
      const highlight = skillRef.current.querySelectorAll(".highlight");

      ScrollTrigger.create({
        trigger: spaceZero.current,
        start: "top top",
        scrub: true,
        onEnter: () => {
          gsap.set(skillRef.current, { opacity: 1 });
          gsap.set("body", {
            overflow: "hidden",
            onComplete: () => {
              gsap.set("body", { overflow: "auto", delay: 1 });
            },
          });

          gsap.fromTo(
            document.querySelector("#computer-icon"),
            {
              y: 50,
              rotationY: -90,
            },
            {
              duration: 1.5,
              y: 0,
              force3D: true,
              ease: "elastic.out",
              stagger: 0.08,
              rotationY: 0,
              repeat: -1,
              yoyo: true,
            }
          );
        },
        onEnterBack: () => {
          gsap.set(skillRef.current, { opacity: 1 });
        },
        onLeave: () => {
          gsap.set(skillRef.current, { opacity: 0, delay: 1 });
        },
      });

      gsap.fromTo(
        circleRef.current,
        {
          scale: 9,
        },
        {
          scale: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
            onLeaveBack: () => {
              gsap.set(textRef.current, { opacity: 1 });
              gsap.set(circleRef.current, { opacity: 0 });
            },
            onEnter: () => {
              gsap.set(num, { text: "" });
              gsap.set(divider, { opacity: 0 });
              gsap.set(total, { text: "" });

              gsap.set(textRef.current, { opacity: 0 });
              gsap.set(circleRef.current, { opacity: 1 });
            },
          },
          onComplete: () => {},
        }
      );

      gsap.to(cloneCircleRef.current, {
        scrollTrigger: {
          trigger: spaceReal.current,
          start: "top top",
          end: "bottom top",

          onLeaveBack: () => {
            const fill = gsap.timeline();

            if (fillRef.current) fillRef.current.kill();
            fillRef.current = fill;

            gsap.set(cloneCircleRef.current, {
              background: "",
            });

            gsap.set(num, { text: "" });
            gsap.set(divider, { opacity: 0 });
            gsap.set(total, { text: "" });
          },

          onEnter: () => {
            const fill = gsap.timeline();
            const totalDegrees = 360;

            if (fillRef.current) fillRef.current.kill();
            fillRef.current = fill;

            fill.set(cloneCircleRef.current, { opacity: 1 });

            fill.to(cloneCircleRef.current, {
              duration: 0.1,

              onUpdate: function () {
                const progress = this.progress();
                const degrees = progress * totalDegrees;
                cloneCircleRef.current.style.background = `conic-gradient(black 0deg, black ${degrees}deg, transparent ${degrees}deg)`;
              },
              ease: "none",
            });
          },

          onLeave: () => {
            gsap.set(cloneCircleRef.current, { opacity: 0 });
            gsap.set(num, { text: "01" });
            gsap.set(divider, { opacity: 1 });
            gsap.set(total, { text: "04" });
          },
        },
        onComplete: () => {},
      });

      gsap.to(skillRef.current, {
        scrollTrigger: {
          trigger: space,
          start: "top top",
          scrub: true,
          // markers: true,
          onEnter: () => {
            gsap.to(skillRef.current, { position: "fixed" });
          },
          onLeaveBack: () => {
            gsap.to(skillRef.current, { position: "" });
          },
        },
      });

      gsap.to(contetnRight, {
        scrollTrigger: {
          trigger: space,
          start: "top top",
          onLeaveBack: () => {
            if (tl2.current) tl2.current.kill();

            gsap.set(contetnRight, {
              yPercent: 100,
              // opacity: 0,
            });

            gsap.set(contetnLeft, {
              yPercent: 100,
              opacity: 0,
            });

            gsap.set(
              [
                "#o-box1",
                "#o-box2",
                "#o-box3",
                "#c-box1",
                "#c-box2",
                "#c-box3",
              ],
              {
                xPercent: 0,
                scale: 1,
              }
            );
          },
          onEnter: () => {
            if (tl2.current) tl2.current.kill();
            gsap.set(
              [
                "#o-box1",
                "#o-box2",
                "#o-box3",
                "#c-box1",
                "#c-box2",
                "#c-box3",
              ],
              {
                xPercent: 0,
                scale: 1,
              },
              gsap.to(contetnRight, { opacity: 1 })
            );

            gsap.set("#o-box1", { xPercent: -50 });
            gsap.set("#o-box2", { scale: 1.2 }, "<");
            gsap.set("#o-box3", { xPercent: 50 }, "<");
            move();
            gsap.fromTo(
              contetnRight,
              { yPercent: 100, opacity: 1 },
              {
                yPercent: 0,
              }
            );

            gsap.fromTo(
              contetnLeft,
              { yPercent: 100, opacity: 1 },
              {
                delay: 0.5,
                yPercent: 0,
                onComplete: () => {
                  tl2.current.play();
                },
              }
            );
          },
        },

        yPercent: 0,
        delay: 0.5,
      });
    }
  }, []);

  useEffect(() => {
    if (!spaceOneRef) return;

    ScrollTrigger.create({
      trigger: spaceOneRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
      onEnter: () => {
        // gsap.to(skillRef.current, { position: "fixed" });
      },
    });
  }, [spaceOneRef]);

  return (
    <>
      <section ref={skillRef} className="skills-section">
        <div className="skills-section__left">
          <div className="content-container">
            <div className="icon">
              <img src={computer} alt="Computer" id="computer-icon" />
            </div>
            <div className="title">Interactive Web Development</div>
            <div className="subtitle">
              애니메이션과 모션 디자인을 좋아하는 주니어 풀스택 개발자
            </div>
            <div className="description">
              <p>
                저는{" "}
                {"매력적이고 생동감이 넘치는 웹을 구현"
                  .split("")
                  .map((char, index) => (
                    <span key={index} className="highlight">
                      {char}
                    </span>
                  ))}
                하는데 열정을 가지고 있습니다.
              </p>
              <p>
                {"디자인과 개발에 대한 이해".split("").map((char, index) => (
                  <span key={index} className="highlight">
                    {char}
                  </span>
                ))}
                를 바탕으로, 프로젝트를 보다 입체적이고
              </p>
              <p>
                {"다양한 관점에서 접근".split("").map((char, index) => (
                  <span key={index} className="highlight">
                    {char}
                  </span>
                ))}
                하여{" "}
                {"최상의 결과물".split("").map((char, index) => (
                  <span key={index} className="highlight">
                    {char}
                  </span>
                ))}
                을 만들어내기 위해 노력하고 있습니다.
              </p>
            </div>
            <button
              className="read-more-btn"
              onClick={() => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const width = viewportWidth;
                const height = viewportHeight;
                const left = 0;
                const top = 0;
                const url = "./skills_detail.html";
                const features = `width=${width},height=${height},left=${left},top=${top}`;
                window.open(url, "_blank", features);
              }}
            >
              Read More
            </button>
          </div>
        </div>
        <div className="skills-section__right" ref={rightRef}>
          <div className="container">
            <div className="original">
              <div className="box" id="o-box1">
                <FrontSkill />
              </div>
              <div className="box" id="o-box2">
                <BackSkill />
              </div>
              <div className="box" id="o-box3">
                <CollaborationSkill />
              </div>
            </div>
            <div className="clone">
              <div className="box" id="c-box1">
                <FrontSkill />
              </div>
              <div className="box" id="c-box2">
                <BackSkill />
              </div>
              <div className="box" id="c-box3">
                <CollaborationSkill />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
