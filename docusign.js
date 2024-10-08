const isMobile = window.innerWidth < 480,
    isMobileLandscape = window.innerWidth < 768;
let bgSoundOn = document.querySelector("#sound-bg-on"),
    bgSoundOff = document.querySelector("#sound-bg-off");
var backgroundMusic = new Howl({ src: ["https://cdn.jsdelivr.net/gh/niccolomiranda/docusign/audio/docusign_audiomaster.mp3"], volume: 0.05, loop: !0, autoplay: !1, html5: !!isMobile });
function startBackgroundMusic() {
    backgroundMusic.playing() || (backgroundMusic.volume(0), backgroundMusic.play(), backgroundMusic.fade(0, 0.25, 1e3), gsap.to(bgSoundOn, { opacity: 1, duration: 0.2 }), sessionStorage.setItem("musicPlaying", "true"));
}
function stopBackgroundMusic() {
    backgroundMusic.playing() &&
        (backgroundMusic.fade(0.1, 0, 1e3),
        setTimeout(function () {
            backgroundMusic.pause();
        }, 1e3),
        gsap.to(bgSoundOn, { opacity: 0, duration: 0.2 }),
        sessionStorage.setItem("musicPlaying", "false"));
}
function resumeBackgroundMusic() {
    "true" === sessionStorage.getItem("musicPlaying") && (backgroundMusic.play(), backgroundMusic.fade(0, 0.1, 1e3), gsap.to(bgSoundOn, { opacity: 1, duration: 0.2 }));
}
let splitWords, splitLines;
document.addEventListener("visibilitychange", function () {
    "hidden" === document.visibilityState
        ? backgroundMusic.playing() &&
          (backgroundMusic.fade(0.1, 0, 1e3),
          setTimeout(function () {
              backgroundMusic.pause();
          }, 1e3))
        : "visible" === document.visibilityState && resumeBackgroundMusic();
}),
    document.getElementById("music-toggle").addEventListener("click", function () {
        backgroundMusic.playing() ? stopBackgroundMusic() : startBackgroundMusic();
    }),
    "/" === window.location.pathname || "/index.html" === window.location.pathname ? backgroundMusic.playing() : startBackgroundMusic();
let ranGeneral = !1,
    pageText = document.querySelector('[data-page-text="current"]'),
    pageNr = document.querySelector('[data-page-text="number"]'),
    highlightFlag = !1,
    logoIntroFlag = !1,
    ElementsIntroFlag = !1,
    headingIntroFlag = !1,
    typeIntroFlag = !1,
    colorIntroFlag = !1,
    scrollAttempts = 0;
const threshold = 50;
let morphingTween,
    scrollTimer = null,
    hasLogged = !1,
    menuToggle = document.querySelector("#menu-btn");
function runSplit(e) {
    e || (e = document);
    let t = e.querySelectorAll("[data-split-words]"),
        o = e.querySelectorAll("[data-split-lines]");
    (splitWords = new SplitType(t, { types: "lines, words" })), (splitLines = new SplitType(o, { types: "lines" }));
}
let menuOpenTl,
    menuCloseTl,
    windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
    windowWidth !== $(window).innerWidth() && ((windowWidth = $(window).innerWidth()), splitWords.revert(), splitLines.revert(), runSplit());
}),
    CustomBounce.create("menu", { strength: 0.1, endAtStart: !1, squash: 2, squashID: "menu-squash" }),
    CustomEase.create("menu", "0.49, 0.01, 0, 0.95"),
    CustomEase.create("menuLeave", "0.61, 0.03, 0, 0.95");
let menuInitialized = !1,
    menuButton = document.querySelector(".menu_trigger"),
    menuLinks = document.querySelectorAll(".menu-link"),
    closeButton = document.querySelector(".close-btn"),
    menuWrapper = document.querySelector(".menu-w"),
    menuBg = document.querySelector(".menu-bg"),
    menuNavButtons = document.querySelectorAll(".menu-btn"),
    menuLinkWrap = document.querySelector(".menu-links");
function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function resetWebflow(e) {
    let t = new DOMParser().parseFromString(e.next.html, "text/html").querySelector("html").getAttribute("data-wf-page");
    document.documentElement.setAttribute("data-wf-page", t), window.Webflow.destroy(), window.Webflow.ready(), window.Webflow.require("ix2").init();
}
function initHeroHeadings(e) {
    e || (e = document);
    let t = e.querySelector("[data-hero-title]");
    t &&
        ((splitWords = new SplitType(t, { types: "lines" })),
        gsap.set(t.querySelectorAll(".line"), { yPercent: 100, opacity: 0 }),
        gsap.set("[data-hero-title]", { opacity: 1 }),
        gsap.delayedCall(1, () => {
            gsap.to(t.querySelectorAll(".line"), { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" });
        }),
        (headingIntroFlag = !1));
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
    let o = e.querySelectorAll("[data-title]");
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
function initMenu(e) {
    if (menuInitialized) return;
    (menuInitialized = !0), e || (e = document), CustomBounce.create("myBounce", { strength: 0.2, squash: 0 });
    (menuOpenTl = gsap.timeline({ paused: !0, defaults: { ease: "menu-squash", duration: 1.5 } })),
        (menuCloseTl = gsap.timeline({ paused: !0, defaults: { ease: "menu-squash", duration: 1, overwrite: "auto" } })),
        menuButton.addEventListener("click", () => {
            "/" !== menuButton.getAttribute("href") && (menuOpenTl.progress(0).timeScale(1).play(), lenis.stop());
        }),
        closeButton.addEventListener("click", () => {
            menuCloseTl.progress(0).timeScale(1).play(), lenis.start();
        }),
        menuCloseTl
            .to(menuButton, { yPercent: 0, autoAlpha: 1, ease: "power4.inOut", duration: 0.45 }, 0)
            .to(closeButton, { yPercent: -50, autoAlpha: 0, ease: "power4.inOut", duration: 0.45 }, 0)
            .to(menuNavButtons, { yPercent: -50, autoAlpha: 0, ease: "power4.inOut", duration: 0.45, stagger: { each: 0.05, from: "end" } }, 0)
            .to(".menu-link", { y: "-100vh", stagger: 0.01, duration: 0.7, ease: "menuLeave", overwrite: !0 }, 0)
            .to(".menu-links", { yPercent: -110, duration: 0.7, ease: "menuLeave" }, 0.1)
            .set(menuWrapper, { display: "none" }),
        menuOpenTl
            .set(menuWrapper, { display: "flex", yPercent: 0 })
            .set(menuBg, { background: "white" })
            .set(".menu-links", { yPercent: 0, display: "block" })
            .fromTo(menuBg, { yPercent: -100 }, { yPercent: 0, duration: 1.2, ease: "power4.inOut" })
            .to(menuButton, { yPercent: 50, autoAlpha: 0, ease: "power4.inOut", duration: 0.45 }, 0)
            .fromTo(closeButton, { yPercent: -50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: "power4.inOut", duration: 0.45 }, 0.5)
            .fromTo(menuNavButtons, { yPercent: -50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: "power4.inOut", duration: 0.45, stagger: { each: 0.05, from: "end" } }, 0.5)
            .from(".menu-link.is--logo", { y: "-125vh", duration: 1, ease: "myBounce", overwrite: "auto" }, 0.1)
            .from(".menu-link.is--intro", { y: "-100vh", duration: 1, ease: "myBounce", overwrite: "auto" }, 0.1)
            .from(".menu-link.is--typography", { y: "-100vh", duration: 1, ease: "myBounce", overwrite: "auto" }, 0.2)
            .from(".menu-link.is--color", { y: "-100vh", rotate: 35, duration: 1, ease: "myBounce", overwrite: "auto" }, 0.3)
            .from(".menu-link.is--motion", { y: "-85vh", rotate: -65, duration: 1, ease: "myBounce", overwrite: "auto" }, 0.5)
            .from(".menu-link.is--elements", { y: "-100vh", rotate: -35, duration: 1, ease: "myBounce", overwrite: "auto" }, 0.5)
            .from(".menu-link.is--sound", { y: "-100vh", rotate: 60, duration: 1, ease: "myBounce", overwrite: "auto" }, 0.65);
}
function initMenuProgress(e) {
    e || (e = document),
        gsap.fromTo("#scroll-progress", { strokeDashoffset: -250 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: e, start: "top top", end: "bottom bottom", scrub: !0 } }),
        e.querySelector(".back-button__wrap") && gsap.fromTo(".back-button__wrap", { yPercent: 0 }, { yPercent: -200, duration: 0.6, ease: "linear", scrollTrigger: { trigger: e, start: "top top", end: "top+=50 top", scrub: 0.5 } });
}
function runBackTransition(e, t) {
    e.querySelector("path");
    let o = e.querySelectorAll("[data-top-button]"),
        r = o[0].textContent,
        n = o[1].textContent,
        a = document.querySelectorAll("[data-menu-transition-text]");
    (a[0].textContent = r), (a[1].textContent = n);
    let i = e.getAttribute("data-color");
    "elements" === n ? gsap.set(".menu-overlay__inner", { color: "#000", overwrite: "auto" }) : gsap.set(".menu-overlay__inner", { color: "#fff", overwrite: "auto" }),
        gsap.to(e, { duration: 0.7, ease: "expo.inOut", yPercent: -50, autoAlpha: 0 }),
        gsap.set(menuWrapper, { display: "flex", yPercent: 0 }),
        gsap.set(".menu-link", { display: "none" }),
        gsap.set(".menu-links", { yPercent: 0, overwrite: "auto" }),
        gsap.set(menuBg, { background: i, overwrite: "auto" }),
        gsap.fromTo(menuBg, { yPercent: 105 }, { yPercent: 0, duration: 0.7, ease: "menuLeave" }),
        gsap.delayedCall(0.2, () => {
            document.querySelectorAll(".menu-overlay__svg");
            let e = document.querySelector(`#center-${n}`),
                t = e.querySelectorAll("path");
            gsap.set(e, {
                visibility: "visible",
                onComplete: () => {
                    gsap.fromTo(t, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, delay: 0.1, stagger: 0.15, ease: "cubic.inOut" });
                },
            }),
                gsap.to(a, { y: 0, duration: 0.7, stagger: 0.05, ease: "cubic.inOut" }),
                "introduction" === n && gsap.to(["#music-toggle", "#menu-btn"], { autoAlpha: 0, duration: 0.4, overwrite: !0 });
        }),
        gsap.delayedCall(2, () => {
            "Logo" === n && initLogoIntro(), "Elements" === n && initCube(), "Typography" === n && initTypographyIntro(), "Color" === n && initColorIntro(), initHeroHeadings(t);
        }),
        gsap.delayedCall(3, () => {
            menuWrapper.querySelectorAll("path");
            "introduction" !== n ? gsap.to(menuButton, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "menu" }) : (gsap.set("#nav", { autoAlpha: 0 }), gsap.set(menuButton, { yPercent: 0, autoAlpha: 1 })),
                gsap.set(o, { autoAlpha: 1, yPercent: 0 }),
                gsap.set(a, { y: "100%" }),
                gsap.set(menuWrapper, { display: "none" }),
                gsap.set(menuBg, { yPercent: -100, background: "white" }),
                gsap.set(".menu-overlay__svg", { visibility: "hidden" }),
                gsap.set(".menu-link", { autoAlpha: 1, display: "flex", width: "inherit", inset: "auto", clearProps: "all" });
        });
}
function runMenuTransition(e, t) {
    return new Promise((o) => {
        let r = e.querySelector("path"),
            n = e.querySelector(".menu-link__text").querySelectorAll("div"),
            a = n[0].textContent,
            i = n[1].textContent,
            l = document.querySelectorAll("[data-menu-transition-text]");
        (l[0].textContent = a), (l[1].textContent = i), "Elements" === i ? gsap.set(".menu-overlay__inner", { color: "#000" }) : gsap.set(".menu-overlay__inner", { color: "#fff" });
        let s = e.getAttribute("data-color");
        gsap.to(r, { duration: 1, fill: s, stroke: s, ease: "menu", repeat: 1, yoyo: !0, repeatDelay: 1.4, morphSVG: { shape: "#page-cover", origin: "100% 50%" } }),
            gsap.to(e, { duration: 0.7, ease: "expo.inOut", width: "100vw", rotate: 0, top: 0, left: 0, right: 0, bottom: 0 }),
            gsap.to(n, { autoAlpha: 0, yPercent: 50, duration: 0.2, stagger: 0.05 }),
            gsap.to(closeButton, { yPercent: -50, autoAlpha: 0, duration: 0.2 }),
            gsap.to(menuNavButtons, { yPercent: -50, autoAlpha: 0, duration: 0.2, stagger: { each: 0.05, from: "end" } }),
            menuLinks.forEach((t) => {
                t !== e && gsap.to(t, { duration: 0.1, autoAlpha: 0 });
            }),
            gsap.delayedCall(0.2, () => {
                let t = document.querySelectorAll(".menu-overlay__svg");
                const o = Array.prototype.indexOf.call(e.parentNode.children, e);
                let r = t[o - 1].querySelectorAll("path");
                gsap.set(t[o - 1], {
                    visibility: "visible",
                    onComplete: () => {
                        gsap.fromTo(r, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.7, delay: 0.1, stagger: 0.15, ease: "cubic.inOut", onComplete: () => {} });
                    },
                }),
                    gsap.to(l, { y: 0, duration: 0.7, stagger: 0.05, ease: "cubic.inOut" });
            }),
            gsap.delayedCall(2, () => {
                "Logo" === i && initLogoIntro(), "Elements" === i && initCube(), "Typography" === i && initTypographyIntro(), "Color" === i && initColorIntro(), initHeroHeadings(t);
            }),
            gsap.delayedCall(3, () => {
                let e = menuWrapper.querySelectorAll("path");
                "Introduction" !== i ? gsap.to(menuButton, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "menu" }) : (gsap.set("#nav", { autoAlpha: 0 }), gsap.set(menuButton, { yPercent: 0, autoAlpha: 1 })),
                    gsap.set(n, { autoAlpha: 1, yPercent: 0 }),
                    gsap.set(e, { stroke: "#000", fill: "white", overwrite: "auto", clearProps: "fill,stroke" }),
                    gsap.set(l, { y: "100%" }),
                    gsap.set(r, { opacity: 1, fill: "#fff", stroke: "currentColor", clearProps: "all" }),
                    gsap.set(".menu-overlay__svg", { visibility: "hidden" }),
                    gsap.set(".menu-link", { autoAlpha: 1, width: "inherit", inset: "auto", clearProps: "all" });
            });
    });
}
function initIntroLoad(e) {
    e || (e = document), MorphSVGPlugin.convertToPath(".pre-loader circle");
    let t = e.querySelector("#load-progress"),
        o = e.querySelector("#progress-bar"),
        r = e.querySelector("#load-inner"),
        n = e.querySelectorAll(".loader-title"),
        a = e.querySelector(".loader_bottom"),
        i = e.querySelector(".loader_button"),
        l = e.querySelector(".intro-bg__blob");
    gsap.timeline({
        defaults: { ease: "power4.inOut", duration: 0.8 },
        onComplete: () => {
            i.addEventListener("click", () => {
                initReel(e);
                var t = e.querySelector("#showreel-video");
                t.play()
                    .then(() => {
                        gsap.fromTo(t, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
                    })
                    .catch((e) => {
                        console.error("Error:", e);
                    });
            });
        },
    })
        .to(o, { opacity: 1, duration: 0.4, ease: "ease.inOut" })
        .fromTo(t, { strokeDasharray: "0, 301" }, { strokeDasharray: "301, 301", duration: 4 })
        .to(a, { autoAlpha: 1, yPercent: 0 }, "<")
        .to(l, { opacity: 0.1, duration: 4, x: "5vw" }, 0)
        .to(n, { y: "0%", stagger: 0.1, duration: 1 })
        .to([t, r], { drawSVG: "0%", duration: 1, stagger: 0.1 }, "<")
        .to(a, { autoAlpha: 0, yPercent: 50 }, "<")
        .to(i, { autoAlpha: 1, y: "0%" }, "<+=0.4");
}
function initReel(e) {
    e || (e = document);
    var t = e.querySelector("#showreel-video"),
        o = e.querySelector("#showreel-wrap");
    let r = e.querySelector(".loader_button"),
        n = e.querySelectorAll(".loader-title"),
        a = e.querySelector(".progress_bar-wrap"),
        i = e.querySelector(".bottom_nav.is-showreel");
    var l;
    let s = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 0.6 },
        onComplete: () => {
            gsap.set(".pre-loader", { display: "none" });
        },
    });
    function u(e) {
        var o = "down" === e ? -0.1 : 0.1,
            r = "down" === e ? 0 : 1;
        l && clearInterval(l),
            (l = setInterval(function () {
                ("down" === e && t.volume > 0) || ("up" === e && t.volume < 1) ? (t.volume = Math.max(0, Math.min(1, t.volume + o))) : ((t.volume = r), clearInterval(l));
            }, 200));
    }
    backgroundMusic.playing() && (stopBackgroundMusic(), gsap.to("#sound-bg-on", { opacity: 0, duration: 0.2 })),
        s.set(o, { display: "flex" }).from(i, { autoAlpha: 0, yPercent: 50 }, "<").to(n, { yPercent: 100 }, 0).to(a, { opacity: 0 }, "<").to(r, { opacity: 0, yPercent: 25 }, "<"),
        e.querySelector("#showreel-sound").addEventListener("click", function () {
            t.muted
                ? ((t.muted = !1), u("up"), gsap.to("#sound-vid-on", { opacity: 1, duration: 0.2 }), gsap.to("#sound-bg-on", { opacity: 1, duration: 0.2 }))
                : (u("down"),
                  setTimeout(function () {
                      t.muted = !0;
                  }, 500),
                  gsap.to("#sound-vid-on", { opacity: 0, duration: 0.2 }),
                  gsap.to("#sound-bg-on", { opacity: 0, duration: 0.2 }));
        }),
        e.querySelector("#skip-showreel").addEventListener("click", function () {
            t.pause(), $(o).fadeOut("slow", function () {}), gsap.set(".hero-w", { autoAlpha: 1 }), initHighlights(e), (highlightFlag = !0), !0 !== t.muted && startBackgroundMusic();
        }),
        t.addEventListener("ended", function () {
            $(o).fadeOut("slow", function () {
                !1 === highlightFlag && (gsap.set(".hero-w", { autoAlpha: 1 }), initHighlights(e), backgroundMusic.playing() || !0 === t.muted || startBackgroundMusic());
            });
        });
}
function initHighlights(e) {
    e || (e = document);
    let t = e.querySelectorAll(".highlight-line"),
        o = e.querySelectorAll(".bg-line"),
        r = e.querySelectorAll(".intro-line"),
        n = e.querySelectorAll(".word"),
        a = e.querySelector(".scroll_wrap"),
        i = a.querySelectorAll(".body-16"),
        l = a.querySelector(".scroll_ico"),
        s = a.querySelector(".scroll_wrap-line");
    gsap.fromTo("#nav", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, clearProps: "yPercent", ease: "menu" }),
        gsap.to(["#music-toggle", "#menu-btn"], { autoAlpha: 1, duration: 0.4, overwrite: !0 }),
        gsap.set([t, o, r], { strokeDashoffset: -1600 }),
        gsap.from(n, { autoAlpha: 0, duration: 0.6, ease: "power3.inOut", delay: 2, stagger: 0.1 }),
        gsap.from([i, l], { autoAlpha: 0, yPercent: 50, duration: 0.8, ease: "power3.inOut", delay: 2.6, stagger: 0.05 }),
        gsap.from(s, { scaleY: 0, delay: 2.7, duration: 0.6, ease: "power3.inOut" }),
        gsap.fromTo(o, { drawSVG: "0%" }, { drawSVG: "100%", duration: 4, ease: "power4.inOut", stagger: { each: 0.05, from: "left" } }),
        gsap.from(o, { stroke: "#FFFFFF20", delay: 2, duration: 2, ease: "power4.inOut" }),
        gsap.fromTo(r, { strokeDashoffset: -1500, strokeDasharray: "1600px 1500px" }, { strokeDashoffset: 1500, strokeDasharray: "0px 1500px", duration: 4, delay: 0, ease: "power3.inOut", stagger: { each: 0.05, from: "left" } }),
        gsap.delayedCall(1.75, () => {
            gsap.fromTo(t, { strokeDashoffset: -1550 }, { strokeDashoffset: 1550, duration: 4, ease: "circ.inOut", stagger: { each: 0.05, from: "center" }, repeat: -1 }), initIntroScroll(e);
        }),
        (highlightFlag = !0),
        lenis.start();
}
function initShowreelSound(e) {
    e || (e = document);
    let t = e.querySelector("#showreel-sound");
    if (!t) return;
    let o = t.querySelector(".svg-wrap"),
        r = !0;
    t.addEventListener("click", function () {
        r
            ? (gsap.to("#showreel-on", {
                  duration: 0.8,
                  ease: "expo.out",
                  morphSVG: {
                      shape: "#showreel-muted",
                      type: "rotational",
                      origin: "100% 100%",
                      precompile: [
                          "M155,144 C155,150.075 150.075,155 144,155 137.925,155 133,150.075 133,144 133,137.925 137.925,133 144,133 150.075,133 155,137.925 155,144 zM155,110 C155,116.075 150.075,121 144,121 137.925,121 133,116.075 133,110 133,103.925 137.925,99 144,99 150.075,99 155,103.925 155,110 zM155,78 C155,84.0751 150.075,89 144,89 137.925,89 133,84.0751 133,78 133,71.9249 137.925,67 144,67 150.075,67 155,71.9249 155,78 zM122,144 C122,150.075 117.075,155 111,155 104.925,155 100,150.075 100,144 100,137.925 104.925,133 111,133 117.075,133 122,137.925 122,144 zM122,111 C122,117.075 117.075,122 111,122 104.925,122 100,117.075 100,111 100,104.925 104.925,100 111,100 117.075,100 122,104.925 122,111 zM122,78 C122,84.0751 117.075,89 111,89 104.925,89 100,84.0751 100,78 100,71.9249 104.925,67 111,67 117.075,67 122,71.9249 122,78 zM122,45 C122,51.0751 117.075,56 111,56 104.925,56 100,51.0751 100,45 100,38.9249 104.925,34 111,34 117.075,34 122,38.9249 122,45 zM89,144 C89,150.075 84.0751,155 78,155 71.9249,155 67,150.075 67,144 67,137.925 71.9249,133 78,133 84.0751,133 89,137.925 89,144 zM89,111 C89,117.075 84.0751,122 78,122 71.9249,122 67,117.075 67,111 67,104.925 71.9249,100 78,100 84.0751,100 89,104.925 89,111 zM56,144 C56,150.075 51.0751,155 45,155 38.9249,155 34,150.075 34,144 34,137.925 38.9249,133 45,133 51.0751,133 56,137.925 56,144 zM56,111 C56,117.075 51.0751,122 45,122 38.9249,122 34,117.075 34,111 34,104.925 38.9249,100 45,100 51.0751,100 56,104.925 56,111 zM56,78 C56,84.0751 51.0751,89 45,89 38.9249,89 34,84.0751 34,78 34,71.9249 38.9249,67 45,67 51.0751,67 56,71.9249 56,78 zM56,44 C56,50.0751 51.0751,55 45,55 38.9249,55 34,50.0751 34,44 34,37.9249 38.9249,33 45,33 51.0751,33 56,37.9249 56,44 zM56,11 C56,17.0751 51.0751,22 45,22 38.9249,22 34,17.0751 34,11 34,4.92487 38.9249,0 45,0 51.0751,0 56,4.92487 56,11 zM22,144 C22,150.075 17.0751,155 11,155 4.92487,155 0,150.075 0,144 0,137.925 4.92487,133 11,133 17.0751,133 22,137.925 22,144 zM22,111 C22,117.075 17.0751,122 11,122 4.92487,122 0,117.075 0,111 0,104.925 4.92487,100 11,100 17.0751,100 22,104.925 22,111 zM22,78 C22,84.0751 17.0751,89 11,89 4.92487,89 0,84.0751 0,78 0,71.9249 4.92487,67 11,67 17.0751,67 22,71.9249 22,78 zM155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 ",
                          "M102,118 C102,124.075 97.0751,129 91,129 84.9249,129 80,124.075 80,118 80,111.925 84.9249,107 91,107 97.0751,107 102,111.925 102,118 zM102,91 C102,97.0751 97.0751,102 91,102 84.9249,102 80,97.0751 80,91 80,84.9249 84.9249,80 91,80 97.0751,80 102,84.9249 102,91 zM102,64 C102,70.0751 97.0751,75 91,75 84.9249,75 80,70.0751 80,64 80,57.9249 84.9249,53 91,53 97.0751,53 102,57.9249 102,64 zM76,107 C76,113.075 71.0751,118 65,118 58.9249,118 54,113.075 54,107 54,100.925 58.9249,96 65,96 71.0751,96 76,100.925 76,107 zM102,37 C102,43.0751 97.0751,48 91,48 84.9249,48 80,43.0751 80,37 80,30.9249 84.9249,26 91,26 97.0751,26 102,30.9249 102,37 zM102,11 C102,17.0751 97.0751,22 91,22 84.9249,22 80,17.0751 80,11 80,4.92487 84.9249,0 91,0 97.0751,0 102,4.92487 102,11 zM76,30 C76,36.0751 71.0751,41 65,41 58.9249,41 54,36.0751 54,30 54,23.9249 58.9249,19 65,19 71.0751,19 76,23.9249 76,30 zM51,90 C51,96.0751 46.0751,101 40,101 33.9249,101 29,96.0751 29,90 29,83.9249 33.9249,79 40,79 46.0751,79 51,83.9249 51,90 zM51,41 C51,47.0751 46.0751,52 40,52 33.9249,52 29,47.0751 29,41 29,34.9249 33.9249,30 40,30 46.0751,30 51,34.9249 51,41 zM22,93 C22,99.0751 17.0751,104 11,104 4.92487,104 0,99.0751 0,93 0,86.9249 4.92487,82 11,82 17.0751,82 22,86.9249 22,93 zM22,64 C22,70.0751 17.0751,75 11,75 4.92487,75 0,70.0751 0,64 0,57.9249 4.92487,53 11,53 17.0751,53 22,57.9249 22,64 zM22,37 C22,43.0751 17.0751,48 11,48 4.92487,48 0,43.0751 0,37 0,30.9249 4.92487,26 11,26 17.0751,26 22,30.9249 22,37 zM140,50.5 C140,53.5376 137.538,56 134.5,56 131.462,56 129,53.5376 129,50.5 129,47.4624 131.462,45 134.5,45 137.538,45 140,47.4624 140,50.5 zM150,60.5 C150,63.5376 147.538,66 144.5,66 141.462,66 139,63.5376 139,60.5 139,57.4624 141.462,55 144.5,55 147.538,55 150,57.4624 150,60.5 zM138,88.5 C138,91.5376 135.538,94 132.5,94 129.462,94 127,91.5376 127,88.5 127,85.4624 129.462,83 132.5,83 135.538,83 138,85.4624 138,88.5 zM149,79.5 C149,82.5376 146.538,85 143.5,85 140.462,85 138,82.5376 138,79.5 138,76.4624 140.462,74 143.5,74 146.538,74 149,76.4624 149,79.5 zM159,70.5 C159,73.5376 156.538,76 153.5,76 150.462,76 148,73.5376 148,70.5 148,67.4624 150.462,65 153.5,65 156.538,65 159,67.4624 159,70.5 zM180,89.5 C180,92.5376 177.538,95 174.5,95 171.462,95 169,92.5376 169,89.5 169,86.4624 171.462,84 174.5,84 177.538,84 180,86.4624 180,89.5 M179,51.5 C179,54.5376 176.538,57 173.5,57 170.462,57 168,54.5376 168,51.5 168,48.4624 170.462,46 173.5,46 176.538,46 179,48.4624 179,51.5 M169,80.5 C169,83.5376 166.538,86 163.5,86 160.462,86 158,83.5376 158,80.5 158,77.4624 160.462,75 163.5,75 166.538,75 169,77.4624 169,80.5 M169,61.5 C169,64.5376 166.538,67 163.5,67 160.462,67 158,64.5376 158,61.5 158,58.4624 160.462,56 163.5,56 166.538,56 169,58.4624 169,61.5",
                      ],
                  },
              }),
              gsap.to(o, { y: "0.1em", x: "0.08em", ease: "expo.out", duration: 0.8 }),
              (r = !1))
            : (gsap.to("#showreel-on", {
                  duration: 0.8,
                  ease: "expo.out",
                  type: "rotational",
                  morphSVG: {
                      shape: "#showreel-on",
                      precompile: [
                          "M102,118 C102,124.075 97.0751,129 91,129 84.9249,129 80,124.075 80,118 80,111.925 84.9249,107 91,107 97.0751,107 102,111.925 102,118 zM102,91 C102,97.0751 97.0751,102 91,102 84.9249,102 80,97.0751 80,91 80,84.9249 84.9249,80 91,80 97.0751,80 102,84.9249 102,91 zM102,64 C102,70.0751 97.0751,75 91,75 84.9249,75 80,70.0751 80,64 80,57.9249 84.9249,53 91,53 97.0751,53 102,57.9249 102,64 zM76,107 C76,113.075 71.0751,118 65,118 58.9249,118 54,113.075 54,107 54,100.925 58.9249,96 65,96 71.0751,96 76,100.925 76,107 zM102,37 C102,43.0751 97.0751,48 91,48 84.9249,48 80,43.0751 80,37 80,30.9249 84.9249,26 91,26 97.0751,26 102,30.9249 102,37 zM102,11 C102,17.0751 97.0751,22 91,22 84.9249,22 80,17.0751 80,11 80,4.92487 84.9249,0 91,0 97.0751,0 102,4.92487 102,11 zM76,30 C76,36.0751 71.0751,41 65,41 58.9249,41 54,36.0751 54,30 54,23.9249 58.9249,19 65,19 71.0751,19 76,23.9249 76,30 zM51,90 C51,96.0751 46.0751,101 40,101 33.9249,101 29,96.0751 29,90 29,83.9249 33.9249,79 40,79 46.0751,79 51,83.9249 51,90 zM51,41 C51,47.0751 46.0751,52 40,52 33.9249,52 29,47.0751 29,41 29,34.9249 33.9249,30 40,30 46.0751,30 51,34.9249 51,41 zM22,93 C22,99.0751 17.0751,104 11,104 4.92487,104 0,99.0751 0,93 0,86.9249 4.92487,82 11,82 17.0751,82 22,86.9249 22,93 zM22,64 C22,70.0751 17.0751,75 11,75 4.92487,75 0,70.0751 0,64 0,57.9249 4.92487,53 11,53 17.0751,53 22,57.9249 22,64 zM22,37 C22,43.0751 17.0751,48 11,48 4.92487,48 0,43.0751 0,37 0,30.9249 4.92487,26 11,26 17.0751,26 22,30.9249 22,37 zM140,50.5 C140,53.5376 137.538,56 134.5,56 131.462,56 129,53.5376 129,50.5 129,47.4624 131.462,45 134.5,45 137.538,45 140,47.4624 140,50.5 zM150,60.5 C150,63.5376 147.538,66 144.5,66 141.462,66 139,63.5376 139,60.5 139,57.4624 141.462,55 144.5,55 147.538,55 150,57.4624 150,60.5 zM138,88.5 C138,91.5376 135.538,94 132.5,94 129.462,94 127,91.5376 127,88.5 127,85.4624 129.462,83 132.5,83 135.538,83 138,85.4624 138,88.5 zM149,79.5 C149,82.5376 146.538,85 143.5,85 140.462,85 138,82.5376 138,79.5 138,76.4624 140.462,74 143.5,74 146.538,74 149,76.4624 149,79.5 zM159,70.5 C159,73.5376 156.538,76 153.5,76 150.462,76 148,73.5376 148,70.5 148,67.4624 150.462,65 153.5,65 156.538,65 159,67.4624 159,70.5 zM180,89.5 C180,92.5376 177.538,95 174.5,95 171.462,95 169,92.5376 169,89.5 169,86.4624 171.462,84 174.5,84 177.538,84 180,86.4624 180,89.5 M179,51.5 C179,54.5376 176.538,57 173.5,57 170.462,57 168,54.5376 168,51.5 168,48.4624 170.462,46 173.5,46 176.538,46 179,48.4624 179,51.5 M169,80.5 C169,83.5376 166.538,86 163.5,86 160.462,86 158,83.5376 158,80.5 158,77.4624 160.462,75 163.5,75 166.538,75 169,77.4624 169,80.5 M169,61.5 C169,64.5376 166.538,67 163.5,67 160.462,67 158,64.5376 158,61.5 158,58.4624 160.462,56 163.5,56 166.538,56 169,58.4624 169,61.5 ",
                          "M155,144 C155,150.075 150.075,155 144,155 137.925,155 133,150.075 133,144 133,137.925 137.925,133 144,133 150.075,133 155,137.925 155,144 zM155,110 C155,116.075 150.075,121 144,121 137.925,121 133,116.075 133,110 133,103.925 137.925,99 144,99 150.075,99 155,103.925 155,110 zM155,78 C155,84.0751 150.075,89 144,89 137.925,89 133,84.0751 133,78 133,71.9249 137.925,67 144,67 150.075,67 155,71.9249 155,78 zM122,144 C122,150.075 117.075,155 111,155 104.925,155 100,150.075 100,144 100,137.925 104.925,133 111,133 117.075,133 122,137.925 122,144 zM122,111 C122,117.075 117.075,122 111,122 104.925,122 100,117.075 100,111 100,104.925 104.925,100 111,100 117.075,100 122,104.925 122,111 zM122,78 C122,84.0751 117.075,89 111,89 104.925,89 100,84.0751 100,78 100,71.9249 104.925,67 111,67 117.075,67 122,71.9249 122,78 zM122,45 C122,51.0751 117.075,56 111,56 104.925,56 100,51.0751 100,45 100,38.9249 104.925,34 111,34 117.075,34 122,38.9249 122,45 zM89,144 C89,150.075 84.0751,155 78,155 71.9249,155 67,150.075 67,144 67,137.925 71.9249,133 78,133 84.0751,133 89,137.925 89,144 zM89,111 C89,117.075 84.0751,122 78,122 71.9249,122 67,117.075 67,111 67,104.925 71.9249,100 78,100 84.0751,100 89,104.925 89,111 zM56,144 C56,150.075 51.0751,155 45,155 38.9249,155 34,150.075 34,144 34,137.925 38.9249,133 45,133 51.0751,133 56,137.925 56,144 zM56,111 C56,117.075 51.0751,122 45,122 38.9249,122 34,117.075 34,111 34,104.925 38.9249,100 45,100 51.0751,100 56,104.925 56,111 zM56,78 C56,84.0751 51.0751,89 45,89 38.9249,89 34,84.0751 34,78 34,71.9249 38.9249,67 45,67 51.0751,67 56,71.9249 56,78 zM56,44 C56,50.0751 51.0751,55 45,55 38.9249,55 34,50.0751 34,44 34,37.9249 38.9249,33 45,33 51.0751,33 56,37.9249 56,44 zM56,11 C56,17.0751 51.0751,22 45,22 38.9249,22 34,17.0751 34,11 34,4.92487 38.9249,0 45,0 51.0751,0 56,4.92487 56,11 zM22,144 C22,150.075 17.0751,155 11,155 4.92487,155 0,150.075 0,144 0,137.925 4.92487,133 11,133 17.0751,133 22,137.925 22,144 zM22,111 C22,117.075 17.0751,122 11,122 4.92487,122 0,117.075 0,111 0,104.925 4.92487,100 11,100 17.0751,100 22,104.925 22,111 zM22,78 C22,84.0751 17.0751,89 11,89 4.92487,89 0,84.0751 0,78 0,71.9249 4.92487,67 11,67 17.0751,67 22,71.9249 22,78 zM155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 ",
                      ],
                  },
              }),
              gsap.to(o, { y: "0em", x: "0.08em", ease: "expo.out", duration: 0.8 }),
              (r = !0));
    });
}
function initIntroScroll(e) {
    e || (e = document);
    let t = e.querySelector(".hero-w"),
        o = e.querySelector(".scroll_wrap"),
        r = gsap.timeline({ defaults: { ease: "linear" } });
    r.fromTo(
        o,
        { opacity: 1 },
        {
            opacity: 1,
            duration: 1,
            onComplete: () => {
                o.click();
            },
        }
    ),
        ScrollTrigger.create({ trigger: t, animation: r, start: "top top", endTrigger: t, end: "bottom bottom+=1%", scrub: !0 });
}
function initTypographyIntro(e) {
    e || (e = document);
    let t = e.querySelector("[data-type-hero]"),
        o = t.querySelector('[data-marquee-wrap="top"]'),
        r = t.querySelector('[data-marquee-wrap="bottom"]'),
        n = t.querySelector('[data-marquee-inner="top"]'),
        a = t.querySelector('[data-marquee-inner="bottom"]');
    gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } })
        .fromTo([o, r], { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.inOut" })
        .fromTo(o, { x: "130vh" }, { x: "-30vh" }, "<")
        .fromTo(r, { x: isMobile ? "-250vw" : "-130vh" }, { x: "0vw", force3D: !0 }, "<");
    let i = gsap.timeline({ defaults: { ease: "linear", duration: 1 }, paused: !0 });
    i.fromTo(n, { x: "0vh" }, { x: "-130vh" }).fromTo(a, { x: "0vh" }, { x: "100vh" }, "<"), ScrollTrigger.create({ trigger: t, animation: i, start: "top top", endTrigger: t, end: "bottom top-=10%", scrub: !0 }), (typeIntroFlag = !1);
}
function initMorphingLetters(e) {
    e || (e = document);
    let t = e.querySelector(".big-letters");
    if (!t) return;
    const o = ["big-a", "big-c", "big-d", "big-k", "big-w"],
        r = [13, 0, 10, 15, 2];
    function n(e = 0) {
        ScrollTrigger.refresh(), lenis.resize();
        let t = (e + 1) % o.length;
        (morphingTween = gsap.to("#big-start", {
            duration: 0.6,
            delay: 0.45,
            ease: "expo.inOut",
            morphSVG: { shape: `#${o[t]}` },
            onComplete: () => {
                setTimeout(() => n(t), 0);
            },
        })),
            gsap.to(".big-letters", { x: `${r[t]}%`, duration: 0.6, delay: 0.45, ease: "expo.inOut" });
    }
    ScrollTrigger.create({
        trigger: t,
        start: "top bottom",
        onEnter: () => {
            ScrollTrigger.refresh(),
                lenis.resize(),
                gsap.fromTo(
                    "#big-start",
                    { drawSVG: "0%" },
                    {
                        drawSVG: "100%",
                        duration: 2.5,
                        ease: "cubic.inOut",
                        onComplete: () => {
                            n();
                        },
                    }
                );
        },
        once: !0,
    });
}
function initColorIntro(e) {
    e || (e = document);
    let t = e.querySelector("[data-color-hero]"),
        o = e.querySelector(".null_layer_1"),
        r = e.querySelector(".null_layer_2"),
        n = e.querySelector(".null_layer_3"),
        a = e.querySelectorAll(".c21-fold_box"),
        i = a[0],
        l = a[1],
        s = a[2],
        u = e.querySelectorAll(".c21_el-face"),
        c = u[0],
        d = u[1],
        p = u[2],
        g = e.querySelector("[data-color-intro]");
    gsap.set(a, { visibility: "visible" }),
        gsap.set([o, r, n], { display: "block" }),
        gsap
            .timeline({ defaults: { ease: "sine.out", duration: 0.6 } })
            .fromTo(o, { y: "0vw" }, { y: "-27vw" })
            .fromTo(i, { y: "-30vw" }, { y: "0vw", duration: 1, ease: "expo.out" }, 0)
            .fromTo(r, { y: "0vw" }, { y: "-25vw", duration: 0.8 }, 0.1)
            .fromTo(l, { y: "10vw" }, { y: "0vw", duration: 1, ease: "expo.out" }, "<")
            .fromTo(n, { y: "0vw" }, { y: "-40vw", duration: 0.6 }, 0.2)
            .fromTo(s, { y: "20vw" }, { y: "0vw", duration: 1.3, ease: "expo.out" }, "<")
            .fromTo([o, r, n], { opacity: 1 }, { opacity: 0, duration: 0.6, ease: "power1.out" }, 0.6);
    let m = gsap.timeline({ defaults: { ease: "linear", duration: 1 }, paused: !0 });
    m
        .fromTo(i, { y: "0vw" }, { y: "-20vw" })
        .fromTo(s, { y: "0vw" }, { y: "30vw", duration: 1 }, 0)
        .to(c, { opacity: 1, duration: 0.05 }, 0.05)
        .to(d, { opacity: 1, duration: 0.05 }, 0.15)
        .to(p, { opacity: 1, duration: 0.05 }, 0.25)
        .to(g, { yPercent: -100, duration: 1 }, 0),
        ScrollTrigger.create({ trigger: t, animation: m, start: "top top", end: "bottom top-=10%", scrub: !0 }),
        (colorIntroFlag = !1);
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
        a = e.querySelectorAll(".bt-el");
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
function initDotGrid(e) {
    e || (e = document);
    new p5(function (e) {
        let t = [];
        (e.setup = function () {
            const r = document.getElementById("canvas-container");
            e.createCanvas(r.offsetWidth, r.offsetHeight).parent("canvas-container");
            for (let r = 0; r < e.width; r += 30) for (let n = 0; n < e.height; n += 30) t.push(new o(r + 15, n + 15, 3));
            e.noStroke();
        }),
            (e.draw = function () {
                e.background("#26065D"),
                    t.forEach((e) => {
                        e.update(), e.display();
                    });
            });
        class o {
            constructor(e, t, o) {
                (this.x = e), (this.y = t), (this.size = o), (this.originalSize = o), (this.targetSize = o), (this.currentSize = o), (this.color = "#4C00FF");
            }
            update() {
                let t = e.dist(e.mouseX, e.mouseY, this.x, this.y);
                (this.targetSize = t < 150 ? e.map(t, 0, 150, 10 * this.originalSize, this.originalSize) : this.originalSize), (this.currentSize += 0.1 * (this.targetSize - this.currentSize));
            }
            display() {
                e.fill(this.color), e.ellipse(this.x, this.y, this.currentSize, this.currentSize);
            }
        }
    }, "canvas-container"),
        ScrollTrigger.refresh();
}
function initPalette(e) {
    e || (e = document);
    let t = e.querySelector(".palette-track");
    if (!t) return;
    let o = t.querySelectorAll(".palette-title"),
        r = t.querySelectorAll(".palette-shape.left"),
        n = t.querySelectorAll(".palette-shape.right"),
        a = t.querySelectorAll(".palette-shape.center"),
        i = Array.from(a).slice(1),
        l = o[0],
        s = l.querySelectorAll(".word"),
        u = o[1],
        c = u.querySelectorAll(".word"),
        d = o[2],
        p = d.querySelectorAll(".word"),
        g = gsap.timeline({ defaults: { ease: "linear" } }),
        m = 0.33;
    g
        .from(".palette-bg", { width: "50%", xPercent: 20, duration: m }, 0)
        .to(r, { xPercent: -40, duration: m }, 0)
        .to(n, { xPercent: 50, duration: m }, 0)
        .fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: { amount: 0.15 } }, "<")
        .to(l, { y: "-4em", duration: 0.2 }, 0.3)
        .fromTo(s, { opacity: 1 }, { opacity: 0, duration: 0.2, stagger: { amount: 0.15 }, immediateRender: !1 }, "<")
        .to(r, { xPercent: -150, duration: m }, "<")
        .to(n, { xPercent: 400, duration: m, stagger: { each: 0.01, from: "start" } }, "<")
        .to(a, { rotate: 45, scale: 0.95, width: isMobile ? "35vh" : "42vh", border: "1px solid transparent", duration: m }, "<+=0.1")
        .to(a[0], { background: "#4c00ff", duration: m }, "<")
        .fromTo(i, { rotate: 45, yPercent: 0, xPercent: 0 }, { rotate: (e) => 65 + 20 * e, yPercent: (e) => 10 + 5 * e, xPercent: (e) => 1 + 3 * e, immediateRender: !1, duration: m })
        .to(".palette-bg", { y: "-4em", duration: 0.25 }, 0.7)
        .fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: { amount: 0.15 } }, 0.7)
        .from(u, { y: "4em", duration: 0.25 }, "<")
        .to(a, { scale: 5, duration: m }, 1)
        .to(a[1], { rotate: 100, duration: m }, "<")
        .to(a[0], { rotate: 11, xPercent: -600, yPercent: -50, duration: m }, "<")
        .to(u, { y: "-4em", duration: 0.2, delay: 0.05 }, "<")
        .fromTo(c, { opacity: 1 }, { opacity: 0, duration: 0.2, stagger: { amount: 0.15 }, immediateRender: !1 }, "<")
        .fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: { amount: 0.15 } }, 1.3)
        .from(d, { y: "4em", duration: 0.25 }, "<"),
        i.forEach((e, t) => {
            g.fromTo(e, { background: "rgba(255,255,255,0)" }, { background: () => e.getAttribute("data-bg"), duration: 1e-4, immediateRender: !1 }, 0.63);
        }),
        ScrollTrigger.create({ animation: g, trigger: t, start: "top 90%", end: "bottom bottom", scrub: !0 });
}
function initAudioMorph(e) {
    e || (e = document);
    let t = e.querySelector("#morphPath");
    let o = gsap.timeline({ repeat: -1, yoyo: !1, repeatDelay: 1 });
    o.to(t, {
        morphSVG: {
            shape:
                "M260.583 1.75C327.324 1.75 390.917 51.1112 437.896 117.453C484.855 183.765 514.999 266.755 514.999 333.5C514.999 382.279 511.915 421.579 496.437 448.692C488.72 462.209 477.916 472.703 462.827 479.83C447.72 486.966 428.269 490.75 403.239 490.75C335.61 490.75 234.912 487.061 151.148 464.432C109.264 453.117 71.6992 437.088 44.6222 414.486C17.5771 391.911 0.999633 362.789 0.999512 325.176C0.999512 244.582 25.5627 163.689 70.3038 102.969C115.033 42.2654 179.9 1.75 260.583 1.75Z",
            type: "rotational",
        },
        duration: 3,
        ease: "power1.inOut",
    }),
        o.to(t, {
            morphSVG: {
                shape:
                    "M191.5 1.75C258.491 1.75 344.178 30.4172 413.121 75.8349C482.104 121.279 534 183.268 534 249.75C534 299.692 522.029 358.519 487.012 405.24C452.029 451.916 393.958 486.63 301.482 488.25C233.855 489.435 159.533 486.363 101.705 463.605C72.8086 452.233 48.0803 435.965 30.3574 412.9C12.6432 389.846 1.87271 359.932 1 321.165C1.00068 240.409 8.35248 160.494 35.8655 100.795C49.6143 70.9621 68.3812 46.2152 93.7496 28.9228C119.112 11.6342 151.142 1.75 191.5 1.75Z",
                type: "rotational",
            },
            duration: 3,
            ease: "power1.inOut",
        }),
        o.to(t, {
            morphSVG: {
                shape:
                    "M206.5 1.5C276.708 1.5 345.573 53.8721 396.96 124.128C448.326 194.355 482 282.153 482 352.5C482 378.696 474.82 397.925 462.496 412.08C450.158 426.253 432.578 435.439 411.604 441.373C373.264 452.221 323.923 452.119 275.366 452.019C270.734 452.01 266.108 452 261.5 452C190.399 452 125.234 444.895 77.8693 420.152C54.2088 407.793 35.0084 391.041 21.716 368.581C8.42231 346.119 1 317.884 1 282.5C1 197.376 10.0193 127.126 40.1788 78.1678C70.2677 29.3246 121.518 1.5 206.5 1.5Z",
                type: "rotational",
            },
            duration: 3,
            ease: "power1.inOut",
        });
}
function initAudioWaveForm(e) {
    gsap.set("svg", { visibility: "visible" });
    const t = gsap.parseEase("power1.inOut"),
        o = gsap.to(
            { val: 0 },
            {
                val: 1,
                ease: "sine",
                onUpdate: () => {
                    gsap.to("#bg *", { drawSVG: `${100 - 50 * t(o.ratio)}% ${50 * t(o.ratio)}%`, stagger: 0.1, duration: 2.8 });
                },
                repeat: -1,
                yoyo: !1,
                duration: 0.6,
            }
        );
}
function initSoundPopup(e) {
    e || (e = document);
    var t = new Howl({
        src: ["https://cdn.jsdelivr.net/gh/niccolomiranda/docusign/audio_waveform_test.mp3"],
        volume: 0.5,
        onend: function () {
            console.log("Finished playing");
        },
    });
    document.getElementById("waveform-in").addEventListener("click", function () {
        t.play();
    }),
        document.getElementById("waveform-out").addEventListener("click", function () {
            t.fade(t.volume(), 0, 1e3),
                setTimeout(function () {
                    t.stop();
                }, 1e3);
        });
}
function initTicks(e) {
    e || (e = document);
    let t = e.querySelectorAll(".c-32_el.move-x"),
        o = e.querySelectorAll(".c-32_el.move-y");
    setTimeout(function () {
        o.forEach((e) => {
            gsap.to(e, { y: "+=60", repeat: -1, yoyo: !0, ease: "sine.inOut", duration: gsap.utils.random(1.5, 2.5), delay: gsap.utils.random(0, 0.5) });
        }),
            t.forEach((e) => {
                gsap.to(e, { x: "+=60", repeat: -1, yoyo: !0, ease: "sine.inOut", duration: gsap.utils.random(1.5, 2.5), delay: gsap.utils.random(0, 0.5) });
            });
    }, 1e3);
}
function initWaveFormModal(e) {
    e || (e = document);
    let t = null,
        o = !1,
        r = e.querySelector(".waveform_wrap"),
        n = r.querySelectorAll("[data-waveform-text]"),
        a = r.querySelectorAll("[data-waveform-eyebrow]"),
        i = r.querySelector(".waveform_inner"),
        l = r.querySelectorAll("path"),
        s = r.querySelector(".scroll_ico.is-close");
    gsap.set(r, { backdropFilter: "blur(0em)" }), gsap.set([n, a], { display: "none" });
    let u = gsap.timeline({
        paused: !0,
        defaults: { ease: "menu", duration: 0.8, overwrite: "auto" },
        onStart: () => {
            backgroundMusic.playing() &&
                ((o = !0),
                backgroundMusic.fade(0.1, 0, 1e3),
                setTimeout(function () {
                    backgroundMusic.pause();
                }, 1e3));
        },
    });
    u.set(r, { display: "flex" })
        .to(i, { opacity: 1 })
        .fromTo(r, { backdropFilter: "blur(0em)" }, { backdropFilter: "blur(2em)" }, "<")
        .fromTo("#waveform-border", { strokeDashoffset: 2850 }, { strokeDashoffset: 0, ease: "power4.inOut", duration: 1.2, immediateRender: !1 }, 0)
        .fromTo(s, { scale: 0, rotate: -45 }, { scale: 1, rotate: 0 }, 0);
    let c = gsap.timeline({
        paused: !0,
        defaults: { ease: "menu", duration: 0.6 },
        onComplete: () => {
            o && (console.log(o), backgroundMusic.volume(0.1), backgroundMusic.play(), backgroundMusic.fade(0, 0.1, 0.5));
        },
    });
    c.to("#waveform-border", { strokeDashoffset: 2850, ease: "power4.inOut", duration: 1 }).to(i, { opacity: 0 }, 0.5).to(r, { backdropFilter: "blur(0em)" }, "<").to(s, { scale: 0, rotate: 45 }, "<").set(r, { display: "none" });
    e.querySelectorAll("[data-waveform-button]").forEach((e, o) => {
        e.addEventListener("click", function () {
            t && t.unload(),
                u.progress(0).play(),
                lenis.stop(),
                gsap.set([n, a], { display: "none" }),
                gsap.set(n[o], { display: "block" }),
                gsap.set(a[o], { display: "block" }),
                gsap.fromTo(n[o], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, delay: 0.1 }),
                gsap.fromTo(a[o], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }),
                (t = new Howl({ src: [e.getAttribute("data-waveform-button")], html5: !0 })),
                t.play();
        });
    });
    e.querySelectorAll("[data-waveform-close]").forEach((e) => {
        e.addEventListener("click", function () {
            c.progress(0).play(), lenis.start(), t && (t.stop(), t.unload(), (t = null));
        });
    });
    const d = gsap.parseEase("power1.inOut"),
        p = gsap.to(
            { val: 0.5 },
            {
                val: 1,
                ease: "sine",
                onUpdate: () => {
                    gsap.to(l, { drawSVG: `${100 - 50 * d(p.ratio)}% ${50 * d(p.ratio)}%`, stagger: 0.1, duration: 2.8 });
                },
                repeat: -1,
                yoyo: !1,
                duration: 0.45,
            }
        );
}
function initSoundIcon() {
    let e = document.querySelector(".sound-wrap");
    if (!e) return;
    let t = document.querySelector(".svg-wrap"),
        o = !0;
    e.addEventListener("click", function () {
        o
            ? (gsap.to("#sound", {
                  duration: 0.8,
                  ease: "expo.out",
                  morphSVG: {
                      shape: "#muted",
                      type: "rotational",
                      origin: "100% 100%",
                      precompile: [
                          "M155,144 C155,150.075 150.075,155 144,155 137.925,155 133,150.075 133,144 133,137.925 137.925,133 144,133 150.075,133 155,137.925 155,144 zM155,110 C155,116.075 150.075,121 144,121 137.925,121 133,116.075 133,110 133,103.925 137.925,99 144,99 150.075,99 155,103.925 155,110 zM155,78 C155,84.0751 150.075,89 144,89 137.925,89 133,84.0751 133,78 133,71.9249 137.925,67 144,67 150.075,67 155,71.9249 155,78 zM122,144 C122,150.075 117.075,155 111,155 104.925,155 100,150.075 100,144 100,137.925 104.925,133 111,133 117.075,133 122,137.925 122,144 zM122,111 C122,117.075 117.075,122 111,122 104.925,122 100,117.075 100,111 100,104.925 104.925,100 111,100 117.075,100 122,104.925 122,111 zM122,78 C122,84.0751 117.075,89 111,89 104.925,89 100,84.0751 100,78 100,71.9249 104.925,67 111,67 117.075,67 122,71.9249 122,78 zM122,45 C122,51.0751 117.075,56 111,56 104.925,56 100,51.0751 100,45 100,38.9249 104.925,34 111,34 117.075,34 122,38.9249 122,45 zM89,144 C89,150.075 84.0751,155 78,155 71.9249,155 67,150.075 67,144 67,137.925 71.9249,133 78,133 84.0751,133 89,137.925 89,144 zM89,111 C89,117.075 84.0751,122 78,122 71.9249,122 67,117.075 67,111 67,104.925 71.9249,100 78,100 84.0751,100 89,104.925 89,111 zM56,144 C56,150.075 51.0751,155 45,155 38.9249,155 34,150.075 34,144 34,137.925 38.9249,133 45,133 51.0751,133 56,137.925 56,144 zM56,111 C56,117.075 51.0751,122 45,122 38.9249,122 34,117.075 34,111 34,104.925 38.9249,100 45,100 51.0751,100 56,104.925 56,111 zM56,78 C56,84.0751 51.0751,89 45,89 38.9249,89 34,84.0751 34,78 34,71.9249 38.9249,67 45,67 51.0751,67 56,71.9249 56,78 zM56,44 C56,50.0751 51.0751,55 45,55 38.9249,55 34,50.0751 34,44 34,37.9249 38.9249,33 45,33 51.0751,33 56,37.9249 56,44 zM56,11 C56,17.0751 51.0751,22 45,22 38.9249,22 34,17.0751 34,11 34,4.92487 38.9249,0 45,0 51.0751,0 56,4.92487 56,11 zM22,144 C22,150.075 17.0751,155 11,155 4.92487,155 0,150.075 0,144 0,137.925 4.92487,133 11,133 17.0751,133 22,137.925 22,144 zM22,111 C22,117.075 17.0751,122 11,122 4.92487,122 0,117.075 0,111 0,104.925 4.92487,100 11,100 17.0751,100 22,104.925 22,111 zM22,78 C22,84.0751 17.0751,89 11,89 4.92487,89 0,84.0751 0,78 0,71.9249 4.92487,67 11,67 17.0751,67 22,71.9249 22,78 zM155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 ",
                          "M102,118 C102,124.075 97.0751,129 91,129 84.9249,129 80,124.075 80,118 80,111.925 84.9249,107 91,107 97.0751,107 102,111.925 102,118 zM102,91 C102,97.0751 97.0751,102 91,102 84.9249,102 80,97.0751 80,91 80,84.9249 84.9249,80 91,80 97.0751,80 102,84.9249 102,91 zM102,64 C102,70.0751 97.0751,75 91,75 84.9249,75 80,70.0751 80,64 80,57.9249 84.9249,53 91,53 97.0751,53 102,57.9249 102,64 zM76,107 C76,113.075 71.0751,118 65,118 58.9249,118 54,113.075 54,107 54,100.925 58.9249,96 65,96 71.0751,96 76,100.925 76,107 zM102,37 C102,43.0751 97.0751,48 91,48 84.9249,48 80,43.0751 80,37 80,30.9249 84.9249,26 91,26 97.0751,26 102,30.9249 102,37 zM102,11 C102,17.0751 97.0751,22 91,22 84.9249,22 80,17.0751 80,11 80,4.92487 84.9249,0 91,0 97.0751,0 102,4.92487 102,11 zM76,30 C76,36.0751 71.0751,41 65,41 58.9249,41 54,36.0751 54,30 54,23.9249 58.9249,19 65,19 71.0751,19 76,23.9249 76,30 zM51,90 C51,96.0751 46.0751,101 40,101 33.9249,101 29,96.0751 29,90 29,83.9249 33.9249,79 40,79 46.0751,79 51,83.9249 51,90 zM51,41 C51,47.0751 46.0751,52 40,52 33.9249,52 29,47.0751 29,41 29,34.9249 33.9249,30 40,30 46.0751,30 51,34.9249 51,41 zM22,93 C22,99.0751 17.0751,104 11,104 4.92487,104 0,99.0751 0,93 0,86.9249 4.92487,82 11,82 17.0751,82 22,86.9249 22,93 zM22,64 C22,70.0751 17.0751,75 11,75 4.92487,75 0,70.0751 0,64 0,57.9249 4.92487,53 11,53 17.0751,53 22,57.9249 22,64 zM22,37 C22,43.0751 17.0751,48 11,48 4.92487,48 0,43.0751 0,37 0,30.9249 4.92487,26 11,26 17.0751,26 22,30.9249 22,37 zM140,50.5 C140,53.5376 137.538,56 134.5,56 131.462,56 129,53.5376 129,50.5 129,47.4624 131.462,45 134.5,45 137.538,45 140,47.4624 140,50.5 zM150,60.5 C150,63.5376 147.538,66 144.5,66 141.462,66 139,63.5376 139,60.5 139,57.4624 141.462,55 144.5,55 147.538,55 150,57.4624 150,60.5 zM138,88.5 C138,91.5376 135.538,94 132.5,94 129.462,94 127,91.5376 127,88.5 127,85.4624 129.462,83 132.5,83 135.538,83 138,85.4624 138,88.5 zM149,79.5 C149,82.5376 146.538,85 143.5,85 140.462,85 138,82.5376 138,79.5 138,76.4624 140.462,74 143.5,74 146.538,74 149,76.4624 149,79.5 zM159,70.5 C159,73.5376 156.538,76 153.5,76 150.462,76 148,73.5376 148,70.5 148,67.4624 150.462,65 153.5,65 156.538,65 159,67.4624 159,70.5 zM180,89.5 C180,92.5376 177.538,95 174.5,95 171.462,95 169,92.5376 169,89.5 169,86.4624 171.462,84 174.5,84 177.538,84 180,86.4624 180,89.5 M179,51.5 C179,54.5376 176.538,57 173.5,57 170.462,57 168,54.5376 168,51.5 168,48.4624 170.462,46 173.5,46 176.538,46 179,48.4624 179,51.5 M169,80.5 C169,83.5376 166.538,86 163.5,86 160.462,86 158,83.5376 158,80.5 158,77.4624 160.462,75 163.5,75 166.538,75 169,77.4624 169,80.5 M169,61.5 C169,64.5376 166.538,67 163.5,67 160.462,67 158,64.5376 158,61.5 158,58.4624 160.462,56 163.5,56 166.538,56 169,58.4624 169,61.5",
                      ],
                  },
              }),
              gsap.to(t, { y: "0.1em", x: "0.08em", ease: "expo.out", duration: 0.8 }),
              (o = !1))
            : (gsap.to("#sound", {
                  duration: 0.8,
                  ease: "expo.out",
                  type: "rotational",
                  morphSVG: {
                      shape: "#sound",
                      precompile: [
                          "M102,118 C102,124.075 97.0751,129 91,129 84.9249,129 80,124.075 80,118 80,111.925 84.9249,107 91,107 97.0751,107 102,111.925 102,118 zM102,91 C102,97.0751 97.0751,102 91,102 84.9249,102 80,97.0751 80,91 80,84.9249 84.9249,80 91,80 97.0751,80 102,84.9249 102,91 zM102,64 C102,70.0751 97.0751,75 91,75 84.9249,75 80,70.0751 80,64 80,57.9249 84.9249,53 91,53 97.0751,53 102,57.9249 102,64 zM76,107 C76,113.075 71.0751,118 65,118 58.9249,118 54,113.075 54,107 54,100.925 58.9249,96 65,96 71.0751,96 76,100.925 76,107 zM102,37 C102,43.0751 97.0751,48 91,48 84.9249,48 80,43.0751 80,37 80,30.9249 84.9249,26 91,26 97.0751,26 102,30.9249 102,37 zM102,11 C102,17.0751 97.0751,22 91,22 84.9249,22 80,17.0751 80,11 80,4.92487 84.9249,0 91,0 97.0751,0 102,4.92487 102,11 zM76,30 C76,36.0751 71.0751,41 65,41 58.9249,41 54,36.0751 54,30 54,23.9249 58.9249,19 65,19 71.0751,19 76,23.9249 76,30 zM51,90 C51,96.0751 46.0751,101 40,101 33.9249,101 29,96.0751 29,90 29,83.9249 33.9249,79 40,79 46.0751,79 51,83.9249 51,90 zM51,41 C51,47.0751 46.0751,52 40,52 33.9249,52 29,47.0751 29,41 29,34.9249 33.9249,30 40,30 46.0751,30 51,34.9249 51,41 zM22,93 C22,99.0751 17.0751,104 11,104 4.92487,104 0,99.0751 0,93 0,86.9249 4.92487,82 11,82 17.0751,82 22,86.9249 22,93 zM22,64 C22,70.0751 17.0751,75 11,75 4.92487,75 0,70.0751 0,64 0,57.9249 4.92487,53 11,53 17.0751,53 22,57.9249 22,64 zM22,37 C22,43.0751 17.0751,48 11,48 4.92487,48 0,43.0751 0,37 0,30.9249 4.92487,26 11,26 17.0751,26 22,30.9249 22,37 zM140,50.5 C140,53.5376 137.538,56 134.5,56 131.462,56 129,53.5376 129,50.5 129,47.4624 131.462,45 134.5,45 137.538,45 140,47.4624 140,50.5 zM150,60.5 C150,63.5376 147.538,66 144.5,66 141.462,66 139,63.5376 139,60.5 139,57.4624 141.462,55 144.5,55 147.538,55 150,57.4624 150,60.5 zM138,88.5 C138,91.5376 135.538,94 132.5,94 129.462,94 127,91.5376 127,88.5 127,85.4624 129.462,83 132.5,83 135.538,83 138,85.4624 138,88.5 zM149,79.5 C149,82.5376 146.538,85 143.5,85 140.462,85 138,82.5376 138,79.5 138,76.4624 140.462,74 143.5,74 146.538,74 149,76.4624 149,79.5 zM159,70.5 C159,73.5376 156.538,76 153.5,76 150.462,76 148,73.5376 148,70.5 148,67.4624 150.462,65 153.5,65 156.538,65 159,67.4624 159,70.5 zM180,89.5 C180,92.5376 177.538,95 174.5,95 171.462,95 169,92.5376 169,89.5 169,86.4624 171.462,84 174.5,84 177.538,84 180,86.4624 180,89.5 M179,51.5 C179,54.5376 176.538,57 173.5,57 170.462,57 168,54.5376 168,51.5 168,48.4624 170.462,46 173.5,46 176.538,46 179,48.4624 179,51.5 M169,80.5 C169,83.5376 166.538,86 163.5,86 160.462,86 158,83.5376 158,80.5 158,77.4624 160.462,75 163.5,75 166.538,75 169,77.4624 169,80.5 M169,61.5 C169,64.5376 166.538,67 163.5,67 160.462,67 158,64.5376 158,61.5 158,58.4624 160.462,56 163.5,56 166.538,56 169,58.4624 169,61.5 ",
                          "M155,144 C155,150.075 150.075,155 144,155 137.925,155 133,150.075 133,144 133,137.925 137.925,133 144,133 150.075,133 155,137.925 155,144 zM155,110 C155,116.075 150.075,121 144,121 137.925,121 133,116.075 133,110 133,103.925 137.925,99 144,99 150.075,99 155,103.925 155,110 zM155,78 C155,84.0751 150.075,89 144,89 137.925,89 133,84.0751 133,78 133,71.9249 137.925,67 144,67 150.075,67 155,71.9249 155,78 zM122,144 C122,150.075 117.075,155 111,155 104.925,155 100,150.075 100,144 100,137.925 104.925,133 111,133 117.075,133 122,137.925 122,144 zM122,111 C122,117.075 117.075,122 111,122 104.925,122 100,117.075 100,111 100,104.925 104.925,100 111,100 117.075,100 122,104.925 122,111 zM122,78 C122,84.0751 117.075,89 111,89 104.925,89 100,84.0751 100,78 100,71.9249 104.925,67 111,67 117.075,67 122,71.9249 122,78 zM122,45 C122,51.0751 117.075,56 111,56 104.925,56 100,51.0751 100,45 100,38.9249 104.925,34 111,34 117.075,34 122,38.9249 122,45 zM89,144 C89,150.075 84.0751,155 78,155 71.9249,155 67,150.075 67,144 67,137.925 71.9249,133 78,133 84.0751,133 89,137.925 89,144 zM89,111 C89,117.075 84.0751,122 78,122 71.9249,122 67,117.075 67,111 67,104.925 71.9249,100 78,100 84.0751,100 89,104.925 89,111 zM56,144 C56,150.075 51.0751,155 45,155 38.9249,155 34,150.075 34,144 34,137.925 38.9249,133 45,133 51.0751,133 56,137.925 56,144 zM56,111 C56,117.075 51.0751,122 45,122 38.9249,122 34,117.075 34,111 34,104.925 38.9249,100 45,100 51.0751,100 56,104.925 56,111 zM56,78 C56,84.0751 51.0751,89 45,89 38.9249,89 34,84.0751 34,78 34,71.9249 38.9249,67 45,67 51.0751,67 56,71.9249 56,78 zM56,44 C56,50.0751 51.0751,55 45,55 38.9249,55 34,50.0751 34,44 34,37.9249 38.9249,33 45,33 51.0751,33 56,37.9249 56,44 zM56,11 C56,17.0751 51.0751,22 45,22 38.9249,22 34,17.0751 34,11 34,4.92487 38.9249,0 45,0 51.0751,0 56,4.92487 56,11 zM22,144 C22,150.075 17.0751,155 11,155 4.92487,155 0,150.075 0,144 0,137.925 4.92487,133 11,133 17.0751,133 22,137.925 22,144 zM22,111 C22,117.075 17.0751,122 11,122 4.92487,122 0,117.075 0,111 0,104.925 4.92487,100 11,100 17.0751,100 22,104.925 22,111 zM22,78 C22,84.0751 17.0751,89 11,89 4.92487,89 0,84.0751 0,78 0,71.9249 4.92487,67 11,67 17.0751,67 22,71.9249 22,78 zM155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 M155,78 C155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 155,78 ",
                      ],
                  },
              }),
              gsap.to(t, { y: "0em", x: "0.08em", ease: "expo.out", duration: 0.8 }),
              (o = !0));
    });
}
function initCube(e) {
    e || (e = document);
    let t = e.querySelector("[data-cube-wrap]"),
        o = e.querySelector("#cube-trigger"),
        r = e.querySelector(".cube-layout").querySelectorAll("path"),
        n = e.querySelector("#roof"),
        a = e.querySelector("#wall-left"),
        i = e.querySelector("#wall-right"),
        l = e.querySelector("#floor-mist"),
        s = e.querySelector("#floor-violet"),
        u = e.querySelector("#floor-purple"),
        c = e.querySelector("#floor-white"),
        d = gsap.timeline({ defaults: { ease: "linear" } });
    gsap.fromTo(r, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.5, stagger: 0.01, ease: "cubic.inOut" }),
        gsap.to(".dash-path", { strokeDasharray: "8px 8px", delay: 1.5, duration: 1.5, ease: "cubic.inOut" }),
        d
            .fromTo(".origin-center", { y: "0rem" }, { y: isMobile ? "355rem" : "155rem", duration: 1 })
            .fromTo(".origin-center", { scale: 1, x: "0rem" }, { scale: isMobile ? 2.25 : 1.825, x: isMobile ? "-20rem" : "-13rem", duration: 0.7 }, 0.2)
            .from(".cube-track__bg", { opacity: 1, duration: 0.1 }, 0.3)
            .to(n, { fill: "#4508F4", stroke: "#4508F4", duration: 0.05 }, 0.4)
            .to(a, { fill: "#130032", stroke: "#130032", duration: 0.05 }, "<")
            .to(i, { fill: "#CBC2FF", stroke: "#CBC2FF", duration: 0.05 }, "<")
            .to(a, { x: isMobile ? "-100vw" : "-60vw", y: isMobile ? "58vw" : "35vw", duration: 0.5 }, 0.5)
            .to(i, { x: isMobile ? "100vw" : "60vw", y: isMobile ? "58vw" : "35vw", duration: 0.5 }, "<")
            .from(l, { yPercent: 80, duration: 0.5 }, "<")
            .from(s, { yPercent: 160, duration: 0.5 }, "<")
            .from(u, { yPercent: 240, duration: 0.5 }, "<"),
        ScrollTrigger.create({ animation: d, trigger: o, start: "top 80%", endTrigger: t, end: "bottom bottom", scrub: !isMobile || 1 }),
        gsap.to([u, s, l, c], { opacity: 0, stagger: { each: 0.1, from: "end" }, scrollTrigger: { trigger: t, start: "bottom 90%", end: "bottom 60%", scrub: !0 } }),
        gsap.to(n, { opacity: 0, delay: 0.5, scrollTrigger: { trigger: t, start: "bottom 90%", end: "bottom 60%", scrub: !0 } }),
        (ElementsIntroFlag = !1);
}
function initPictograms(e) {
    e.querySelectorAll(".picto-lottie") &&
        (function (e) {
            let t = { frame: 0 },
                o = gsap.utils.toArray(e.target)[0],
                r = { trigger: ".trigger", end: { slow: "+=2000", medium: "+=1000", fast: "+=500" }[e.speed] || "+=100", scrub: 1, markers: !1 },
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
            path: "https://uploads-ssl.webflow.com/65f9a5a60db886a6050561ba/6606964c19d287dd92df89f2_C5_Icons_0328.json",
            scrub: 2,
        });
}
function initLogoIntro(e) {
    e || (e = document), gsap.set("[id^=draw-vector-]", { drawSVG: "0%" });
    for (let e = 1; e <= 14; e++) gsap.fromTo(`#draw-vector-${e}`, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut", delay: 0.1 * e });
    for (let e = 15; e <= 22; e++) ScrollTrigger.create({ trigger: `#draw-vector-${e}`, start: "top 75%", onEnter: () => gsap.to(`#draw-vector-${e}`, { drawSVG: "100%", duration: 1.4, ease: "power3.inOut" }) });
    gsap.utils.toArray(".el_svg").forEach((e) => {
        ScrollTrigger.create({
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            onUpdate: (t) => {
                gsap.to(e, { yPercent: -50 * t.progress, ease: "none" });
            },
        });
    }),
        (logoIntroFlag = !1);
}
function initLogoScroll(e) {
    e || (e = document);
    let t = e.querySelector(".logo-track"),
        o = e.querySelectorAll(".logo-text__item");
    ScrollTrigger.create({
        trigger: t,
        start: "top top",
        end: "bottom bottom",
        scrub: !0,
        onUpdate: (e) => {
            const t = e.progress,
                r = Math.min(Math.floor(t * o.length), o.length - 1);
            o.forEach((e) => e.classList.remove("active")), r < o.length && o[r].classList.add("active");
        },
    });
}
function initLogoAnim(e) {
    let t = e.querySelectorAll(".logo-anim");
    t &&
        (function (e) {
            let t = { frame: 0 },
                o = gsap.utils.toArray(e.target)[0],
                r = { trigger: ".trigger", end: { slow: "+=2000", medium: "+=1000", fast: "+=500" }[e.speed] || "+=100", scrub: 1, markers: !1 },
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
            trigger: t,
            start: "top center",
            endTrigger: ".logo-track",
            end: "bottom bottom",
            renderer: "svg",
            target: t,
            path: "https://uploads-ssl.webflow.com/65ea02c6577073f7737d9c43/660d1ce0fefbec2ee2c712a0_C6_Click_Logo_0402.json",
            scrub: 1,
        });
}
function initLogoEnd(e) {
    e || (e = document);
    let t = e.querySelector("[data-logo-end]");
    ScrollTrigger.create({
        trigger: t,
        start: "bottom bottom",
        onLeaveBack: () => {
            menuButton.removeAttribute("href"), menuButton.classList.remove("end"), gsap.to("[data-menu-text]", { y: "0%", overwrite: "auto", duration: 0.5 });
        },
        onEnter: () => {
            menuButton.setAttribute("href", "/"), menuButton.classList.add("end"), gsap.to("[data-menu-text]", { y: "-200%", overwrite: "auto", duration: 0.5 });
        },
    });
    let o = e.querySelectorAll(".c-61__head");
    ScrollTrigger.refresh(),
        ScrollTrigger.create({
            trigger: t,
            start: "bottom-=10% bottom",
            end: "bottom bottom+=20%",
            onUpdate: (e) => {
                const t = e.progress,
                    r = Math.min(Math.floor(t * o.length), o.length - 1);
                o.forEach((e) => e.classList.remove("active")), r < o.length && o[r].classList.add("active");
            },
        });
}
function initPageEnd(e) {
    e || (e = document);
    let t = e.querySelector(".spacer_wrap"),
        o = e.querySelector(".footer_content"),
        r = e.querySelector(".footer_inner"),
        n = e.querySelector(".footer_el.is-center");
    if (!t) return;
    let a = gsap.timeline({ defaults: { ease: "linear" } });
    a
        .fromTo(
            "#progress",
            { drawSVG: "0%" },
            {
                drawSVG: "100%",
                duration: 1,
                onComplete: () => {
                    o.click();
                },
            }
        )
        .fromTo(r, { opacity: 0, yPercent: 35 }, { opacity: 1, yPercent: 0, duration: 1 }, 0)
        .fromTo(n, { rotate: isMobile ? 0 : 50 }, { rotate: 0, duration: 1 }, 0),
        ScrollTrigger.create({ trigger: t, animation: a, start: "bottom 90%", endTrigger: e, end: "bottom-=2 bottom", scrub: !0 });
}
function updatePageText(e) {
    e || (e = document);
    let t = e.getAttribute("data-barba-namespace"),
        o = e.getAttribute("data-page-nr");
    "intro" === t && ((t = "Menu"), (o = "")), (pageText.textContent = t), (pageNr.textContent = o);
}
function killMorphingLetters() {
    morphingTween && (morphingTween.kill(), (morphingTween = null));
}
function loadP5AndInit(e) {
    const t = document.createElement("script");
    (t.src = "https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"),
        (t.onload = () => {
            initDotGrid(e);
        }),
        document.head.appendChild(t);
}
function initGeneral(e) {
    headingIntroFlag || initHeroHeadings(e),
        runSplit(e),
        initMenuProgress(e),
        updatePageText(e),
        initHeadings(e),
        killMorphingLetters(),
        gsap.delayedCall(1, () => {
            lenis.resize();
        }),
        ranGeneral || (initMenu(e), initSoundIcon(), MorphSVGPlugin.convertToPath(".menu-w circle, .menu-w rect, .menu-w ellipse"), (ranGeneral = !0));
}
function initIntro(e) {
    lenis.stop(), initIntroLoad(e), initShowreelSound(e);
}
function initTypography(e) {
    initPageEnd(e), typeIntroFlag || initTypographyIntro(e), initMorphingLetters(e);
}
function initColor(e, t) {
    colorIntroFlag || initColorIntro(e),
        initPageEnd(e),
        initPalette(e),
        initBlob(e),
        loadP5AndInit(e),
        gsap.delayedCall(1, () => {
            ScrollTrigger.refresh();
        });
}
function initSound(e) {
    initPageEnd(e), initAudioMorph(e), initTicks(e), initWaveFormModal(e);
}
function initMotion(e) {
    initPageEnd(e);
}
function initElements(e) {
    ElementsIntroFlag || initCube(e), initPageEnd(e), initPictograms(e);
}
function initLogo(e) {
    logoIntroFlag || initLogoIntro(e), initLogoScroll(e), initLogoAnim(e), initLogoEnd(e);
}
barba.hooks.afterEnter((e) => {
    ScrollTrigger.getAll().forEach((e) => {
        e.kill();
    }),
        $(".is--transitioning").removeClass("is--transitioning"),
        resetWebflow(e),
        (lenis = new Lenis({ duration: 1.1, easing: (e) => (1 === e ? 1 : 1 - Math.pow(2, -13 * e)) })),
        lenis.scrollTo(0, { immediate: !0, force: !0, lock: !0 }),
        ScrollTrigger.refresh();
}),
    barba.hooks.leave((e) => {
        lenis.destroy();
    }),
    barba.hooks.enter((e) => {
        e.next.container.classList.add("is--transitioning");
    }),
    barba.init({
        preventRunning: !0,
        prevent: function ({ el: e }) {
            return e.hasAttribute("data-barba-prevent");
        },
        transitions: [
            {
                name: "self",
                enter(e) {
                    let t = e.next.namespace,
                        o = e.next.container;
                    console.log(t), menuCloseTl.progress(0).timeScale(1).play();
                    let r = document.querySelector(".load-trigger");
                    r && r.click(), "intro" === t && (initReel(o), gsap.set(["#music-toggle", "#menu-btn"], { autoAlpha: 0 }), stopBackgroundMusic());
                },
                afterEnter(e) {
                    let t = e.next.container;
                    gsap.delayedCall(0.5, () => {
                        initHeadings(t), ScrollTrigger.refresh();
                    });
                },
            },
            {
                name: "menu",
                from: { custom: ({ trigger: e }) => e.classList && e.classList.contains("menu-link") },
                leave(e) {
                    let t = e.trigger,
                        o = e.next.namespace;
                    runMenuTransition(t, e.next.container),
                        "logo" === o && (logoIntroFlag = !0),
                        "elements" === o && (ElementsIntroFlag = !0),
                        "typography" === o && (typeIntroFlag = !1),
                        "color" === o && (colorIntroFlag = !1),
                        (headingIntroFlag = !0);
                },
                afterEnter(e) {
                    e.current.container;
                    let t = e.next.container,
                        o = e.next.namespace;
                    gsap.delayedCall(2, () => {
                        if ((gsap.to(".menu-overlay__item", { opacity: 0, yPercent: 50, duration: 0.4, clearProps: "all", ease: "cubic.inOut", stagger: { each: 0.1, from: "center" } }), "intro" !== o)) {
                            let e = t.querySelector(".load-trigger");
                            e && e.click();
                        } else gsap.set(".pre-loader", { display: "none" }), gsap.set("#nav", { visibility: "hidden" }), stopBackgroundMusic(), initReel(t);
                        return gsap.to(menuWrapper, { yPercent: -110, duration: 0.8, ease: "menuLeave" });
                    });
                },
                after(e) {
                    ScrollTrigger.refresh();
                },
            },
            {
                name: "back",
                sync: !0,
                from: { custom: ({ trigger: e }) => e.classList && e.classList.contains("top-btn") },
                leave(e) {
                    let t = e.trigger,
                        o = e.next.namespace,
                        r = e.next.container,
                        n = e.current.container;
                    return (
                        n.classList.add("is--transitioning"),
                        n.classList.add("is--top"),
                        runBackTransition(t, r),
                        "logo" === o && (logoIntroFlag = !1),
                        "elements" === o && (ElementsIntroFlag = !1),
                        "color" === o && (colorIntroFlag = !1),
                        (typeIntroFlag = !0),
                        (headingIntroFlag = !0),
                        gsap.to(n, { opacity: 0, delay: 1.5, duration: 0.01 })
                    );
                },
                beforeEnter(e) {
                    let t = e.current.container;
                    gsap.delayedCall(0.6, () => {
                        t.style.display = "none";
                    });
                },
                afterEnter(e) {
                    e.current.container;
                    let t = e.next.container;
                    e.next.namespace;
                    gsap.set(t, { opacity: 1, clearProps: "all" }), gsap.to(".menu-overlay__item", { opacity: 0, yPercent: 50, duration: 0.4, clearProps: "all", ease: "cubic.inOut", stagger: { each: 0.1, from: "center" } });
                    let o = t.querySelector(".load-trigger");
                    return (
                        o && o.click(),
                        gsap.to(menuWrapper, {
                            yPercent: -110,
                            duration: 0.8,
                            ease: "menuLeave",
                            onComplete: () => {
                                menuCloseTl.progress(0).timeScale(1e3).play();
                            },
                        })
                    );
                },
                after(e) {
                    ScrollTrigger.refresh();
                },
            },
            {
                name: "intro-to-type",
                sync: !0,
                from: { custom: ({ trigger: e }) => e.classList && e.classList.contains("scroll_wrap") },
                leave(e) {
                    let t = document.querySelector(".menu-link.is--typography"),
                        o = (e.next.namespace, e.next.container),
                        r = e.current.container;
                    return r.classList.add("is--transitioning"), r.classList.add("is--top"), runBackTransition(t, o), (typeIntroFlag = !0), (headingIntroFlag = !0), gsap.to(r, { opacity: 0, delay: 1.5, duration: 0.01 });
                },
                beforeEnter(e) {
                    let t = e.current.container;
                    gsap.delayedCall(0.6, () => {
                        t.style.display = "none";
                    });
                },
                afterEnter(e) {
                    e.current.container;
                    let t = e.next.container;
                    e.next.namespace;
                    gsap.set(t, { opacity: 1, clearProps: "all" }), gsap.to(".menu-overlay__item", { opacity: 0, yPercent: 50, duration: 0.4, clearProps: "all", ease: "cubic.inOut", stagger: { each: 0.1, from: "center" } });
                    let o = t.querySelector(".load-trigger");
                    return (
                        o && o.click(),
                        gsap.to(menuWrapper, {
                            yPercent: -110,
                            duration: 0.8,
                            ease: "menuLeave",
                            onComplete: () => {
                                menuCloseTl.progress(0).timeScale(1e3).play();
                            },
                        })
                    );
                },
                after(e) {
                    ScrollTrigger.refresh();
                },
            },
            {
                name: "default",
                enter(e) {
                    let t = e.current.container,
                        o = e.next.container;
                    return initHeroHeadings(o), (headingIntroFlag = !0), gsap.fromTo(t, { y: "0vh" }, { y: "-100vh", duration: 1.2, ease: "expo.inOut" }), gsap.fromTo(o, { y: "100vh" }, { y: "0vh", duration: 1.2, ease: "expo.inOut" });
                },
                after(e) {
                    let t = e.next.container.querySelector(".load-trigger");
                    t && t.click(), ScrollTrigger.refresh();
                },
            },
        ],
        views: [
            {
                namespace: "intro",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initIntro(t);
                },
            },
            {
                namespace: "typography",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initTypography(t);
                },
            },
            {
                namespace: "color",
                afterEnter(e) {
                    let t = e.next.container,
                        o = e.next.hmtl;
                    initGeneral(t), initColor(t, o);
                },
            },
            {
                namespace: "sound",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initSound(t);
                },
            },
            {
                namespace: "motion",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initMotion(t);
                },
            },
            {
                namespace: "elements",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initElements(t);
                },
            },
            {
                namespace: "logo",
                afterEnter(e) {
                    let t = e.next.container;
                    initGeneral(t), initLogo(t);
                },
            },
            {
                namespace: "brand",
                afterEnter(e) {
                    initGeneral(e.next.container);
                },
            },
            {
                namespace: "404",
                afterEnter(e) {
                    initGeneral(e.next.container);
                },
            },
        ],
    });
