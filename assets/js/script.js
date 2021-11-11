let menuOpen = false;
const controller = new ScrollMagic.Controller();

// navbar scroll hide
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    if ($(window).width() < 950) {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector("nav").style.top = "0";
        } else {
            document.querySelector("nav").style.top = "-50px";
        }
        prevScrollpos = currentScrollPos;
    }
}

// smooth back to top for safari 
function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if (time == null) time = 500;
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

//
// QUOTES ANIMATIONS
//

console.log(`poly is ${document.querySelector('#q2-polygon-small').getTotalLength()}`)

// Q1 timeline
const quote1Tl = gsap.timeline();
quote1Tl
    .to('#q1-polygon', {
        duration: 1,
        strokeDashoffset: 0
    })
    .from('#q1-l1', {
        duration: 1,
        x: '50%',
        opacity: 0,
        ease: 'power3'
    }, '<')
    .from('#q1-l2', {
        duration: 1,
        x: '-50%',
        opacity: 0,
        ease: 'power3'
    }, '<+.1')
    .from('#q1-credit', {
        duration: .5,
        opacity: 0,
        ease: 'power3'
    })

// Q1 scroll
new ScrollMagic.Scene({
    triggerElement: '.quote-1-section',
    triggerHook: 0.5,
    duration: 650
})
    .setTween(quote1Tl)
    // .addIndicators()
    .addTo(controller);

//  Q2 Timeline
const quote2Tl = gsap.timeline()
quote2Tl
    .from('#q2-l1', {
        duration: 1,
        opacity: 0,
        y: '-100%',
        ease: 'power3'
    })
    .to('#q2-polygon-big', {
        duration: 1,
        strokeDashoffset: 0,
        ease: 'power3'
    }, '<+.5')
    .to('#q2-polygon-small', {
        duration: 1,
        strokeDashoffset: 0,
        ease: 'power3'
    }, '<')
    .from('#q2-credit', {
        duration: .5,
        opacity: 0,
        ease: 'power3'
    })

// Q2 scroll
new ScrollMagic.Scene({
    triggerElement: '.quote-2-section',
    triggerHook: 0.5,
    duration: 650
})
    .setTween(quote2Tl)
    // .addIndicators()
    .addTo(controller);




// 
// END QUOTES ANIMATIONS 
// 

// scrollmagic project revealer
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
    // .addIndicators()
    .addTo(controller);

const linkedInEl = document.querySelector('#linkedin-about')

const hoverChecker = setInterval(() => {
    if (gsap.getProperty(linkedInEl, 'opacity') === 1) {
        $('.socials-about').addClass('animate-hover')
    }
    if (gsap.getProperty(linkedInEl, 'opacity') < .9) {
        $('.socials-about').removeClass('animate-hover')
    }
}, 100)

// animate contact section in
var contactTl = gsap.timeline();
contactTl
    .from('.email-block', {
        duration: 1,
        ease: 'power3',
        y: '100%',
        opacity: 0
    })

new ScrollMagic.Scene({
    triggerElement: '.contact-section',
    triggerHook: .75
})
    .setTween(contactTl)
    // .addIndicators()
    .addTo(controller)
