$(function () {
  var hasShownBackStain = false;

  function checkScrollForBrandAbout() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var brandAbout = $("#brandAbout");
    var brandAboutTop = brandAbout.offset().top;
    var brandAboutHeight = brandAbout.outerHeight();

    // 기존 로직: 화면 상단에 #brandAbout이 닿으면 병 이미지 교체
    if (scrollTop >= brandAboutTop) {
      $("#brandAbout .bottle-outline .bottleLine").css("display", "none");
      $("#brandAbout .bottle-outline .picture").css("display", "block");
    } else {
      $("#brandAbout .bottle-outline .bottleLine").css("display", "block");
      $("#brandAbout .bottle-outline .picture").css("display", "none");
    }

    // 새로운 로직: 화면 중간에 #brandAbout이 절반쯤 보이면 backStain 내려오기
    var triggerPoint = brandAboutTop - brandAboutHeight / 2;
    var scrollMiddle = scrollTop - windowHeight / 2;

    if (scrollMiddle >= triggerPoint) {
      if (!hasShownBackStain) {
        hasShownBackStain = true;
        $("#brandAbout .backStain").stop().animate({ top: "0%" }, 2000);
      }
    } else {
      if (hasShownBackStain) {
        hasShownBackStain = false;
        $("#brandAbout .backStain").stop().animate({ top: "-100%" }, 500);
      }
    }
  }

  $(window).on("scroll", function () {
    checkScrollForBrandAbout();
  });

  checkScrollForBrandAbout();

  // 테스트
  const $obj = $('#brandAbout .plan1 .line');

  function applyPathAnimation(obj) {
    const svgDoc = obj.contentDocument;
    if (!svgDoc) return;

    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
      'stroke-dashoffset': 170
    });

    $path.animate({
      'stroke-dashoffset': 0
    }, 10000);
  }

  // load 이벤트가 정상적으로 잡히는 경우
  $obj.on('load', function () {
    applyPathAnimation(this);
  });

  // 이미 로드가 완료된 경우 (캐시 등)
  if ($obj[0] && $obj[0].contentDocument) {
    applyPathAnimation($obj[0]);
  }

});
