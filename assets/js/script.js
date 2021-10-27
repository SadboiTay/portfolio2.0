let menuOpen = false;

// navbar scroll hide
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function () {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//         document.querySelector("nav").style.top = "0";
//     } else {
//         document.querySelector("nav").style.top = "-50px";
//     }
//     prevScrollpos = currentScrollPos;
// }

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

const tayTl = gsap.timeline();
tayTl
    .from('.tay-img-box', {
        duration: 1,
        y: '500px',
        opacity: 0,
        ease: 'back'
    })
    .from('.socials-svg', {
        stagger: 0.2,
        duration: 0.75,
        y: '500px',
        opacity: 0,
        ease: 'back'
    }, '<+.5')
    .from('.icosahedron-svg', {
        stagger: 0.2,
        duration: 0.75,
        y: '500px',
        opacity: 0,
        ease: 'back'
    }, '<+.2')

new ScrollMagic.Scene({
    triggerElement: '.about-graphics-container',
    triggerHook: 0.1,
    duration: 1400
})
    .setTween(tayTl)
    // .addIndicators()
    .setPin('.about-graphics-container')
    .addTo(controller);

// if (!tayTl.reversed()) {
//     $('.socials-svg').toggleClass('hover')
//     console.log('now hovering')
// }