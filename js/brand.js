$(function () {
  var hasShownBackStain = false;
  var scrollDown = false;
  var scrollup = false;

  // line, arrow 초기화
  const $lines = $('#brandAbout .plans .line');
  const $arrows = $('#brandAbout .plans .arrow');
  
  const lineSpeed = 1000;

  var stainTimeouts = []; // setTimeout ID를 저장할 배열

  // stain 관련 timeout들을 모두 클리어하는 함수
  function clearStainTimeouts() {
    stainTimeouts.forEach(clearTimeout);
    stainTimeouts = [];
  }

  function checkScrollForBrandAbout() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var brandAbout = $("#brandAbout");
    var brandAboutTop = brandAbout.offset().top;
    var brandAboutHeight = brandAbout.outerHeight();

    // #brandAbout이 닿으면 병 이미지 교체
    if (scrollTop >= brandAboutTop) {
      if (!scrollDown) {
        scrollDown = true;
        scrollup = false;
        console.log("내림");

        $("#brandAbout .bottle-outline .bottleLine").css("display", "none");
        $("#brandAbout .bottle-outline .picture").css("display", "block");

        if (!scrollup) {
          stainSpin(1, function () {
            if (!scrollup) {
              lineAnime(1);
              if (!scrollup) {
                stainTimeouts.push(setTimeout(function () {
                  if (!scrollup) {
                    stainSpin(2, function () {
                      if (!scrollup) {
                        lineAnime(2);
                        if (!scrollup) {
                          stainTimeouts.push(setTimeout(function () {
                            if (!scrollup) {
                              stainSpin(3, function () {
                                if (!scrollup) {
                                  lineAnime(3);
                                  if (!scrollup) {
                                    stainTimeouts.push(setTimeout(function () {
                                      if (!scrollup) {
                                        stainSpin(4, function () {
                                          if (!scrollup) {
                                            lineAnime(4);
                                          }
                                        });
                                      }
                                    }, 100));
                                  }
                                }
                              });
                            }
                          }, 100));
                        }
                      }
                    });
                  }
                }, 100));
              }
            }
          });
        }
      }
    } else {
      if (!scrollup) {
        scrollup = true;
        scrollDown = false;
        console.log("올림");

        clearStainTimeouts(); // 스크롤 업 시 이전의 timeout 클리어

        $("#brandAbout .bottle-outline .bottleLine").css("display", "block");
        $("#brandAbout .bottle-outline .picture").css("display", "none");

        // 모든 stain 초기화
        $('#brandAbout .plans .stainFront').css({
          transform: "translate(-50%,-50%) rotateY(90deg)"
        });

        // line과 arrow 되돌리기 (즉시 실행)
        $lines.each(function (index) {
          resetLineAndArrow(this, $($arrows[index]));
        });

        if (scrollup) {
          $('#brandAbout .plans .stainFront').css({
            transform: "translate(-50%,-50%) rotateY(90deg)"
          });
          setTimeout(function () {
            // 무지성 그냥 반복 으아아악 버그다 버그야 안고쳐져
            if (scrollup) {
              $('#brandAbout .plans .stainFront').css({
                transform: "translate(-50%,-50%) rotateY(90deg)"
              });
              $('#brandAbout .plans .stainBack').css({
                transform: "translate(-50%,-50%) rotateY(0deg)"
              });
              if (scrollup) {
                setTimeout(function(){
                  // 무지성 그냥 반복 으아아악 버그다 버그야 안고쳐져
                  $('#brandAbout .plans .stainFront').css({
                    transform: "translate(-50%,-50%) rotateY(90deg)"
                  });
                  $('#brandAbout .plans .stainBack').css({
                    transform: "translate(-50%,-50%) rotateY(0deg)"
                  });
                },700)
              }
            }
          }, 700);
        }
      }
    }

    // #brandAbout이 절반쯤 보이면 backStain 내려오기
    var triggerPoint = brandAboutTop - brandAboutHeight / 2;
    var scrollMiddle = scrollTop - windowHeight / 2;

    if (scrollMiddle >= triggerPoint) {
      if (!hasShownBackStain) {
        hasShownBackStain = true;
        $("#brandAbout .backStain").stop().animate({ top: "40%" }, 3000);
        $("#brandAbout .overlay").stop().animate({ height: "100%" }, 4500);
      }
    } else {
      if (hasShownBackStain) {
        hasShownBackStain = false;
        $("#brandAbout .backStain").stop().animate({ top: "-100%" }, 500);
        $("#brandAbout .overlay").stop().animate({ height: "0%" }, 500);
      }
    }
  }

  $(window).on("scroll", function () {
    checkScrollForBrandAbout();
  });

  checkScrollForBrandAbout();

  // Stain Spin을 하나의 함수로 통합
  function stainSpin(planNumber, callback) {
    const $stainBack = $(`#brandAbout .plan${planNumber} .stainBack`);
    const $stainFront = $(`#brandAbout .plan${planNumber} .stainFront`);
    $stainBack.css({
      transform: "translate(-50%,-50%) rotateY(90deg)"
    });
    setTimeout(function () {
      $stainFront.css({
        transform: "translate(-50%,-50%) rotateY(0deg)"
      });
      if (typeof callback === "function") callback();
    }, 500);
  }

  // line 애니메이션을 하나의 함수로 통합
  function lineAnime(planNumber) {
    const line = $lines[planNumber - 1];
    const arrow = $($arrows[planNumber - 1]);
    const svgDoc = line.contentDocument;
    if (!svgDoc) return;
    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px"
    });
    $path.animate({
      'stroke-dashoffset': 0
    }, lineSpeed, function () {
      arrow.css({ display: "block" });
    });
  }

  // 초기 stroke 스타일 지정
  $lines.each(function () {
    const line = this;

    function applyPathStyle() {
      const svgDoc = line.contentDocument;
      if (svgDoc) {
        const $path = $(svgDoc).find("path");
        $path.css({
          'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
          'stroke-dashoffset': 185
        });
      }
    }

    if (line.contentDocument && line.contentDocument.readyState === 'complete') {
      applyPathStyle();
    } else {
      $(line).on('load', applyPathStyle);
    }
  });

  // 라인과 화살표를 되돌리는 함수 추가
  function resetLineAndArrow(line, arrow) {
    const svgDoc = line.contentDocument;
    if (!svgDoc) return;
    const $path = $(svgDoc).find('path');
    $path.stop().animate({
      'stroke-dashoffset': 185
    }, lineSpeed);

    arrow.css({ display: "none" });
  }

  // 선 크기 조절
  function lineReset() {
    $('#brandAbout .plans').each(function () {
      var $plan = $(this);
      var $line = $plan.find('.lineBox .line');
      var lineHeight = $line[0]?.offsetHeight || 0; // jQuery의 outerHeight는 로딩 전엔 0일 수 있음
      $plan.find('.lineBox').height(lineHeight);
    });
  }
  
  function initLineResize() {
    const $lines = $('#brandAbout .plans .lineBox .line');
    let loadedCount = 0;
    const totalLines = $lines.length;
  
    $lines.each(function () {
      const obj = this;
  
      // load 이벤트는 jQuery에서 잘 작동하지 않으므로 순수 JS로 처리
      obj.addEventListener('load', function () {
        loadedCount++;
        if (loadedCount === totalLines) {
          lineReset();
        }
      }, false);
  
      // 혹시 이미 로드된 상태일 경우
      if (obj.contentDocument) {
        loadedCount++;
        if (loadedCount === totalLines) {
          lineReset();
        }
      }
    });
  }
  
  $(document).ready(function () {
    initLineResize();
    $(window).on('resize', function () {
      lineReset();
    });
  });
  
});
