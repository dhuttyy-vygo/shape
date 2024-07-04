import gsap from "gsap";
import Swiper from "swiper";

// Register ScrollTrigger with gsap
gsap.registerPlugin(ScrollTrigger);

// Create shorthands
var Sc = ScrollTrigger;
var Qe = gsap;

(() => {

    var vimeoModal = () => {
      const videoItems = document.querySelectorAll(".gl-video-item");
      const modalContainer = document.querySelector(".gl-video-modal");
      const iframe = document.querySelector("#gl-modal");
      const modalBackdrop = document.querySelector(".gl-modal-backdrop");
      let vplayer = null;
      let opened = false; // Ensure opened is defined
    
      if (!iframe) {
        console.log("Iframe not found on the page");
        return;
      }
    
      if (!modalContainer) {
        console.log("Modal container not found on the page");
        return;
      }
    
      if (!modalBackdrop) {
        console.log("Modal backdrop not found on the page");
        return;
      }
    
      videoItems.forEach((videoItem) => {
        videoItem.addEventListener("click", () => {
          const dataVideo = videoItem.getAttribute("data-player");
          iframe.src = `https://player.vimeo.com/video/${dataVideo}?autoplay=1&muted=0`;
    
          vplayer = new Player(iframe); // Use Player directly
          vplayer.ready().then(() => {
            vplayer.play();
          });
    
          modalContainer.classList.add("-open");
          opened = true;
        });
      });
    
      modalBackdrop.onclick = function () {
        modalContainer.classList.remove("-open");
        opened = false;
        if (vplayer) {
          vplayer
            .pause()
            .then(() => {
              iframe.src = "";
            })
            .catch((error) => {
              console.error("Error pausing the video", error);
            });
        }
      };
    };
  
  
        var reelerX = function () {
  
          const marquee = document.querySelectorAll(".gl-marquee");
          if (!marquee) {
              console.log("No marquee not found on the page");
              return;
            }
  
              marquee.forEach((e) => {
              const items = e.querySelector(".gl-marquee-items"),
                  item = e.querySelectorAll(".gl-marquee-item");
  
              e.classList.add("swiper-container");
              items.classList.add("swiper-wrapper");
              item.forEach((e) => e.classList.add("swiper-slide"));
  
              const slider = new Swiper(e, {
                  slidesPerView: "auto",
                  loop: false,
                  // Adding navigation options
                  navigation: {
                  nextEl: ".gl-swipe-button.next", 
                  prevEl: ".gl-swipe-button.back", 
                  },
              });
              });
  
              const fleet = document.querySelectorAll(".gl-fleet");
  
              fleet.forEach((e) => {
              const items = e.querySelector(".gl-fleet-items"),
                  item = e.querySelectorAll(".gl-fleet-item");
  
              e.classList.add("swiper-container");
              items.classList.add("swiper-wrapper");
              item.forEach((e) => e.classList.add("swiper-slide"));
  
              const slider = new Swiper(e, {
                  loop: true,
                  centeredSlides: true,
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  speed: 300,
                  spaceBetween: 50,
                  autoplay: {
                  delay: 2500,
                  disableOnInteraction: true,
                  },
                  // Adding navigation options
                  navigation: {
                  nextEl: ".gl-fleet-back", 
                  prevEl: ".gl-fleet-next", 
                  },
                  breakpoints: {
                  150: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                  },
  
                  991: {
                      slidesPerView: 3,
                  },
                  },
              });
           });
  
        };
  
        var faqAccord = function () {
              let groups = gsap.utils.toArray(".faq-menu");
              let menus = gsap.utils.toArray(".faq-item");
              let menuToggles = [];
  
              if (!groups) {
                  console.log("FAQ not found on the page");
                  return;
                }
  
              let activeMenu = null; // Keep track of the active menu
  
              menus.forEach((menu) => {
              let animation = createAnimation(menu);
              menuToggles.push(animation);
  
              menu.addEventListener("click", () => toggleMenu(animation));
              });
  
              function toggleMenu(animation) {
              if (activeMenu !== animation) {
                  if (activeMenu) {
                  activeMenu.reverse(); // Close the previously open menu
                  }
                  animation.play(); // Open the clicked menu
                  activeMenu = animation;
              } else {
                  animation.reverse(); // Close the clicked menu
                  activeMenu = null;
              }
              }
  
              function createAnimation(menu) {
              let element = menu.parentElement;
              let box = element.querySelector(".answer");
              let plusSign = element.querySelector(".plus");
              let cardBack = element.querySelector(".faq-item");
              let questionText = element.querySelector(".question");
  
              gsap.set(box, { height: "auto" });
              gsap.set(questionText, { marginLeft: "2vw" });
  
              let timeline = gsap
                  .timeline({ paused: true })
                  .from(box, {
                  height: 0,
                  duration: 0.5,
                  ease: "power1.inOut",
                  })
                  .from(
                  questionText,
                  {
                      marginLeft: 0,
                      duration: 0.5,
                      ease: "power4.inOut",
                  },
                  "<"
                  )
                  .to(
                  plusSign,
                  {
                      rotate: "45deg",
                      duration: 0.1,
                      ease: "power1.inOut",
                  },
                  "<"
                  )
                  .reverse();
  
              return timeline;
              }
          };
  
  
      window.addEventListener("DOMContentLoaded", function () {
  
          vimeoModal(), reelerX(), faqAccord();
  
          setTimeout(() => {
              $("[gl-text]").each(function (index) {
                let textEl = $(this).find('[data-split="line"]');
                let btn = $(this).find("a");
                Qe.set(textEl, { autoAlpha: 1, willChange: "transform" });
                let textContent = $(this).text();
                let tl;
          
                function splitText() {
                  new SplitType(textEl, { types: "words", tagName: "span" });
                  textEl.find(".word").each(function (index) {
                    let lineContent = $(this).html();
                    $(this).html("");
                    $(this).append(
                      `<span class="line-inner" style="display: block;">${lineContent}</span>`
                    );
                  });
                  tl = Qe.timeline({
                    scrollTrigger: {
                      trigger: textEl,
                      start: "top bottom",
                      end: "bottom bottom",
                      toggleActions: "play none none none",
                    },
                  });
                  tl.fromTo(
                    textEl.find(".line-inner"),
                    { yPercent: 100, opacity: 0 },
                    {
                      yPercent: 0,
                      opacity: 1,
                      duration: 0.7,
                      stagger: { amount: 0.3, ease: "power4.out" },
                    }
                  );
                  tl.fromTo(
                    btn,
                    { yPercent: 100, opacity: 0 },
                    {
                      yPercent: 0,
                      opacity: 1,
                      duration: 0.7,
                      stagger: { amount: 0.3, ease: "power4.out" },
                    },
                    0.3
                  );
                }
                splitText();
          
                let windowWidth = window.innerWidth;
                window.addEventListener("resize", function () {
                  if (windowWidth !== window.innerWidth) {
                    windowWidth = window.innerWidth;
                    tl.kill();
                    textEl.text(textContent);
                    splitText();
                  }
                });
              });
            }, 700);
          
            $(".gl-hero-start").each(function (index) {
              let textEl = $(this).find('[data-split="line"]');
              let btn = $(this).find("a");
              let logos = $(this).find(".gl-card-logo");
              let popup = document.querySelector(".gl-pop-up-top");
              Qe.set(textEl, { autoAlpha: 1 });
              Qe.set(logos, { autoAlpha: 1 });
              let tl;
          
              function heroIn() {
                new SplitType(textEl, { types: "words", tagName: "span" });
                textEl.find(".word").each(function (index) {
                  let lineContent = $(this).html();
                  $(this).html("");
                  $(this).append(
                    `<span class="line-inner" style="display: block;">${lineContent}</span>`
                  );
                });
                tl = Qe.timeline({
                  scrollTrigger: {
                    trigger: textEl,
                    start: "top bottom",
                    end: "bottom bottom",
                    toggleActions: "none play none reset",
                  },
                });
                tl.fromTo(
                  textEl.find(".line-inner"),
                  { yPercent: 100, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: { amount: 0.3, ease: "power4.out" },
                  },
                  0
                );
                tl.to(
                  ".gl-picture-clip",
                  {
                    duration: 1,
                    ease: "power2.out",
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0)",
                  },
                  0.3
                );
                tl.fromTo(
                  btn,
                  { yPercent: 100, opacity: 0 },
                  {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: { amount: 0.3, ease: "power4.out" },
                  },
                  0.2
                );
                tl.fromTo(
                  logos,
                  { autoAlpha: 0 },
                  {
                    autoAlpha: 1,
                    duration: 0.7,
                    stagger: { amount: 0.5, from: "random" },
                  },
                  1
                );
                tl.fromTo(
                  popup,
                  { autoAlpha: 0, yPercent: 2 },
                  {
                    autoAlpha: 1,
                    yPercent: 0,
                    ease: "power4.out",
                    duration: 0.5,
                  },
                  1.5
                );
              }
              heroIn();
            });
          
            $("[data-btn='wrap']").each(function () {
              const clipEl = $(this).find("[data-btn='clip']").attr("aria-hidden", "true");
              const durationSetting = 0.4;
              const easeSetting = "power2.out";
            
              function getPercentTop(el, e) {
                let elTop = el.offset().top - $(window).scrollTop();
                let mouseTop = e.pageY - $(window).scrollTop() - elTop;
                return (mouseTop / el.innerHeight()) * 100;
              }
              function getPercentLeft(el, e) {
                let elLeft = el.offset().left;
                let mouseLeft = e.pageX - elLeft;
                return (mouseLeft / el.innerWidth()) * 100;
              }
              $(this).on("mouseenter", function (e) {
                let percentTop = getPercentTop($(this), e);
                let percentLeft = getPercentLeft($(this), e);
                gsap.set(clipEl, { display: "flex" });
                gsap.fromTo(
                  clipEl,
                  { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
                  {
                    clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
                    duration: durationSetting,
                    ease: easeSetting,
                  }
                );
              });
              $(this).on("mouseleave", function (e) {
                let percentTop = getPercentTop($(this), e);
                let percentLeft = getPercentLeft($(this), e);
                gsap.to(clipEl, {
                  clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
                  overwrite: true,
                  duration: durationSetting,
                  ease: easeSetting,
                });
              });
            });
  
            const cards = document.querySelectorAll("[data-card]");
  
              cards.forEach((e) => {
              const card = e.querySelectorAll("[data-card=box]"),
                  title = e.querySelectorAll("[data-card=text]");
  
              gsap.set(card, { autoAlpha: 1 });
              gsap.set(title, { autoAlpha: 1 });
  
              const tl = gsap.timeline({
                  scrollTrigger: {
                  trigger: e,
                  start: "top bottom",
                  toggleActions: "play none none none",
                  },
              });
  
              tl.fromTo(
                  card,
                  {
                  y: 50,
                  opacity: 0,
                  },
                  {
                  y: 0,
                  opacity: 1,
                  ease: "power2.out",
                  duration: 1,
                  stagger: { amount: 0.2 },
                  },
                  0
              );
              tl.fromTo(
                  title,
                  {
                  y: 100,
                  opacity: 0,
                  },
                  {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  stagger: { amount: 0.2 },
                  ease: "power2.out",
                  },
                  0.4
              );
              });
  
              // card img parallax //
  
              document.querySelectorAll(".gl-card-feature").forEach((e) => {
              const t = e.querySelector("picture");
  
              // Set initial properties
              gsap.set(t, { yPercent: -10, scale: 1.05, willChange: "transform" });
  
              // Create a GSAP timeline with ScrollTrigger
              const tl = gsap.timeline({
                  scrollTrigger: {
                  trigger: e,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.4,
                  },
              });
  
              tl.fromTo(t, { yPercent: -10 }, { yPercent: 10, scale: 1.05, ease: "none" });
              });
  
              // stagger in mutliple cards / blocks //
  
                    
                    
                    
          });
          
  
          // end of dom contentLoaded //
  
    window.addEventListener("pagehide", function () {
      window.scrollTo(0, 0);
    });
  })();
  
  
    
    
  