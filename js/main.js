document.addEventListener("DOMContentLoaded", function () {
    /*==========   Load YouTube IFrame API   ==========*/
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /*==========   Load HTML   ==========*/
    function loadHTML(elementId, url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                const element = document.getElementById(elementId);
                const parent = element.parentNode;
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = data;
                while (tempDiv.firstChild) {
                    parent.insertBefore(tempDiv.firstChild, element);
                }
                parent.removeChild(element);
                if (callback) callback();
            })
            .catch((error) => console.error("Error loading HTML:", error));
    }
    loadHTML("header", "header.html");
    loadHTML("footer", "footer.html");

    /*==========   Section 1: Video Background   ==========*/
    var bgPlayer;
    window.onYouTubeIframeAPIReady = function () {
        bgPlayer = new YT.Player("bgPlayer", {
            videoId: "l5G5VfptXpk",
            playerVars: {
                autoplay: 1,
                controls: 0,
                mute: 1,
                loop: 1,
                playlist: "l5G5VfptXpk",
                disablekb: 1,
            },
            events: {
                onReady: onPlayerReady,
            },
        });
    };
    function onPlayerReady() {
        bgPlayer.setPlaybackQuality("hd1080");
    }

    /*==========   Section 1: Click Scroll   ==========*/
    const pageArrow = document.querySelector(".page-arrow");
    pageArrow.addEventListener("click", function (event) {
        event.preventDefault();
        const targetScroll = window.innerHeight * 0.8;
        window.scrollBy({
            top: targetScroll,
            behavior: "smooth",
        });
    });

    /*==========   Section 2: Initialize Splide (Products)  ==========*/
    const splideProducts = new Splide(".products__splide", {
        arrows: false,
        autoplay: true,
        interval: 4000,
        speed: 700,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
        classes: {
            pagination: "splide__pagination product-pagination",
            page: "splide__pagination__page product-page",
        },
    });
    splideProducts.mount();

    let icons = document.querySelectorAll(".product-page");
    icons.forEach((item, index) => {
        item.addEventListener("mouseover", (e) => {
            focus(e.target, index);
        });
        item.addEventListener("mouseleave", () => {
            icons.forEach((item) => {
                item.classList.remove("prev", "next", "focus");
            });
        });
    });
    const focus = (elem, index) => {
        elem.classList.add("focus");

        let previous = index - 1;
        let next = index + 1;
        if (previous >= 0) icons[previous].classList.add("prev");
        if (next < icons.length) icons[next].classList.add("next");
    };

    /*==========   Section 3: Initialize Splide (YouTube)   ==========*/
    const splideYT = new Splide(".videos__splide", {
        heightRatio: 0.5625,
        cover: true,
        updateOnMove: true,
        pagination: false,
        padding: "20%",
        autoplay: true,
        interval: 4000,
        speed: 700,
        gap: "3.5rem",
        type: "loop",
        video: {
            loop: true,
        },
        classes: {
            pagination: "splide__pagination video-pagination",
            page: "splide__pagination__page video-page",
        },
        breakpoints: {
            991: {
                pagination: true,
                padding: "15%",
                gap: "3rem",
            },
            640: { arrows: false, padding: "25px" },
        },
    });
    splideYT.mount(window.splide.Extensions);

    /*==========   Section 3:  Initialize Splide (Instagram)   ==========*/
    const splideIG = new Splide(".ig__splide", {
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 4000,
        speed: 700,
        perPage: 5,
        perMove: 1,
        padding: 0,
        gap: 10,
        easing: "cubic-bezier(0.42, 0, 0.58, 1)",
        type: "loop",
        classes: {
            pagination: "splide__pagination ig-pagination",
            page: "splide__pagination__page ig-page",
        },
        breakpoints: {
            1820: {
                perPage: 4,
            },
            1620: {
                perPage: 3,
            },
            1000: {
                perPage: 2,
                pagination: true,
            },
            670: {
                perPage: 1,
            },
        },
    });
    splideIG.mount();

    /*==========   Section 3: Initialize Instagram   ==========*/
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }

    /*==========   Sticky Navbar   ==========*/
    function checkStickyNavbar() {
        const header = document.getElementById("header");
        if (window.scrollY > 80) {
            header.classList.add("is-sticky");
        } else {
            header.classList.remove("is-sticky");
        }
    }
    // Check sticky status on page load
    setTimeout(() => {
        checkStickyNavbar();
    }, 1000);
    // Update sticky status on scroll
    window.addEventListener("scroll", checkStickyNavbar);

    /*==========   Initialize AOS   ==========*/
    setTimeout(() => {
        AOS.init();
    }, 1000);
});
