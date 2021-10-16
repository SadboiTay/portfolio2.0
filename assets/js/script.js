const menuBtn = document.querySelector('.menu-btn');
const body = document.querySelector('body');
let menuOpen = false;
var menuPageTL = gsap.timeline();

// click menu button listener
menuBtn.addEventListener('click', () => {
    // create timeline

    if(!menuOpen) {
        // animate menu btn
        menuBtn.classList.toggle('open');

        // animate menu page in
        menuPageTL.to('main', {
            duration: 1,
            x: '-100vw',
            ease: 'power4'
        })
        .to('.menu-page', {
            duration: 1,
            x: 0,
            ease: "power4"
        }, "<")

        // set y overflow to hidden
        body.classList.toggle('hidden');

        menuOpen = true;
    } else {
        // animate menu btn
        menuBtn.classList.toggle('open');

        // animate page out
        menuPageTL.reverse();

        // reveal y overflow
        body.classList.toggle('hidden');

        menuOpen = false;
    }
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