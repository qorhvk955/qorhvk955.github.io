import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as ContactSVG } from "../../assets/images/contact.svg";
import gsap from "gsap";
import "./ContactSection.scss";
import Modal from "../common/modal/Modal";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CloneCircle from "../common/circle/CloneCircle";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = ({
  historyRef,
  contactRef,
  spaceTwo,
  spaceThree,
  circleRef,
  cloneCircleRef,
}) => {
  const animationRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility

  useEffect(() => {
    if (!contactRef || !historyRef || !spaceTwo || !spaceThree || !circleRef)
      return;

    const textRolling = contactRef.current.querySelector("#text");
    const textEllipse = contactRef.current.querySelector("#ellipse");

    ScrollTrigger.create({
      trigger: spaceTwo.current,
      start: "bottom-=50 bottom",
      onEnter: () => {
        gsap.set(circleRef.current, { opacity: 0 });
        gsap.set(cloneCircleRef.current, { opacity: 0 });

        gsap.set(historyRef.current, { opacity: 0 });

        gsap.fromTo(
          spaceThree.current,
          { opacity: 0 },
          {
            position: "fixed",
            top: 0,
            opacity: 1,
          }
        );
      },
      onLeaveBack: () => {
        gsap.set(circleRef.current, { opacity: 1 });
        gsap.set(historyRef.current, { opacity: 1 });

        gsap.to(spaceThree.current, {
          position: "",
        });
      },
    });

    gsap.set(textEllipse, {
      transformOrigin: "center center",
    });
    gsap.set(textRolling, {
      transformOrigin: "center",
    });

    const rolling = gsap.to(textRolling, {
      duration: 6,
      rotate: 360,
      repeat: -1,
      ease: "linear",
    });

    textEllipse.addEventListener("click", () => {
      setIsModalOpen(true);
    });

    textEllipse.addEventListener("mouseover", () => {
      if (animationRef.current) animationRef.current.kill();
      gsap.to(textEllipse, {
        scale: 1.7,
        cursor: "pointer",
      });
      rolling.pause();
    });

    textEllipse.addEventListener("mouseleave", () => {
      if (textRolling) {
        const textRoll = gsap.timeline();

        if (animationRef.current) animationRef.current.kill();

        animationRef.current = textRoll;

        animationRef.current.to(textEllipse, {
          scale: 1,
        });
        rolling.play();
      }
    });
  }, []);

  return (
    <section className="contact-section" ref={contactRef}>
      <span>Contact</span>
      <p>모든 경험을 추구합니다.</p>
      <h1>지금 당장 시작할 수 있습니다!</h1>
      <ContactSVG />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />{" "}
      {/* Modal component */}
    </section>
  );
};

export default ContactSection;
