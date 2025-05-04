$(function () {
  var headerHeight = $('#top').outerHeight();
  var isMouseNearTop = false;
  var isAtTop = true;
  var isMobile = false;
  var lastScrollTop = $(window).scrollTop();

  function mobileCheck(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)==true || $(window).width()<=500){
      isMobile = true
    }else{
      isMobile = false
    }
  }

  function updateHeaderHeight() {
    headerHeight = $('#top').outerHeight();
  }

  function updateBackground() {
    updateHeaderHeight()
    if (isAtTop) {
      $('#top').css({background: 'none',height: 130});
    } else {
      $('#top').css({background: '#fefaebd5',height: 80});
    }
  }

  function showHeader() {
    $('#top').css('top', '0');

    if (!isAtTop) {
      $('#top').css('box-shadow', '0px 2px 10px 2px #0000002b');
    } else {
      $('#top').css('box-shadow', 'none');
    }
  }

  function hideHeader() {
    $('#top').css({
      top: '-' + headerHeight + 'px',
      'box-shadow': 'none'
    });
  }

  // 스크롤 이벤트
  $(window).on('scroll', function () {
    var currentScrollTop = $(window).scrollTop();
    isAtTop = currentScrollTop === 0;

    updateBackground();

    if (isMobile) {
      // 모바일에서는 스크롤 올리면 보이고, 내리면 숨기기
      if (currentScrollTop < lastScrollTop) {
        showHeader();  // 아래로 스크롤 → 보이기
      } else {
        if (isAtTop) {
          showHeader();
        } else {
          hideHeader();
        }
      }
      lastScrollTop = currentScrollTop;
    } else {
      // PC에서는 화면 맨 위일 때만 보이기
      if (isAtTop || isMouseNearTop) {
        showHeader();
      } else {
        hideHeader();
      }
    }
  });

  // 마우스 이동 이벤트 (PC 전용)
  if (!isMobile) {
    $(window).on('mousemove', function (e) {
      isMouseNearTop = e.clientY <= headerHeight;

      if (isAtTop || isMouseNearTop) {
        showHeader();
      } else if (!isAtTop) {
        hideHeader();
      }
    });
  }

  // 리사이즈 이벤트
  $(window).on('resize', function () {
    updateHeaderHeight();
    mobileCheck()
  });

  // 초기 배경 처리
  updateBackground();

  mobileCheck()
});
