// 강제 부드러운 스크롤 함수
function smoothScrollForce(target) {
  const top = target.getBoundingClientRect().top + window.scrollY;

  // 현재 스크롤 중단 시도 (스크립트 충돌 방지)
  window.scrollTo({ top: window.scrollY, behavior: 'auto' });

  // 다음 프레임에서 부드러운 스크롤 강제 실행
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// 메뉴 li 클릭 시 이동
document.querySelectorAll('.menu li').forEach(li => {
  li.addEventListener('click', () => {
    const targetSelector = li.dataset.target;
    if (!targetSelector) return;

    const target = document.querySelector(targetSelector);
    if (target) {
      smoothScrollForce(target);
    }
  });
});

// 로고 클릭 시 #main 이동
document.querySelector('.logo').addEventListener('click', () => {
  const main = document.querySelector('#main');
  if (main) {
    smoothScrollForce(main);
  }
});
