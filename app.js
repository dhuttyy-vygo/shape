import gsap from "gsap";
import { Splide } from "@splidejs/splide";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import SplitType from "split-type";




// Register ScrollTrigger with gsap
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin,MorphSVGPlugin);

// Create shorthands
var Sc = ScrollTrigger;
var Qe = gsap;



console.log("loaded");

let splitWords, splitLines;

windowWidth = $(window).innerWidth();

function runSplit(e) {
  e || (e = document);
  let t = e.querySelectorAll("[data-split-words]"),
      o = e.querySelectorAll("[data-split-lines]");
  (splitWords = new SplitType(t, { types: "lines, words" })), (splitLines = new SplitType(o, { types: "lines" }));
}


window.addEventListener("resize", function () {
windowWidth !== $(window).innerWidth() && ((windowWidth = $(window).innerWidth()), splitWords.revert(), splitLines.revert(), runSplit());
})
runSplit();



(() => {

  

  
  function initPictograms(e) {
    e || (e = document);
    e.querySelectorAll(".picto-lottie") &&
        (function (e) {
            let t = { frame: 0 },
                o = gsap.utils.toArray(e.target)[0],
                r = { trigger: ".trigger"},
                n = gsap.context && gsap.context(),
                a = lottie.loadAnimation({ container: o, renderer: e.renderer || "svg", loop: !1, autoplay: !1, path: e.path, rendererSettings: e.rendererSettings || { preserveAspectRatio: "xMidYMid slice" } });
            for (let t in e) r[t] = e[t];
            a.addEventListener("DOMLoaded", function () {
                let e = function () {
                    return (a.frameTween = gsap.to(t, { frame: a.totalFrames - 1, ease: "none", onUpdate: () => a.goToAndStop(t.frame, !0), scrollTrigger: r })), () => a.destroy && a.destroy();
                };
                n && n.add ? n.add(e) : e();
            });
        })({
          trigger: ".picto-lottie",
          start: "top center",
          endTrigger: "[data-picto-wrap]",
          end: "bottom bottom",
          renderer: "svg",
          target: ".picto-lottie",
          path: "https://uploads-ssl.webflow.com/6687cdef47183ee9c31a61bf/66bcd1942d16184e581cacc2_12.json",  
          scrub: 2,
        });
  }
  
  
  
  initPictograms();

  function initMachineHero(e) {
    e || (e = document);
    let heroes = e.querySelectorAll("[data-text-scrub]");

    if (!heroes.length) {
        return;
    }

    heroes.forEach((t) => {
        let a = t.querySelectorAll("._0120"),
            aa = a[0], // First element
            i = a[1],
            o = a[2],
            p = a[3];

        if (!aa || !i || !o || !p) {

            return;
        }

       
        Qe.set(aa, { autoAlpha: 1 });
        Qe.set([i, o, p], { autoAlpha: 0, y: "65px" });

        let tl = Qe.timeline({ paused: true });
     
        tl.fromTo(aa, 
                  { y: "0px" }, 
                  { y: "-65px", autoAlpha: 0, duration: 1 })
          .fromTo(i, 
                  { y: "65px" }, 
                  { y: "-65px", duration: 1 }, 1)
                  
          .fromTo(i,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: .5 }, 1)
          .to(i, 
                { autoAlpha: 0, duration: .5 }, 1.5)
          
          .fromTo(o, 
                  { y: "65px" }, 
                  { y: "-65px", duration: 1 }, 2)
                  
          .fromTo(o,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: .5 }, 2)
          .to(o, 
                { autoAlpha: 0, duration: .5 }, 2.5)
          
          .fromTo(p, 
                  { y: "65px" }, 
                  { y: "-65px", duration: 1 }, 3)
                  
          .fromTo(p,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: .5 }, 3);

        
        ScrollTrigger.create({
            trigger: t,
            start: "top top",
            end: "bottom center",
            animation: tl,
            scrub: true,
        });
    });
}

function initStickywipe(e) {
  e || (e = document);
  let wipeUp = e.querySelectorAll(".o01239");

  if (!wipeUp.length) {
      return;
  }

  wipeUp.forEach((t) => {
      let i = t.querySelector(".csi102s"),
          out = t.querySelector(".o09"),
          o = t.querySelector(".uto912");
      
    Qe.set( o, {autoAlpha: 0 });
      let tl = Qe.timeline({ paused: true });
      let tlI = Qe.timeline({ paused: true });

     tl
        .fromTo(o, 
                { y: "65px" }, 
                { y: "-65px", duration: 3}, 0)
        .fromTo(o,
          { autoAlpha: 0 },
          { autoAlpha: 1 , duration: .7}, 0)
                
      tlI
      .fromTo(i, 
                { yPercent: -40 }, 
                { yPercent: 0, duration: 1 })
      
      // tlOut
      //   .to(i, { yPercent: 0}, {yPercent: 40, duration: 1}, 0)
      //   .to(o, 
      //     { autoAlpha: 0 , duration: 1}, 0);          
      

      // Optionally, you could trigger this timeline on scroll with ScrollTrigger
      ScrollTrigger.create({
          trigger: t,
          start: "top 20%",
          end: "top+=35%",
          animation: tl,
          scrub: true,
          
      });
      ScrollTrigger.create({
        trigger: out,
        start: "top bottom",
        end: "top top",
        animation: tlI,
        
        scrub: true,
    });
    
  });
}

function initMaterialStick(e) {
  e || (e = document);
  let t = e.querySelector(".c8123"),
      a = e.querySelectorAll(".clip1230"),
      i = a[0],
      o = a[1],
      p = a[2],
      x = e.querySelectorAll(".txt10123"),
      b = x[0],
      n = x[1],
      m = x[2];

      if (!t) {
        return;
    }

      Qe.set([o, p], { clipPath: "clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"});
      Qe.set([n, m], {opacity: .6});

      let tl = Qe.timeline({ paused: !0});

      tl
      .fromTo(i, 
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, 
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: .1 }
      )
      .fromTo(o, 
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, 
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      )
      .fromTo( b, {opacity: 1}, { opacity: .4, duration: .4}, "<")
      .to(n, { opacity: 1}, "<")
      .fromTo(p, 
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, 
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      )
      .to( n, { opacity: .4,  duration: .4}, "<")
      .to(m, { opacity: 1,  duration: .4}, "<");

      ScrollTrigger.create({ trigger: t, animation: tl, start: "top top", end: "bottom bottom", scrub: !0});
      
}


  function initHeadings(e) {
    function t(e, t) {
        ScrollTrigger.create({
            trigger: e,
            start: "top bottom",
            onLeaveBack: () => {
                t.progress(0), t.pause();
            },
        }),
            ScrollTrigger.create({
                trigger: e,
                start: "top 85%",
                onEnter: () => {
                    t.play();
                },
            });
    }
    e || (e = document);
    let o = document.querySelectorAll("[data-title]");
    (splitWords = new SplitType(o, { types: "lines" })),
        o.forEach(function (e, o) {
            let r = gsap.timeline({ paused: !0 });

            r.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
            r.fromTo(e.querySelectorAll(".line"), { autoAlpha: 0, yPercent: 75 }, { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "menu", stagger: { amount: 0.1 } }), t(e, r);
        });
    let r = e.querySelectorAll(".is-overline");
    if (r) {
        r.forEach(function (e, o) {
            let r = gsap.timeline({ paused: !0 });
            r.fromTo(e, { "--strikethrough": 0 }, { "--strikethrough": 1, duration: 1, delay: 0.5, ease: "expo.inOut", stagger: { amount: 0.1 } }), t(e, r);
        });
    }
}


function initHeros(e) {
  function t(e, t) {
      ScrollTrigger.create({
          trigger: e,
          start: "top bottom",
          onLeaveBack: () => {
              t.progress(0), t.pause();
          },
      }),
          ScrollTrigger.create({
              trigger: e,
              start: "top 85%",
              onEnter: () => {
                  t.play();
              },
          });
  }
  e || (e = document);
  let o = document.querySelectorAll("[data-title]");
  (splitWords = new SplitType(o, { types: "lines" })),
      o.forEach(function (e, o) {
          let r = gsap.timeline({ paused: !0 });

          r.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
          r.fromTo(e.querySelectorAll(".line"), { autoAlpha: 0, yPercent: 75 }, { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "menu", stagger: { amount: 0.1 } }), t(e, r);
      });
  let r = e.querySelectorAll(".is-overline");
  if (r) {
      r.forEach(function (e, o) {
          let r = gsap.timeline({ paused: !0 });
          r.fromTo(e, { "--strikethrough": 0 }, { "--strikethrough": 1, duration: 1, delay: 0.5, ease: "expo.inOut", stagger: { amount: 0.1 } }), t(e, r);
      });
  }
}

var navinit = function () {
const toggleBtn = document.querySelector(".sg-menu-toggle"),
  backdrop = document.querySelector(".sg-menu-backdrop"),
  menuFill = document.querySelector(".sg-menu-textdrop"),
  menuContent = document.querySelector(".sg-menu-content"),
  menuBox = document.querySelector(".sg-menu-box"),
  menu = document.querySelector(".sg-menu");

var opened = false;

// Timeline for showing the menu

var tlShow = Qe.timeline({ paused: true });
tlShow.set(menuBox, { display: "block" }, 0);
tlShow.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
tlShow.fromTo(
  menuFill,
  { scaleX: 0 },
  { scaleX: 1, ease: "expo.out", duration: 1 },
  0,
);
tlShow.fromTo(
  menuContent,
  { xPercent: -50 },
  { xPercent: 0, ease: "expo.out", duration: 1 },
  0,
);
tlShow
  .fromTo(menuContent, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
  .reverse();

var bindToggle = function () {
  toggleBtn.addEventListener("click", function () {
    toggle();
  });

  backdrop.addEventListener("click", function () {
    hide();
  });
};

var toggle = function () {
  opened ? hide() : show();
};

var show = function () {
  menu.classList.add("-open");
  tlShow.timeScale(1).play();
  // lenis.stop();
  opened = true;
};

var hide = function () {
  menu.classList.remove("-open");
  tlShow.timeScale(1.5).reverse();
  // lenis.start();
  opened = false;
};

bindToggle();
};


var splideInit = () => {
  const els = document.querySelectorAll(".splide-test");

  if (!els.length) {
    return;
  }

  // Loop through each splide instance
  els.forEach((t) => {
    const splide = new Splide(t, {
      start: 0,                
      perMove: 1, 
      focus: "center",
      perPage: 1,
      pagination: true,
      autoHeight: true,
      gap: '3rem',
      arrows: false,
      type: 'slide',
      drag: true,
      snap: true,
      autoWidth: false,
      autoplay: false,         // Initially disable autoplay
      interval: 2000,          // Set autoplay interval (3 seconds)
      pauseOnHover: true,      // Handle pause on hover
      pauseOnFocus: true,      // Ensure pause on focus (like keyboard interaction)
      resetProgress: false,
      breakpoints: {
        768: { 
          perPage: 1,
          gap: '2rem',
        },
      },
    }).mount();

    // GSAP ScrollTrigger to play the slider when it enters the viewport (play once)
    ScrollTrigger.create({
      trigger: t,             // Element to observe (Splide container)
      start: 'top bottom',       // Start when the top of the slider is 75% from the top of the viewport
      onEnter: () => {
        splide.Components.Autoplay.play();  // Start autoplay when entering the viewport
        ScrollTrigger.getById(t).kill();    // Kill ScrollTrigger to prevent further triggering
      },
    });

    // Pause autoplay on user interaction (dragging, clicking, hovering, or touch)
    const pauseAutoplay = () => {
      splide.Components.Autoplay.pause(); // Pause autoplay permanently
    };

    // Attach event listeners to the splide container for user interaction (drag, click, touch)
    t.addEventListener('click', pauseAutoplay);
    t.addEventListener('dragstart', pauseAutoplay);
    t.addEventListener('touchstart', pauseAutoplay);

    // Add event listener for any elements with the data-splide-card attribute
    const splideCards = t.querySelectorAll("[data-splide-card]");
    splideCards.forEach(card => {
      // Pause autoplay when dragging starts on a `data-splide-card`
      card.addEventListener('dragstart', pauseAutoplay);

      // Pause autoplay when hovering over a `data-splide-card`
      card.addEventListener('mouseenter', pauseAutoplay);

      // Pause autoplay when touching/pressing a `data-splide-card` on mobile/touch devices
      card.addEventListener('touchstart', pauseAutoplay);
    });
  });
}

var splideLInit = () => {
  const els = document.querySelectorAll(".splide-l");

  if (!els.length) {
    return;
  }

  // Loop through each splide instance
  els.forEach((t) => {
    // Initialize Splide with the desired configuration
    var splide = new Splide(t, {
      // start: 0,                
      // perMove: 1, 
      focus: "center",
      // perPage: 1,
      pagination: false,
      // autoHeight: true,
      gap: '3rem',
      arrows: true,
      type: 'slide',
      drag: true,
      breakpoints: {
        768: { 
          // perPage: 1,
          gap: '2rem',
        },
      },
    });

    // Select the progress bar inside the current Splide instance
    var bar = t.querySelector('.splide-prog-bar');

    // Updates the bar width whenever the carousel moves:
    splide.on('mounted move', function () {
      var end  = splide.Components.Controller.getEnd() + 1;
      var rate = Math.min((splide.index + 1) / end, 1);
      if (bar) { // Check if the progress bar exists
        bar.style.width = String(100 * rate) + '%';
      }
    });

    // Mount the Splide instance
    splide.mount();
  });
}
  
var faqAccord = function () {
let groups = Qe.utils.toArray(".faq-menu");
let menus = Qe.utils.toArray(".faq-item");
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

Qe.set(box, { height: "auto" });
Qe.set(questionText, { marginLeft: "2vw" });

let timeline = Qe
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



          
      
  // loaded //
window.addEventListener("DOMContentLoaded", function () {

navinit(), faqAccord(),  initHeadings(),  initMachineHero(), initMaterialStick(), initStickywipe(), splideInit(), splideLInit();


// end
});



window.addEventListener("pagehide", function () {
window.scrollTo(0, 0);
});
})();

// quote form //

document.addEventListener('keypress', function(event) {
  if (event.which === 13) {
      event.preventDefault();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {  // tab pressed
      event.preventDefault(); // stops its action
  }
});

document.querySelectorAll('.u-mutli-next-btn, .radio_button').forEach(function(button) {
  button.addEventListener('click', function() {
      var nextButton = document.querySelector('.form_next');
      if (nextButton) {
          nextButton.click();
      }
  });
});


document.querySelectorAll('.u-mutli-back-btn').forEach(function(button) {
  button.addEventListener('click', function() {
      var nextButton = document.querySelector('.form_prev');
      if (nextButton) {
          nextButton.click();
      }
  });
});

var slideNumber = document.querySelectorAll('.slider_slide').length; 
var totalNumberElement = document.querySelector('.total-number');
if (totalNumberElement) {
  totalNumberElement.textContent = slideNumber; 
}

function sliderAnimation() {
  var currentSlide = Array.from(document.querySelectorAll('.w-slider-dot')).findIndex(dot => dot.classList.contains('w-active')) + 1; // Make currentSlide start from 1
  var formPrev = document.querySelector('.u-mutli-back-btn');
  if (formPrev) {
      if (currentSlide === 1) { // Adjust logic for hiding previous button
          formPrev.classList.add('u-hidden');
      } else {
          formPrev.classList.remove('u-hidden');
      }
  }
  
  var firstElement = document.querySelector('.first');
  if (firstElement) {
      firstElement.textContent = currentSlide - 1;
  }
  
  var secondElement = document.querySelector('.second');
  if (secondElement) {
      secondElement.textContent = currentSlide; 
  }
  
  var percent = 20 + ((currentSlide - 1) / (slideNumber - 1)) * 80;
  var percentRound = percent.toFixed(0);
  var formPercentElement = document.querySelector('.form_percent');
  if (formPercentElement) {
      formPercentElement.textContent = percentRound;
  }
  
  var formProgressFillElement = document.querySelector('.form_progress-fill');
  if (formProgressFillElement) {
      formProgressFillElement.style.width = percentRound + '%';
  }
}

document.querySelectorAll('.u-mutli-next-btn, .u-mutli-back-btn, .radio_button').forEach(function(button) {
  button.addEventListener('click', function() {
      setTimeout(sliderAnimation, 200);
  });
});

function validateForm(item) {
  var siblingButton = item.closest('.slider_slide').querySelector('.form_button');
  if (siblingButton) {
      if (item.value.length > 1) {
          siblingButton.classList.add('form-active');
      } else {
          siblingButton.classList.remove('form-active');
      }
  }
}

document.querySelectorAll('.form_field').forEach(function(field) {
  field.addEventListener('keydown', function() {
      validateForm(this);
  });
  field.addEventListener('focusout', function() {
      validateForm(this);
  });
});