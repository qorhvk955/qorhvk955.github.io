import React, { useEffect, useRef } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import TextAnimationSection from "./components/TextAnimationSection/TextAnimationSection";
import SkillsSection from "./components/SkillsSection";
import Circle from "./components/Circle";
import Test from "./components/FrontSkill";
import ProjectSection from "./components/ProjectsSection";
import CloneCircle from "./components/CloneCircle";
import HistorySection from "./components/HistorySection";
import Contact from "./components/ContactSection";

function App() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const cloneCircleRef = useRef(null);
  const contactRef = useRef(null);

  const skillRef = useRef(null);
  const spaceZero = useRef(null);
  const spaceReal = useRef(null);
  const spaceOneRef = useRef(null);
  const historyRef = useRef(null);
  const spaceTwo = useRef(null);
  const projectRef = useRef(null);
  const spaceThree = useRef(null);
  return (
    <div>
      {/* <Header /> */}
      <HeroSection heroRef={heroRef} textRef={textRef} />
      <TextAnimationSection
        heroRef={heroRef}
        textRef={textRef}
        circleRef={circleRef}
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
        style={{ height: "300vh", backgroundColor: "yellow", zIndex: 9999 }}
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
        />
      </div>

      <div
        className="space-one"
        style={{ height: "200vh", backgroundColor: "blue", zIndex: 9999 }}
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
        />
      </div>
      <div
        className="space-two"
        style={{ height: "4000px", backgroundColor: "green" }}
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
        style={{ width: "100%", height: "300vh" }}
        ref={spaceThree}
      >
        <Contact
          historyRef={historyRef}
          contactRef={contactRef}
          spaceTwo={spaceTwo}
          spaceThree={spaceThree}
          circleRef={circleRef}
        />
      </div>
    </div>
  );
}

export default App;
