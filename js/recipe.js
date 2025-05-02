import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

//레시피 섹션
window.addEventListener("DOMContentLoaded", () => {
  const cards = gsap.utils.toArray("#recipe .card");
  const overlay = document.getElementById("cardOverlay");
  const overlayImage = document.getElementById("overlayImage");
  const rotateValues = [-4, 2, -3, 3];

  // 가로 배치 계산
  cards.forEach((card, i) => {
    const xPos = (i - 1.5) * 360; // spacing
    const rotate = rotateValues[i] || 0;
    gsap.set(card, {
      x: xPos,
      y: 100,
      rotate: rotate,
      opacity: 0,
      zIndex: i + 1,
    });
  });

  // pin + step scroll
  const extraScroll = 2; // 위 아래 여유 스크롤 각 1개씩 (총 2)

  ScrollTrigger.create({
    trigger: "#recipe",
    start: "top top",
    end: () => `+=${(cards.length + extraScroll) * window.innerHeight}`,
    pin: true,
    scrub: true,
    snap: 1 / (cards.length + extraScroll - 1),
    onUpdate: (self) => {
      const index =
        Math.floor(self.progress * (cards.length + extraScroll)) - 1;

      cards.forEach((card, i) => {
        if (i < index) {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            y: 100,
            duration: 0.3,
            ease: "power2.in",
          });
        }
      });
    },
  });

  // 카드 클릭 시
  cards.forEach((card, i) => {
    const img = card.querySelector("img");

    img.addEventListener("click", () => {
      if (parseFloat(window.getComputedStyle(card).opacity) < 0.5) return;

      // 카드 부드럽게 밑으로 빠짐
      gsap.to(card, {
        y: 150,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });

      // 오버레이 초기 세팅
      overlayImage.src = img.src;
      overlay.classList.add("active");

      // 오버레이 부드럽게 아래에서 위로 올라오기
      gsap.fromTo(
        overlayImage,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.2, // ✨ 더 빠르게!
          ease: "power1.out", // ✨ 가볍고 민첩한 느낌
        }
      );
    });
  });

  // 오버레이 클릭 시 닫기
  overlay.addEventListener("click", () => {
    gsap.to(overlayImage, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      duration: 0.2, // ✨ 짧고 빠르게!
      ease: "power1.in",
      onComplete: () => {
        overlay.classList.remove("active");

        // 카드 복구
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotate: rotateValues[i],
            duration: 0.3,
            ease: "power2.out",
          });
        });
      },
    });
  });
});