import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const drag = document.querySelector("#drag");

  if (!drag) return;

  const updateScrollAnimation = () => {
    const scrollWidth = drag.scrollWidth;
    const clientWidth = drag.clientWidth;
    const scrollDistance = scrollWidth - clientWidth;

    // 기존 ScrollTrigger 제거 (중복 방지)
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // 애니메이션 적용
    gsap.to(drag, {
      x: () => `-${scrollDistance}px`,
      ease: "none",
      scrollTrigger: {
        trigger: "#product",
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  };

  // 초기에 실행
  updateScrollAnimation();

  // 창 크기 변경 시에도 업데이트
  window.addEventListener("resize", () => {
    updateScrollAnimation();
  });
});
