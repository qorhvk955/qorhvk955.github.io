import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);


const HeroSection = ( { textRef, heroRef } ) => {


  // useEffect(() => {

  //   if(textRef && heroRef){

  //     console.log("@@@@@@@@@@")


  //     gsap.fromTo( textRef.current, {
  //       y: -1000,
  //       scale: 0.2
  //     },{
  //       y : 0,
  //       scale: 1,
        
  //       scrollTrigger : {
  //         trigger: heroRef.current,
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: true,
  //         markers: true,
  //       }          
  //     })
  //   }
  // }, [textRef, heroRef]);

  return (
    <section ref={heroRef} className="hero-section">
      <h2>Hero Section</h2>
    </section>
  );
}

export default HeroSection;
