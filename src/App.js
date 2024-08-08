import React, { useRef } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import TextAnimationSection from "./components/TextAnimationSection/TextAnimationSection";
import SkillsSection from "./components/SkillsSection";
import Circle from "./components/Circle";
import Test from "./components/FrontSkill";
import ProjectSection from "./components/ProjectsSection";
import CloneCircle from "./components/CloneCircle";

function App() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const circleRef = useRef(null);
  const cloneCircleRef = useRef(null);

  const skillRef = useRef(null);
  const spaceZero = useRef(null);
  const spaceReal = useRef(null);
  const spaceOneRef = useRef(null);

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
        style={{ height: "150vh" }}
        ref={spaceZero}
      ></div>

      <SkillsSection
        circleRef={circleRef}
        textRef={textRef}
        skillRef={skillRef}
        spaceZero={spaceZero}
        cloneCircleRef={cloneCircleRef}
        spaceReal={spaceReal}
      />
      <div
        className="space-one"
        style={{ height: "100vh", backgroundColor: "purple" }}
        ref={spaceOneRef}
      ></div>
      <ProjectSection
        circleRef={circleRef}
        skillRef={skillRef}
        spaceOneRef={spaceOneRef}
      />
      <div
        className="space-two"
        style={{ height: "1000vh", backgroundColor: "blue" }}
      ></div>

      {/* <Test /> */}
    </div>
  );
}

export default App;
