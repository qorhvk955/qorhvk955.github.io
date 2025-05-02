import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const path1 = document.querySelector("#arrow-1 path");
  const head1 = document.querySelector("#arrow-head-1");
  const img1 = document.querySelector(".label-1");

  const path2 = document.querySelector("#arrow-2 path");
  const head2 = document.querySelector("#arrow-head-2");
  const img2 = document.querySelector(".label-lowfood");

  const path3 = document.querySelector("#arrow-3 path");
  const head3 = document.querySelector("#arrow-head-3");
  const img3 = document.querySelector(".label-kal");

  gsap.set([img1, img2, img3], { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#point",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    },
  });

  tl.to(path1, { strokeDashoffset: 0 })
    .set(head1, { opacity: 1 })
    .set(img1, { opacity: 1 });

  tl.to(path2, { strokeDashoffset: 0 })
    .set(head2, { opacity: 1 })
    .set(img2, { opacity: 1 });

  tl.to(path3, { strokeDashoffset: 0 })
    .set(head3, { opacity: 1 })
    .set(img3, { opacity: 1 });

  tl.to({}, {});
});
