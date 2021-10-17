const body = document.querySelector('body');
let menuOpen = false;

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
        stagger: 0.2,
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