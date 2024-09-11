import gsap from "gsap";
import {Swiper} from "swiper";
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
          start: "top top",
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

       
        Qe.set(aa, { visibility: "visible" });
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

        // Optionally, you could trigger this timeline on scroll with ScrollTrigger
        ScrollTrigger.create({
            trigger: t,
            start: "top top",
            end: "bottom center",
            animation: tl,
            scrub: true,
            markers: !0,
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

// Exploded view animation - WIP //
  function initExplode(e) {
    e || (e = document);
    let t = e.querySelector("[data-explode]"),
        a = e.querySelectorAll(".u-img-to-explode"),
        i = a[0],
        l = a[1],
        s = a[2];
        
    gsap.set(a, { visibility: "visible" }),
        // gsap.set([o, r, n], { display: "block" }),
        gsap
            .timeline({ defaults: { ease: "sine.out", duration: 0.6 } })
            .fromTo(i, { y: "-30vw" }, { y: "0vw", duration: 1, ease: "expo.out" }, 0)
            // .fromTo(r, { y: "0vw" }, { y: "-25vw", duration: 0.8 }, 0.1)
            .fromTo(l, { y: "10vw" }, { y: "0vw", duration: 1, ease: "expo.out" }, "<")
            // .fromTo(n, { y: "0vw" }, { y: "-40vw", duration: 0.6 }, 0.2)
            .fromTo(s, { y: "20vw" }, { y: "0vw", duration: 1.3, ease: "expo.out" }, "<")
            // .fromTo([o, r, n], { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power1.out" }, 0.6);
    let m = gsap.timeline({ defaults: { ease: "linear", duration: 1 }, paused: !0 });
    m
        .fromTo(i, { y: "-10vw" }, { y: "0vw" })
        .fromTo(s, { y: "-30vw" }, { y: "0vw", duration: 1 }, 0)
        
        ScrollTrigger.create({ trigger: t, animation: m, start: "top top", end: "bottom center-=30%", scrub: !0 }),
        (colorIntroFlag = !1);
}



  function initPageEnd() {
    const el = document.querySelectorAll(".footer_wrapper");
    if (!el.length) return;

    el.forEach((els) => {
      let t = els.querySelector(".spacer_wrap"),
        e = els.querySelector(".footer-end"),
        r = els.querySelector(".footer_inner"),
        n = els.querySelector(".footer_el.is-center");
    if (!t) return;
    let a = gsap.timeline({ defaults: { ease: "linear" } });
    a
        .fromTo(
            "#progress",
            { drawSVG: "0%" },
            {
                drawSVG: "100%",
                duration: 1,
            }
        )
        .fromTo(r, { opacity: 0, yPercent: 35 }, { opacity: 1, yPercent: 0, duration: 1 }, 0)
        .fromTo(n, { rotate: 50 }, { rotate: 0, duration: 1 }, 0),
        ScrollTrigger.create({ trigger: t, animation: a, start: "bottom 90%", endTrigger: e, end: "bottom-=2 bottom", scrub: !0 });

    })
    
    
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
            r.fromTo(e.querySelectorAll(".line"), { opacity: 0, yPercent: 75 }, { opacity: 1, yPercent: 0, duration: 0.8, ease: "menu", stagger: { amount: 0.1 } }), t(e, r);
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



function initHighlights(e) {
  e || (e = document);
  let t = e.querySelectorAll(".highlight-line"),
      o = e.querySelectorAll(".bg-line"),
      r = e.querySelectorAll(".intro-line"),
      n = e.querySelectorAll(".word");
  
      gsap.set([t, o, r], { strokeDashoffset: -1600 }),
      gsap.from(n, { autoAlpha: 0, duration: 0.6, ease: "power3.inOut", delay: 2, stagger: 0.1 }),
      // gsap.from([i, l], { autoAlpha: 0, yPercent: 50, duration: 0.8, ease: "power3.inOut", delay: 2.6, stagger: 0.05 }),
      // gsap.from(s, { scaleY: 0, delay: 2.7, duration: 0.6, ease: "power3.inOut" }),
      gsap.fromTo(o, { drawSVG: "0%" }, { drawSVG: "100%", duration: 4, ease: "power4.inOut", stagger: { each: 0.05, from: "left" } }),
      gsap.from(o, { stroke: "#FFFFFF20", delay: 2, duration: 2, ease: "power4.inOut" }),
      gsap.fromTo(r, { strokeDashoffset: -1500, strokeDasharray: "1600px 1500px" }, { strokeDashoffset: 1500, strokeDasharray: "0px 1500px", duration: 4, delay: 0, ease: "power3.inOut", stagger: { each: 0.05, from: "left" } }),
      gsap.delayedCall(1.75, () => {
          gsap.fromTo(t, { strokeDashoffset: -1550 }, { strokeDashoffset: 1550, duration: 4, ease: "circ.inOut", stagger: { each: 0.05, from: "center" }, repeat: -1 });
      });
}

function initBlob(e) {
  e || (e = document);
  const t = {
      inner: [
          { path: "M282.3 0C525.94 0 714 207.447 714 451.898C714 655.918 485.644 744 282.3 744C123.932 744 0 610.793 0 451.898C0 243.621 74.7142 0 282.3 0Z", color: "#4C00FF" },
          {
              path:
                  "M375.429 0.103177C509.902 1.9222 659.452 36.7684 701.193 164.738C743.058 293.087 643.927 410.92 535.723 491.533C422.146 576.15 277.867 645.913 159.3 568.458C25.066 480.769 -35.6318 305.494 21.3907 155.542C72.0736 22.261 232.971 -1.82384 375.429 0.103177Z",
              color: "#26065D",
          },
          { path: "M373.039 13.8828C592.854 -36.1491 884 45.5798 884 315.714C884 541.171 765.716 818 540.582 818C365.244 818 0 593.613 0 418.023C0 187.863 165.6 61.0977 373.039 13.8828Z", color: "#FF5252" },
      ],
      outer: [
          { path: "M369.284 0C687.994 0 934 270.741 934 589.775C934 856.044 635.283 971 369.284 971C162.118 971 0 797.15 0 589.775C0 317.952 97.7354 0 369.284 0Z", color: "#EDE5FF" },
          {
              path:
                  "M532.781 0.146025C723.616 2.72045 935.846 52.0376 995.082 233.151C1054.49 414.801 913.815 581.567 760.26 695.659C599.08 815.415 394.329 914.149 226.067 804.529C35.5718 680.424 -50.566 432.361 30.3561 220.136C102.282 31.5056 330.616 -2.58125 532.781 0.146025Z",
              color: "#E9E6EF",
          },
          { path: "M373.039 13.8828C592.854 -36.1491 884 45.5798 884 315.714C884 541.171 765.716 818 540.582 818C365.244 818 0 593.613 0 418.023C0 187.863 165.6 61.0977 373.039 13.8828Z", color: "#FFEEEE" },
      ],
  };
  let o = gsap.timeline({ repeat: -1, repeatDelay: 0 }),
      r = e.querySelector("#innerBlob"),
      n = e.querySelector("#outerBlob"),
      a = e.querySelectorAll(".u-blob-text");
  const i = 0.8,
      l = t.inner.length;
  t.inner.forEach((e, a) => {
      const l = t.outer[a];
      o.to(r, { morphSVG: { shape: e.path, type: "rotational", origin: "80% 80% 100% 50%" }, fill: e.color, duration: i, ease: "power2.inOut" }, 1.3 * a).to(
          n,
          { morphSVG: { shape: l.path, type: "rotational", origin: "80% 80% 100% 50%" }, fill: l.color, duration: i, ease: "power2.inOut" },
          1.3 * a
      );
  }),
      o.to(a, { y: "-100%", duration: i, ease: "power2.inOut" }, "1.1"),
      o.to(a, { y: "-200%", duration: i, ease: "power2.inOut" }, 1.3 + 1.1),
      o.to(
          a,
          {
              y: "-300%",
              duration: i,
              ease: "power2.inOut",
              onComplete: () => {
                  gsap.set(a, { y: "0%" });
              },
          },
          3 * 1.3
      );
  const s = t.inner[0],
      u = t.outer[0];
  o.to(r, { morphSVG: s.path, fill: s.color, duration: i, ease: "power2.inOut" }, 1.3 * l).to(n, { morphSVG: u.path, fill: u.color, duration: i, ease: "power2.inOut" }, 1.3 * l);
}





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

  const marquee = document.querySelectorAll(".u-swipe");
  if (!marquee) {
      console.log("No marquee not found on the page");
      return;
    }

      marquee.forEach((e) => {
      const items = e.querySelector(".u-swipe-items"),
          item = e.querySelectorAll(".u-swipe-item");

      e.classList.add("swiper-container");
      items.classList.add("swiper-wrapper");
      item.forEach((e) => e.classList.add("swiper-slide"));

      const slider = new Swiper(e, {
          slidesPerView: "auto",
          loop: false,
          slidesPerView: 1,
          slidesPerGroup: 1,
          speed: 300,
          spaceBetween: 50,
          // Adding navigation options
          // navigation: {
          // nextEl: ".gl-swipe-button.next", // Specify the class for the next button
          // prevEl: ".gl-swipe-button.back", // Specify the class for the previous button
          // },
          breakpoints: {
          991: {
              slidesPerView: "auto",
          },
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
          nextEl: ".gl-fleet-button.next", // Specify the class for the next button
          prevEl: ".gl-fleet-button.back", // Specify the class for the previous button
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

navinit(),vimeoModal(), reelerX(), faqAccord(), initHighlights(), initBlob(), initPageEnd(), initHeadings(), initExplode(), initMachineHero(), initMaterialStick(), initStickywipe();

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
  Qe.set(clipEl, { display: "flex" });
  Qe.fromTo(
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
  Qe.to(clipEl, {
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

Qe.set(card, { autoAlpha: 1 });
Qe.set(title, { autoAlpha: 1 });

const tl = Qe.timeline({
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
Qe.set(t, { yPercent: -10, scale: 1.05, willChange: "transform" });

// Create a Qe timeline with ScrollTrigger
const tl = Qe.timeline({
    scrollTrigger: {
    trigger: e,
    start: "top bottom",
    end: "bottom top",
    scrub: 0.4,
    },
});

tl.fromTo(t, { yPercent: -10 }, { yPercent: 10, scale: 1.05, ease: "none" });
});

      
});



window.addEventListener("pagehide", function () {
window.scrollTo(0, 0);
});
})();