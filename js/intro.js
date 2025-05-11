function adjustIntroHeight() {
  const $video = $("#intro .intro");
  const winW = $(window).width();
  const winH = $(window).height();

  // 가로가 세로보다 짧다면 조정
  if (winW < winH) {
    const ratio = winW / winH; // 부족한 비율
    $video.css("height", `${100 * ratio}%`);
  } else {
    $video.css("height", "100%"); // 기본값
  }
}

$(function () {
  $("body").css("overflow", "hidden");

  $(window).on("load", function () {
    $("html, body").scrollTop(0);
    adjustIntroHeight();
  });

  $(window).on("resize", function () {
    adjustIntroHeight();
  });

  $("#intro").stop(true, true).css({
    opacity: 1,
    display: "block",
  });

  setTimeout(function () {
    $("#intro .intro").animate(
      {
        top: "55.8%",
        height: "100%",
      },
      700
    );
  }, 3200);

  setTimeout(function () {
    $("#intro").fadeOut(1000);
  }, 3700);

  setTimeout(function () {
    $("body").css("overflow", "auto");
  }, 5000);
});
