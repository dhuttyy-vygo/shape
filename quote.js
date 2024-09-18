
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