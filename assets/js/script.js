let menuOpen = false;

// navbar scroll hide
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector("nav").style.top = "0";
    } else {
        document.querySelector("nav").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

// smooth back to top for safari 
function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

// create menu page animation timeline
var menuPageTL = gsap.timeline({ paused: true, reversed: true });
menuPageTL.to('main', {
    duration: 0.5,
    x: '-100vw',
    ease: 'back.in'
})
    .to('.menu-page-slider', {
        stagger: 0.2,
        duration: 1,
        x: 0,
        ease: 'back.in'
    }, "<-0.3")
    .to('.menu-page', {
        duration: 0.8,
        x: 0,
        ease: 'back.in'
    }, "<1")
    .from('.menu-page li', {
        stagger: 0.1,
        duration: 0.3,
        opacity: 0,
        x: '200px',
        scale: 0,
        ease: 'back'
    }, '>-0.2')

const animateMenuPage = () => {
    // ternary operator - if reversed, play; else reverse
    menuPageTL.reversed() ? menuPageTL.play() : menuPageTL.reverse();
}

// click menu button listener
$('.menu-btn').click(() => {
    // create timeline

    if (!menuOpen) {
        // animate menu btn
        $('.menu-btn').toggleClass('open');

        // set y overflow to hidden
        $('body').toggleClass('hidden');

        menuOpen = true;
    } else {
        // animate menu btn
        $('.menu-btn').toggleClass('open');

        // toggle y overflow
        $('body').toggleClass('hidden');

        menuOpen = false;
    }

    // animate page out
    animateMenuPage();
})

$('.nav-links').click(() => {
    // animate menu btn
    $('.menu-btn').toggleClass('open');

    animateMenuPage();

    // toggle y overflow
    $('body').toggleClass('hidden');
})

// scrollmagic project revealer
const controller = new ScrollMagic.Controller();
let projectRevealerElements = document.getElementsByClassName('project-revealer');
let projectContentElements = document.getElementsByClassName('project-content')
for (let i = 0; i < projectRevealerElements.length; i++) {
    new ScrollMagic.Scene({
        triggerElement: projectRevealerElements[i],
        triggerHook: 0.9
    })
        .setTween(gsap.timeline()
            .to(projectRevealerElements[i], {
                duration: 1,
                x: '-100%',
                ease: Expo.inOut
            })
            .to(projectContentElements[i], {
                duration: 0.4,
                y: '0%',
                opacity: 1,
                ease: Expo.inOut
            }, "<+0.7"))
        // .addIndicators()
        .addTo(controller);
}

const portalSceneTl = gsap.timeline();
portalSceneTl
    .from('#portal', {
        duration: 1,
        scale: 0,
        ease: 'expo'
    })
    .from('#tay-cropped', {
        duration: 1.5,
        ease: 'expo',
        // y: '100%',
        opacity: 0
    }, '<+.5')
    .from('.socials-about', {
        duration: 1,
        y: '100%',
        ease: 'back',
        opacity: 0,
        stagger: .2
    }, '<+.2')

new ScrollMagic.Scene({
    triggerElement: '.about-graphics-container',
    triggerHook: .75,
})
    .setTween(portalSceneTl)
    .addIndicators()
    .addTo(controller);

const linkedInEl = document.querySelector('#linkedin-about')

const hoverChecker = setInterval(() => {
    if (gsap.getProperty(linkedInEl, 'opacity') === 1) {
        $('.socials-about').addClass('animate-hover')
    }
    if (gsap.getProperty(linkedInEl, 'opacity') <.9) {
        $('.socials-about').removeClass('animate-hover')
    }
}, 100)