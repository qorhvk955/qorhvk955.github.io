$(function () {
  var headerHeight = $('#top').outerHeight();
  var isMouseNearTop = false;
  var isAtTop = true;

  function updateHeaderHeight() {
    headerHeight = $('#top').outerHeight();
  }

  function showHeader() {
    $('#top').css('top', '0');

    // 화면의 맨 위가 아닐 때만 그림자 추가
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
    isAtTop = $(window).scrollTop() === 0;

    if (isAtTop || isMouseNearTop) {
      showHeader();
    } else {
      hideHeader();
    }
  });

  // 마우스 이동 이벤트
  $(window).on('mousemove', function (e) {
    isMouseNearTop = e.clientY <= headerHeight;

    if (isMouseNearTop) {
      showHeader();
    } else if (!isAtTop) {
      hideHeader();
    }
  });

  // 리사이즈 이벤트
  $(window).on('resize', function () {
    updateHeaderHeight();
  });
});
