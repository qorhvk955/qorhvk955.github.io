$(function () {
  var hasShownBackStain = false;

  function checkScrollForBrandAbout() {
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    var brandAbout = $("#brandAbout");
    var brandAboutTop = brandAbout.offset().top;
    var brandAboutHeight = brandAbout.outerHeight();

    // #brandAbout이 닿으면 병 이미지 교체
    if (scrollTop >= brandAboutTop) {
      $("#brandAbout .bottle-outline .bottleLine").css("display", "none");
      $("#brandAbout .bottle-outline .picture").css("display", "block");
      // 브랜드 자국 애니메이션
      stainSpin1(function(){
        lineAnime1($line1[0]);
        setTimeout(function() {
          stainSpin2(function() {
            lineAnime2($line2[0]);
            setTimeout(function() {
              stainSpin3(function() {
                lineAnime3($line3[0]);
                setTimeout(function() {
                  stainSpin4(function() {
                    lineAnime4($line4[0]);
                  });
                }, 100);
              });
            }, 100);
          });
        }, 100);
      });
    } else {
      $("#brandAbout .bottle-outline .bottleLine").css("display", "block");
      $("#brandAbout .bottle-outline .picture").css("display", "none");
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

  function stainSpin1(callback){
    $('#brandAbout .plan1 .stainBack').css({
      transform: "translate(-50%,-50%) rotateY(90deg)"
    })
    setTimeout(function(){
      $('#brandAbout .plan1 .stainBack').css({display: "none"})
      $('#brandAbout .plan1 .stainFront').css({
        transform: "translate(-50%,-50%) rotateY(0deg)"
      })
      if (typeof callback === "function") {
        callback();
      }
    },500)
  }
  function stainSpin2(callback){
    $('#brandAbout .plan2 .stainBack').css({
      transform: "translate(-50%,-50%) rotateY(90deg)"
    })
    setTimeout(function(){
      $('#brandAbout .plan2 .stainBack').css({display: "none"})
      $('#brandAbout .plan2 .stainFront').css({
        transform: "translate(-50%,-50%) rotateY(0deg)"
      })
      if (typeof callback === "function") {
        callback();
      }
    },500)
  }
  function stainSpin3(callback){
    $('#brandAbout .plan3 .stainBack').css({
      transform: "translate(-50%,-50%) rotateY(90deg)"
    })
    setTimeout(function(){
      $('#brandAbout .plan3 .stainBack').css({display: "none"})
      $('#brandAbout .plan3 .stainFront').css({
        transform: "translate(-50%,-50%) rotateY(0deg)"
      })
      if (typeof callback === "function") {
        callback();
      }
    },500)
  }
  function stainSpin4(callback){
    $('#brandAbout .plan4 .stainBack').css({
      transform: "translate(-50%,-50%) rotateY(90deg)"
    })
    setTimeout(function(){
      $('#brandAbout .plan4 .stainBack').css({display: "none"})
      $('#brandAbout .plan4 .stainFront').css({
        transform: "translate(-50%,-50%) rotateY(0deg)"
      })
      if (typeof callback === "function") {
        callback();
      }
    },500)
  }


  const $line1 = $('#brandAbout .plan1 .line');
  const $arrow1 = $('#brandAbout .plan1 .arrow');
  const $line2 = $('#brandAbout .plan2 .line');
  const $arrow2 = $('#brandAbout .plan2 .arrow');
  const $line3 = $('#brandAbout .plan3 .line');
  const $arrow3 = $('#brandAbout .plan3 .arrow');
  const $line4 = $('#brandAbout .plan4 .line');
  const $arrow4 = $('#brandAbout .plan4 .arrow');

  const lineSpeed = 1000

  function lineAnime1(line1) {
    const svgDoc = line1.contentDocument;
    if (!svgDoc) return;

    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
      // 'stroke-dashoffset': 185
    });

    $path.animate({
      'stroke-dashoffset': 0
    }, lineSpeed,function(){
      $arrow1.css({
        display:"block"
      })
    });
  }
  function lineAnime2(line2) {
    const svgDoc = line2.contentDocument;
    if (!svgDoc) return;

    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
      // 'stroke-dashoffset': 185
    });

    $path.animate({
      'stroke-dashoffset': 0
    }, lineSpeed,function(){
      $arrow2.css({
        display:"block"
      })
    });
  }
  function lineAnime3(line3) {
    const svgDoc = line3.contentDocument;
    if (!svgDoc) return;

    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
      // 'stroke-dashoffset': 185
    });

    $path.animate({
      'stroke-dashoffset': 0
    }, lineSpeed,function(){
      $arrow3.css({
        display:"block"
      })
    });
  }
  function lineAnime4(line4) {
    const svgDoc = line4.contentDocument;
    if (!svgDoc) return;

    const $path = $(svgDoc).find('path');
    $path.css({
      'stroke-dasharray': "8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 8px, 200px",
      // 'stroke-dashoffset': 185
    });

    $path.animate({
      'stroke-dashoffset': 0
    }, lineSpeed,function(){
      $arrow4.css({
        display:"block"
      })
    });
  }

  const $line = $("#brandAbout .plans .line");

  $line.each(function () {
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
      // 이미 로드된 경우
      applyPathStyle();
    } else {
      // 아직 로드되지 않은 경우 load 이벤트 바인딩
      $(line).on('load', applyPathStyle);
    }
  });

});
