/// <reference types="../@types/jquery" />
$(function() {
  // Left Menu Animation
  const leftMenu = $("#leftMenu");
  const homeContent = $("#home-content");

  $(".openNav").on("click", () => {
    animateMenu(250);
  });

  $(".closebtn").on("click", () => {
    animateMenu(0);
  });

  function animateMenu(width) {
    leftMenu.animate({ width: `${width}px` }, 50, 'swing');
    homeContent.animate({ marginLeft: `${width}px` }, 50, 'swing');
  }

  // Smooth Scrolling
  $("#leftMenu").on("click", "a", function (e) {
    e.preventDefault();
    const sectionId = $(this).attr("href");
    if (sectionId === "#") {
      animateMenu(0);
      return;
    }
    const $section = $(sectionId);
    if ($section.length) {
      const positionOfSection = $section.offset().top;
      $("html, body").animate({ scrollTop: positionOfSection }, 2000);
      // animateMenu(0);
    }
  });

  // Accordion
  $("#Duration").on("click", ".toggle", function () {
    $(".inner").not($(this).next()).slideUp(500);
    $(this).next().slideToggle(500);
  });

  // Countdown Timer
  function countDownToTime(countTo) {
    const futureDate = new Date(countTo).getTime();
    let timerInterval;

    function updateCountdown() {
      const now = new Date().getTime();
      const timeDifference = futureDate - now;

      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        $(".days").html("00");
        $(".hours").html("00");
        $(".minutes").html("00");
        $(".seconds").html("00");
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((timeDifference % (1000 * 60)) / 1000);

      $(".days").html(days < 10 ? `0${days}` : days);
      $(".hours").html(hours < 10 ? `0${hours}` : hours);
      $(".minutes").html(mins < 10 ? `0${mins}` : mins);
      $(".seconds").html(secs < 10 ? `0${secs}` : secs);
    }

    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
  }

  // Textarea Character Count
  const maxLength = 100;
  $("textarea").on("input", function () {
    const length = $(this).val().length;
    const amountLeft = maxLength - length;

    $("#chars").text(
      amountLeft <= 0 ? "Your available characters finished" : amountLeft
    );
  });

  // Initialize countdown on window load
  $(window).on("load", () => {
    countDownToTime("10 October 2024 9:56:00");
  });
});