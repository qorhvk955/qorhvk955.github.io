import React, { useEffect, useRef } from "react";
import "./ProjectsSection.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project from "../assets/images/project-presentation-svgrepo-com.svg";
import VideoPlayer from "../components/VideoPlayer";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = ({
  circleRef,
  skillRef,
  spaceOneRef,
  cloneCircleRef,
  historyRef,
  spaceTwo,
  projectRef,
}) => {
  const videoPlayerRef = useRef(null);
  const animationRef = useRef(null);
  const fillRef = useRef(null);

  let num;
  let divider;
  let total;

  useEffect(() => {
    if (!historyRef) return;
    ScrollTrigger.create({
      trigger: historyRef.current,
      start: "top top",
      onEnter: () => {
        if (videoPlayerRef.current) {
          videoPlayerRef.current.pause();
        }
      },
    });
  }, [historyRef]);

  useEffect(() => {
    if (circleRef.current) {
      num = circleRef.current.querySelector(".number");
      divider = circleRef.current.querySelector(".divider");
      total = circleRef.current.querySelector(".total");
    }
  }, [circleRef]);

  useEffect(() => {
    if (!projectRef.current || !spaceOneRef.current || !historyRef.current)
      return;

    const projectsRight = projectRef.current.querySelector(
      ".projects-section__right"
    );
    const projectsLeft = projectRef.current.querySelector(
      ".projects-section__left"
    );

    const playAni = () => {
      if (!historyRef || !historyRef.current) {
        console.error("histroyRef is undefined or null");
        return;
      }

      if (animationRef.current) animationRef.current.kill();
      const ani = gsap.timeline();
      animationRef.current = ani;
      ani
        // .to(projectRef.current, { position: "sticky", top: 0, left: 0 })
        .fromTo(
          projectsRight,
          {
            yPercent: 100,
            opacity: 1,
          },
          {
            yPercent: 0,
            duration: 0.2,
            onComplete: () => {
              if (videoPlayerRef.current) {
                videoPlayerRef.current.currentTime = 0;
                videoPlayerRef.current.play();
              }
            },
          }
        )
        .fromTo(
          projectsLeft,
          {
            yPercent: 100,
            opacity: 1,
          },
          {
            yPercent: 0,
            duration: 0.2,
          }
        );
    };

    const resetAni = () => {
      if (animationRef.current) animationRef.current.kill();
      const ani = gsap.timeline();
      animationRef.current = ani;

      if (videoPlayerRef.current) {
        videoPlayerRef.current.pause();
        videoPlayerRef.current.currentTime = 0;
      }

      ani.set(projectsRight, { yPercent: 0 });
      ani.set(projectsLeft, { yPercent: 0 });

      ani.set(projectsRight, { opacity: 0 });
      ani.set(projectsLeft, { opacity: 0 });

      // ani.to(projectRef.current, {
      //   position: "",
      // });
    };

    const leftTl = gsap.timeline({
      scrollTrigger: {
        trigger: spaceOneRef.current,
        start: "top bottom",
        // markers: true,
        // end: "bottom bottom",
        // scrub: true,
        onEnter: () => {
          gsap.to(projectRef.current, { position: "fixed" });
          const fill = gsap.timeline();
          const totalDegrees = 360;

          if (fillRef.current) fillRef.current.kill();
          fillRef.current = fill;

          fill.set(cloneCircleRef.current, { opacity: 1 });

          fill.to(cloneCircleRef.current, {
            duration: 0.7,

            onUpdate: function () {
              const progress = this.progress();
              const degrees = progress * totalDegrees;
              cloneCircleRef.current.style.background = `conic-gradient(black 0deg, black ${degrees}deg, transparent ${degrees}deg)`;
            },
            ease: "none",
            onComplete: () => {
              gsap.set(cloneCircleRef.current, { opacity: 0 });
              gsap.set(num, { text: "02" });
              gsap.set(divider, { opacity: 1 });
              gsap.set(total, { text: "04" });
              playAni();
            },
          });
        },

        onLeaveBack: () => {
          gsap.to(projectRef.current, { position: "" });

          gsap.set(num, { text: "01" });
          gsap.set(divider, { opacity: 1 });
          gsap.set(total, { text: "04" });
          resetAni();
        },
      },
    });
  }, [spaceOneRef, projectRef, historyRef]);

  // useEffect(() => {
  //   if (!spaceTwo) return;

  //   ScrollTrigger.create({
  //     trigger: spaceTwo.current,
  //     start: "top bottom",
  //     end: "bottom bottom",
  //     scrub: true,
  //     onEnter: () => {
  //       gsap.to(projectRef.current, { top: 0 });
  //     },
  //   });
  // }, [spaceTwo]);

  useEffect(() => {
    if (!historyRef) return;
    const historyLeft = historyRef.current.querySelector(".history-left");
    const historyRight = historyRef.current.querySelector(".history");
    const historyFirst = historyRef.current.querySelector(".first-c");

    if (circleRef.current) {
      num = circleRef.current.querySelector(".number");
      divider = circleRef.current.querySelector(".divider");
      total = circleRef.current.querySelector(".total");
    }

    const historyAni = () => {
      console.log("historyAni");
      if (animationRef.current) animationRef.current.kill();
      gsap.set(projectRef.current, { position: "" });

      const ani = gsap.timeline({
        onStart: () => {
          console.log("gggggggggggggg");

          gsap.set(historyRef.current, { opacity: 1 });
        },
      });
      animationRef.current = ani;

      gsap.set(num, { text: "03" });
      gsap.set(divider, { opacity: 1 });
      gsap.set(total, { text: "04" });

      ani
        .fromTo(
          historyRight,
          {
            opacity: 0,
            yPercent: 200,
          },
          {
            opacity: 1,
            yPercent: 0,
          }
        )

        .fromTo(
          historyLeft,
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
          }
        );
    };

    const historyAniReset = () => {
      if (animationRef.current) animationRef.current.kill();
      const ani = gsap.timeline();
      animationRef.current = ani;
      ani.set(historyLeft, { opacity: 0 });
      if (videoPlayerRef.current) {
        videoPlayerRef.current.play();
      }

      gsap.set(num, { text: "02" });
      gsap.set(divider, { opacity: 1 });
      gsap.set(total, { text: "04" });
    };

    ScrollTrigger.create({
      trigger: historyRef.current,
      start: "top top",
      onEnter: () => {
        gsap.set("body", { overflow: "hidden" });
        gsap.set("body", { overflow: "auto", delay: 1 });

        historyAni();
      },
      onLeaveBack: historyAniReset,
    });
  }, [historyRef]);

  return (
    <section className="projects-section" ref={projectRef}>
      <div className="projects-section__left">
        <div className="content-container">
          <div className="icon">
            <img src={project} alt="project-icon" id="computer-icon" />
          </div>
          <div className="title">Diverse Project Experience</div>
          <div className="subtitle">
            "팀원과의 소통과 협력을 중요시하고 아이디어를 현실로 만드는"
          </div>
          <div className="description">
            <p>
              퍼블리싱, 프론트엔드, 풀스택 프로젝트를 통해 다양한 기술 스택을
              익혔으며,
            </p>
            <p>
              어떤 환경에서도 팀과 원활하게 소통하며 협력하여 문제를 해결하고
            </p>
            <p>성공적인 성과를 창출할 수 있는 능력을 갖추고 있습니다.</p>
          </div>
        </div>
      </div>
      <div className="projects-section__right">
        <VideoPlayer ref={videoPlayerRef} />
      </div>
    </section>
  );
};

export default ProjectsSection;
