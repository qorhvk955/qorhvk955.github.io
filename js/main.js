$(function () {
  function resizeSectionHeight() {
    $("section").not("#point, #brandAbout").css({
      height: "100vh"
    });
    $("#point").css({
      height: "300vh"
    })
    $("#brandAbout").css({
      height: "300vh"
    })
  }

  function boxResize() {
    var sImgWidth = $("#main .sImg").width();
    $("#main .mask .boxs").width(sImgWidth);
  }

  var slideTimeout; // 슬라이드 타이머 초기화용

  var $box = $("#main .mask .box");
  var $back = $("#main .back");
  var boxDone = false;
  var backDone = false;

  var slideList = false;

  // 슬라이드 타이머
  var slideTime = 1000;
  var intervalTime = 5000;

  // 텍스트 변경 함수 추가
  function updateText(index) {
    var text = '';
    if (index === 0) {
      text = 'TOMATO';
      $('#main .text').css({color:"#EB9E8C", fontSize:320})
    } else if (index === 1) {
      text = ' SWEETCHILI';
      $('#main .text').css({color:"#FFCB47", fontSize:310})
    } else if (index === 2) {
      text = 'MUSTARD';
      $('#main .text').css({color:"#ECAA53", fontSize:310})
    }
    $('#main .text').text(text);
  }

  function slide() {
    if(!slideList){
      var sImgWidth = $('#main .sImg').width();
      var windowWidth = $(window).width();

      boxDone = false;
      backDone = false;

      $box.stop().animate({
        left: `-=${sImgWidth}px`
      }, slideTime, function() {
        $box.append($box.children('.boxs').first());
        $box.css('left', 0);
        listBar();
        boxDone = true;
        if (backDone) {
          startSlideLoop(); // ★ 여기서 다시 슬라이드 루프 시작
        }
      });

      $back.stop().animate({
        left: `-=${windowWidth}px`
      }, slideTime, function() {
        $back.append($back.children('.backs').first());
        $back.css('left', 0);
        backDone = true;
        if (boxDone) {
          startSlideLoop(); // ★ 여기서 다시 슬라이드 루프 시작
        }
      });
    }
  }

  function startSlideLoop() {
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(slide, intervalTime);
  }

  function listBarReset() {
    $("#main .list .lists").css("width", "15px");
    $("#main .list .circle")
      .stop(true, true)
      .animate({ width: "15px" }, slideTime);
  }

  function listBar(){
    listBarReset()

    if ($('#main .mask .box').children().first().hasClass('box1')) {
      $('#main .list .list1').css('width', '80px');
      $('#main .list .list1 .circle').stop(true, true).animate(
        {
          width: '80px'
        }, intervalTime ,function(){
          listBarReset()
        }
      );
      updateText(0); // 첫 번째 슬라이드일 때 TOMATO
    } else if ($('#main .mask .box').children().first().hasClass('box2')) {
      $('#main .list .list2').css('width', '80px');
      $('#main .list .list2 .circle').stop(true, true).animate(
        {
          width: '80px'
        }, intervalTime ,function(){
          listBarReset()
        }
      );
      updateText(1); // 두 번째 슬라이드일 때 CHILI
    } else if ($('#main .mask .box').children().first().hasClass('box3')) {
      $('#main .list .list3').css('width', '80px');
      $('#main .list .list3 .circle').stop(true, true).animate(
        {
          width: '80px'
        }, intervalTime ,function(){
          listBarReset()
        }
      );
      updateText(2); // 세 번째 슬라이드일 때 MUSTARD
    }
  }

  $("#main .list .bar").click(function () {
    clearTimeout(slideTimeout); // ★ 타이머 제거
    slideList = true;
    listBarReset();

    var sImgWidth = $("#main .sImg").width();
    var windowWidth = $(window).width();

    var $firstBox = $box.children(".boxs").first();
    var $firstBack = $back.children(".backs").first();
    var boxClass = $firstBox.attr("class");
    var backClass = $firstBack.attr("class");

    $box.stop(true, true);
    $back.stop(true, true);

    function moveSlide(cnt) {
      var boxAnim = new Promise(function (resolve) {
        $box.animate(
          { left: `-=${cnt * sImgWidth}px` },
          slideTime,
          function () {
            for (var i = 0; i < cnt; i++) {
              $box.append($box.children(".boxs").first());
            }
            $box.css("left", 0);
            resolve();
          }
        );
      });

      var backAnim = new Promise(function (resolve) {
        $back.animate(
          { left: `-=${cnt * windowWidth}px` },
          slideTime,
          function () {
            for (var i = 0; i < cnt; i++) {
              $back.append($back.children(".backs").first());
            }
            $back.css("left", 0);
            resolve();
          }
        );
      });

      Promise.all([boxAnim, backAnim]).then(function () {
        listBar();
        slideList = false;
        startSlideLoop();
      });
    }

    if ($(this).hasClass("list1")) {
      if (backClass.includes("back1")) {
        listBar();
        slideList = false;
        startSlideLoop();
      } else if (backClass.includes("back2")) {
        moveSlide(2);
      } else if (backClass.includes("back3")) {
        moveSlide(1);
      }
    } else if ($(this).hasClass("list2")) {
      if (backClass.includes("back2")) {
        listBar();
        slideList = false;
        startSlideLoop();
      } else if (backClass.includes("back3")) {
        moveSlide(2);
      } else if (backClass.includes("back1")) {
        moveSlide(1);
      }
    } else if ($(this).hasClass("list3")) {
      if (backClass.includes("back3")) {
        listBar();
        slideList = false;
        startSlideLoop();
      } else if (backClass.includes("back1")) {
        moveSlide(2);
      } else if (backClass.includes("back2")) {
        moveSlide(1);
      }
    }
  });

  $(window).on("mousemove", function (e) {
    var moveX = (e.pageX / $(window).width() - 0.5) * -200;
    var moveY = (e.pageY / $(window).height() - 1) * -100;

    $("#main .back .sauce .dishs").each(function () {
      $(this).css(
        "transform",
        `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`
      );
    });
  });

  $(document).ready(function () {
    $(window).scrollTop(0);
    resizeSectionHeight();
    boxResize();
    setTimeout(startSlideLoop, intervalTime);
    setTimeout(listBar, intervalTime);
    // setTimeout(startSlideLoop, 0);
    // setTimeout(listBar, 0);
    $(window).resize(function () {
      resizeSectionHeight();
      boxResize();
    });
  });
});
