const sound = document.getElementById("shutterSound");
const prompt = document.getElementById("soundPrompt");
let soundUnlocked = false;

console.log("sns.js");

console.log(sound);
console.log(prompt);

document.body.addEventListener("click", () => {
  if (!soundUnlocked) {
    sound
      .play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
        soundUnlocked = true;
        if (prompt) {
          prompt.classList.add("hide"); // 부드럽게 사라짐
          setTimeout(() => prompt.remove(), 600);
        }
      })
      .catch(() => {});
  }
});

document.querySelectorAll(".image-box").forEach((box) => {
  console.log("이미지 확인");
  box.addEventListener("mouseenter", () => {
    if (soundUnlocked) {
      sound.currentTime = 0;
      sound.play();
    }
    box.classList.add("hovering");
    console.log("마우스엔터");
  });

  box.addEventListener("mouseleave", () => {
    box.classList.remove("hovering");
  });
});
