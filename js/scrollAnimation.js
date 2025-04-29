import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function lockScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.65, 4);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas"),
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.outputColorSpace = THREE.SRGBColorSpace;

let model;

ScrollTrigger.create({
  trigger: "#main",
  start: "top top",
  end: "+=1",
  onLeave: () => {
    if (model) {
      console.log("1111111111111");
      gsap.set(".vivid_sauce, .mask, .shadow", { opacity: 0 });
      model.visible = true;
      document.getElementById("three-canvas").style.zIndex = "1000";
    }
  },
  onEnterBack: () => {
    if (model) {
      console.log("2222");
      gsap.set(".vivid_sauce, .mask, .shadow", { opacity: 1 });
      model.visible = false;
    }
  },
});

new RGBELoader().load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r158/examples/textures/equirectangular/royal_esplanade_1k.hdr",
  (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdrTexture;
    scene.background = null;

    const loader = new GLTFLoader();
    loader.load(
      "/file/vivid_sauce.glb",
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, 1.5, 0);
        model.scale.set(1, 1, 1);
        model.rotation.order = "ZXY";
        model.visible = false;

        model.traverse((child) => {
          if (child.isMesh) {
            child.material.envMapIntensity = 2.0;
            child.material.roughness = 0.2;
            child.material.metalness = 0.0;
            child.material.needsUpdate = true;
          }
        });

        scene.add(model);

        const deg = (d) => d * (Math.PI / 180);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#main",
            start: "top top",
            endTrigger: "#point",
            end: "bottom top",
            scrub: true,
            onEnterBack: () => {
              if (model) {
                model.visible = true;
              }
            },
            onLeave: () => {
              if (model) {
                model.visible = false;
              }
            },
          },
        });

        tl.to(model.rotation, { x: deg(45), y: deg(90), z: deg(45) });
        tl.to(model.rotation, { x: deg(45), y: deg(180), z: deg(135) });
        tl.to(model.rotation, { x: deg(0), y: deg(180), z: deg(140) });
        tl.to(model.rotation, { x: deg(-180), y: deg(180), z: deg(180) });

        let hasScrolled = false;

        // ScrollTrigger.create({
        //   trigger: "#point",
        //   start: "top top",
        //   end: "bottom top+=10px",

        //   onEnter: () => {
        //     console.log("onEnter");
        //     if (model) {
        //       model.visible = true;
        //       document.getElementById("three-canvas").style.zIndex = "1000";
        //     }
        //   },
        //   onEnterBack: () => {
        //     console.log("onEnterBack");
        //     if (model) {
        //       model.visible = true;
        //     }
        //   },
        //   onLeaveBack: () => {
        //     console.log("onLeaveBack");
        //     if (model) {
        //       model.visible = true;
        //     }
        //   },
        //   onLeave: (self) => {
        //     if (model) {
        //       model.visible = false;
        //     }
        //   },
        // });

        let hasEnteredBrandAbout = false;

        ScrollTrigger.create({
          trigger: "#bradAbout",
          start: "top top",
          end: "bottom bottom",
          onEnter: (self) => {
            if (hasEnteredBrandAbout) return;
            hasEnteredBrandAbout = true;

            console.log("bradAbout onEnter");

            // const brandAboutTop =
            //   self.trigger.getBoundingClientRect().top + window.scrollY;

            // window.scrollTo({
            //   top: brandAboutTop + 1,
            //   behavior: "instant",
            // });

            // lockScroll();

            // setTimeout(() => {
            //   unlockScroll();
            //   console.log("unlockScroll 완료");
            //   ScrollTrigger.refresh();
            // }, 1000);
          },
          onEnterBack: () => {
            hasEnteredBrandAbout = false;
            console.log("bradAbout onEnterBack - 플래그 초기화");
          },
        });
      },
      undefined,
      (e) => console.error("GLB 로딩 실패:", e)
    );
  }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
