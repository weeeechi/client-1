

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // Function to stop all videos (only when needed, like on slide change)
function stopAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(function(video) {
    video.pause();   // Pause the video
    video.currentTime = 0;  // Reset video to start (optional, if you want reset behavior)
  });
}

// Function to keep playing the video on the new slide
function playVideoOnActiveSlide(swiper) {
  const nextSlide = swiper.slides[swiper.activeIndex];
  const nextVideo = nextSlide.querySelector('video');
  if (nextVideo && nextVideo.paused) {
    nextVideo.play();  // Play the video in the active slide if paused
  }
}

// Function to stop all videos (only when needed, like on slide change)
function stopAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(function(video) {
    video.pause();   // Pause the video
    video.currentTime = 0;  // Reset video to start (optional, if you want reset behavior)
  });
}

// Function to play the video on the active slide
function playVideoOnActiveSlide(swiper) {
  const nextSlide = swiper.slides[swiper.activeIndex];
  const nextVideo = nextSlide.querySelector('video');
  if (nextVideo && nextVideo.paused) {
    nextVideo.play();  // Play the video in the active slide if paused
  }
}

// Init swiper sliders
function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim()
    );

    if (swiperElement.classList.contains("swiper-tab")) {
      initSwiperWithCustomPagination(swiperElement, config);
    } else {
      let swiper = new Swiper(swiperElement, config);

      // When the slide changes, pause the video on the previous slide and play the video on the new slide
      swiper.on('slideChange', function() {
        // Get the video on the previous slide and pause it
        const prevSlide = swiper.slides[swiper.previousIndex];
        const prevVideo = prevSlide.querySelector('video');
        if (prevVideo && !prevVideo.paused) {
          prevVideo.pause(); // Pause the video on the previous slide
        }

        // Play the video on the new active slide
        playVideoOnActiveSlide(swiper);
      });

      // Automatically stop all videos on initialization
      stopAllVideos();

      // Ensure the video on the active slide starts playing when page loads (in case of page refresh)
      playVideoOnActiveSlide(swiper);
    }
  });
}

// Ensure videos continue playing without interruption during resize
window.addEventListener("resize", function() {
  // Get the active video on the active slide and check if it's playing
  const activeSlide = document.querySelector(".swiper-slide-active");
  const video = activeSlide ? activeSlide.querySelector("video") : null;

  if (video && !video.paused) {
    // If the video is playing, do nothing (allow the video to continue playing smoothly)
    return;
  }
});

// Prevent page layout reset that could affect video during resize
window.addEventListener("load", function() {
  // Initialize the swiper on load
  initSwiper();

  // On load, ensure the video on the active slide starts playing without interruption
  const activeSlide = document.querySelector(".swiper-slide-active");
  const video = activeSlide ? activeSlide.querySelector("video") : null;
  if (video && video.paused) {
    video.play();
  }
});



})();