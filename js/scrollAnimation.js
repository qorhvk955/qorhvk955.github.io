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
camera.position.set(0, 0, 4); // 카메라가 정면에서 보기

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
      gsap.set(".vivid_sauce, .mask, .shadow", { opacity: 0 });
      model.visible = true;
      document.getElementById("three-canvas").style.zIndex = "1000";
    }
  },
  onEnterBack: () => {
    if (model) {
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

        // ✅ 모델 중심 계산 후 원점에 정렬
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center); // 중심이 (0,0,0)이 되게 이동

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

        // ✅ 모델을 정면에서 바라보게 카메라 설정
        camera.lookAt(0, 0, 0);

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

        let hasEnteredBrandAbout = false;

        ScrollTrigger.create({
          trigger: "#brandAbout",
          start: "top top",
          end: "bottom bottom",
          onEnter: (self) => {
            if (hasEnteredBrandAbout) return;
            hasEnteredBrandAbout = true;
          },
          onEnterBack: () => {
            hasEnteredBrandAbout = false;
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
