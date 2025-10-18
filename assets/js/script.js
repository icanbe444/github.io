'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}


// Credentials carousel init
  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');

    let index = 0;

    function visibleCount() {
      const viewportWidth = carousel.querySelector('.carousel-viewport').clientWidth;
      const itemWidth = items[0].getBoundingClientRect().width;
      return Math.max(1, Math.floor(viewportWidth / itemWidth));
    }

    function maxIndex() {
      return Math.max(0, items.length - visibleCount());
    }

    function update() {
      const trackStyle = getComputedStyle(track);
      const gap = parseFloat(trackStyle.gap) || 16;
      const trackPaddingLeft = parseFloat(trackStyle.paddingLeft) || 0;
      const itemWidth = items[0].getBoundingClientRect().width;

      // subtract track left padding so last item doesn't get pushed out
      const move = Math.max(0, (itemWidth + gap) * index - trackPaddingLeft);
      track.style.transform = `translateX(-${move}px)`;
      prev.disabled = index === 0;
      next.disabled = index >= maxIndex();
    }

    prev.addEventListener('click', function () {
      index = Math.max(0, index - 1);
      update();
    });

    next.addEventListener('click', function () {
      index = Math.min(maxIndex(), index + 1);
      update();
    });

    window.addEventListener('resize', function () {
      index = Math.min(index, maxIndex());
      update();
    });

    // autoplay (optional)
    let auto = setInterval(function () {
      index = (index >= maxIndex() ? 0 : index + 1);
      update();
    }, 4000);

    carousel.addEventListener('mouseenter', function () { clearInterval(auto); });
    carousel.addEventListener('mouseleave', function () {
      auto = setInterval(function () {
        index = (index >= maxIndex() ? 0 : index + 1);
        update();
      }, 4000);
    });

    // ensure correct sizes after images load
    window.addEventListener('load', update);

    // initial layout (DOM ready)
    update();
  });
}
// ...existing code...
