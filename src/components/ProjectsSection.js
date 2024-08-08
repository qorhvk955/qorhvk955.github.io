import React, { useEffect, useRef } from "react";
import "./ProjectsSection.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project from "../assets/images/project-presentation-svgrepo-com.svg";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({ circleRef, skillRef, spaceOneRef }) => {
  console.log("skillRef.current", skillRef.current);
  const projectsRef = useRef(null);
  let num;
  let divider;
  let total;

  useEffect(() => {
    if (circleRef.current) {
      num = circleRef.current.querySelector(".number");
      divider = circleRef.current.querySelector(".divider");
      total = circleRef.current.querySelector(".total");
    }
  }, [circleRef.current]);

  // useEffect(() => {
  //   if (skillRef.current) {
  //     if (projectsRef.current) {
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: skillRef.current,
  //           start: "bottom top",
  //           end: "bottom top",
  //           scrub: true,
  //           // markers: true,
  //           onEnter: () => {
  //             console.log("@@@@");
  //             gsap.set(num, { text: "02" });
  //             gsap.to(divider, { duration: 0.5, opacity: 1, ease: "none" });
  //             gsap.set(total, { text: "03" });
  //           },
  //         },
  //       });
  //     }
  //   }
  // }, [projectsRef, skillRef]);

  useEffect(() => {
    const left = projectsRef.current.querySelector(".projects-section__left");
    const right = projectsRef.current.querySelector(".projects-section__right");

    if (spaceOneRef.current && projectsRef.current) {
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: spaceOneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });

      leftTl.to(projectsRef.current, { zIndex: 999 });

      gsap.to(projectsRef.current, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top top",
          end: "top top",
          scrub: true,
          markers: true,
        },
        position: "fixed",
        top: 0,
        left: 0,
      });

      // leftTl.to(skillRef.current, { opacity: 0 });
      // leftTl.to(projectsRef.current, { position: "sticky", top: 0, left: 0 });
      // gsap.fromTo(
      //   left,
      //   { yPercent: 100, opacity: 1 },
      //   { yPercent: 0, duration: 1 }
      // );
    }
  }, [spaceOneRef, projectsRef, skillRef]);

  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: ".space-one",
  //     start: "bottom bottom",
  //     end: "bottom bottom",

  //     snap: true,
  //     onEnter: () => {
  //       console.log("트리거 동작");
  //       gsap.to(skillRef.current, { opacity: 0 });
  //       gsap.to(projectsRef.current, { position: "fixed", top: 0, left: 0 });
  //       gsap.set(num, { text: "02" });
  //       gsap.set(divider, { duration: 0.5, opacity: 1, ease: "none" });
  //       gsap.set(total, { text: "03" });
  //     },
  //     onLeaveBack: () => {
  //       gsap.to(skillRef.current, { opacity: 1 });

  //       gsap.to(projectsRef.current, { position: "" });
  //       gsap.set(num, { text: "01" });
  //       gsap.set(divider, { duration: 0.5, opacity: 1, ease: "none" });
  //       gsap.set(total, { text: "03" });
  //     },
  //     markers: true,
  //   });
  // }, []);

  return (
    <>
      <section className="projects-section" ref={projectsRef}>
        <div className="projects-section__left">
          <div className="content-container">
            <div className="icon">
              <img src={project} alt="project-icon" id="computer-icon" />
            </div>
            <div className="title">Interactive Web Development</div>
            <div className="subtitle">
              애니메이션과 모션 디자인을 좋아하는 주니어 풀스택 개발자
            </div>
            <div className="description">
              <p>
                저는{" "}
                <span className="highlight">
                  매력적이고 생동감이 넘치는 웹을 구현
                </span>
                하는데 열정을 가지고 있습니다.
              </p>
              <p>
                <span className="highlight">디자인과 개발에 대한 이해</span>를
                바탕으로, 프로젝트를 보다 입체적이고{" "}
              </p>
              <p>
                <span className="highlight">다양한 관점에서 접근</span>하여{" "}
                <span className="highlight">최상의 결과물</span>을 만들어내기
                위해 노력하고 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="projects-section__right"></div>
      </section>
    </>
  );
};
export default ProjectsSection;
