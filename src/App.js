import React, { useEffect, useRef } from "react";

import Header from "./components/header_section/Header";
import HeroSection from "./components/hero_section/HeroSection";
import TextAnimationSection from "./components/textAnimation_section/TextAnimationSection";
import SkillsSection from "./components/skill_section/SkillsSection";
import ProjectSection from "./components/project_section/ProjectsSection";
import HistorySection from "./components/history_section/HistorySection";
import ContactSection from "./components/contact_section/ContactSection";

import Circle from "./components/common/circle/Circle";
import CloneCircle from "./components/common/circle/CloneCircle";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const cloneCircleRef = useRef(null);
  const contactRef = useRef(null);
  const logoRef = useRef(null);

  const skillRef = useRef(null);
  const spaceZero = useRef(null);
  const spaceReal = useRef(null);
  const spaceOneRef = useRef(null);
  const historyRef = useRef(null);
  const spaceTwo = useRef(null);
  const projectRef = useRef(null);
  const spaceThree = useRef(null);
  const navRef = useRef(null);

  const tl2 = useRef(null);
  const homeSectionRef = heroRef;
  const skillSectionRef = spaceZero;
  const projectSectionRef = spaceOneRef;
  const timelineSectionRef = spaceTwo;
  const contactSectionRef = spaceThree;

  const scrollToSection = (section) => {
    switch (section) {
      case "home":
        window.scrollTo({
          top: homeSectionRef.current.offsetTop,
          behavior: "smooth",
        });

        break;
      case "skill":
        window.scrollTo({
          top: skillSectionRef.current.offsetTop + 10,
          behavior: "smooth",
        });

        break;
      case "project":
        window.scrollTo({
          top: projectSectionRef.current.offsetTop + 10,
          behavior: "smooth",
        });
        break;
      case "timeline":
        window.scrollTo({
          top: timelineSectionRef.current.offsetTop + 10,
          behavior: "smooth",
        });
        break;
      case "contact":
        window.scrollTo({
          top: contactSectionRef.current.offsetTop + 10,
          behavior: "smooth",
        });
        break;
      // default:
      //   break;
    }
  };

  return (
    <div className="wrap">
      <Header
        navRef={navRef}
        logoRef={logoRef}
        scrollToSection={scrollToSection}
      />
      <HeroSection heroRef={heroRef} textRef={textRef} />
      <TextAnimationSection
        heroRef={heroRef}
        textRef={textRef}
        circleRef={circleRef}
        navRef={navRef}
        logoRef={logoRef}
      />
      <div
        className="space-start-real"
        style={{ height: "100vh" }}
        ref={spaceReal}
      ></div>
      <Circle circleRef={circleRef} textRef={textRef} />
      <CloneCircle cloneCircleRef={cloneCircleRef} />

      <div
        className="space-zero"
        style={{
          height: "150vh",
          // backgroundColor: "rgba(255,0,0,0.2)",
          zIndex: 9999,
        }}
        ref={spaceZero}
      >
        <SkillsSection
          circleRef={circleRef}
          textRef={textRef}
          skillRef={skillRef}
          spaceZero={spaceZero}
          cloneCircleRef={cloneCircleRef}
          spaceReal={spaceReal}
          spaceOneRef={spaceOneRef}
          tl2={tl2}
        />
      </div>

      <div
        className="space-one"
        style={{
          height: "150vh",
          // backgroundColor: "rgba(0,255,0,0.2)",
          zIndex: 9999,
        }}
        ref={spaceOneRef}
      >
        <ProjectSection
          circleRef={circleRef}
          skillRef={skillRef}
          spaceOneRef={spaceOneRef}
          cloneCircleRef={cloneCircleRef}
          historyRef={historyRef}
          spaceTwo={spaceTwo}
          projectRef={projectRef}
          tl2={tl2}
        />
      </div>
      <div
        className="space-two"
        style={{
          height: "4000px",
          // , backgroundColor: "green"
        }}
        ref={spaceTwo}
      >
        <HistorySection
          historyRef={historyRef}
          spaceTwo={spaceTwo}
          projectRef={projectRef}
          spaceOneRef={spaceOneRef}
          contactRef={contactRef}
          circleRef={circleRef}
        />
      </div>

      <div
        className="space-three"
        style={{ width: "100%", height: "150vh" }}
        ref={spaceThree}
      >
        <ContactSection
          historyRef={historyRef}
          contactRef={contactRef}
          spaceTwo={spaceTwo}
          spaceThree={spaceThree}
          circleRef={circleRef}
          cloneCircleRef={cloneCircleRef}
        />
      </div>
    </div>
  );
};

export default App;
