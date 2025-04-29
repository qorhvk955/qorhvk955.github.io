$(function () {
  function checkScrollForBrandAbout() {
    var scrollTop = $(window).scrollTop();
    var brandAboutTop = $("#brandAbout").offset().top;

    // 화면 최상단에 #brandAbout이 닿으면
    if (scrollTop >= brandAboutTop) {
      $("#brandAbout .bottle-outline .bottleLine").css("display", "none");
      $("#brandAbout .bottle-outline .picture").css("display", "block");
    } else {
      // 다시 위로 올라가면 원래 상태로 되돌리기
      $("#brandAbout .bottle-outline .bottleLine").css("display", "block");
      $("#brandAbout .bottle-outline .picture").css("display", "none");
    }
  }

  $(window).on("scroll", function () {
    checkScrollForBrandAbout();
  });

  // 페이지가 로드될 때 한 번 초기화
  checkScrollForBrandAbout();
});
