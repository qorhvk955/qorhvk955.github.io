$(function () {
  $("body").css("overflow", "hidden");

  $(window).on("load", function () {
    $("html, body").scrollTop(0);
  });

  $("#intro").stop(true, true).css({
    opacity: 1,
    display: "block",
  });

  setTimeout(function () {
    $("#intro .intro").animate(
      {
        top: "55.8%",
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
