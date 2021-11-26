//aside selector
const aside = document.querySelector('[data-sticky="true"]'),

//varibles
startScroll = parseInt(aside.getAttribute('data-top-gap')),
bottomGap = parseInt(aside.getAttribute('data-bottom-gap'));
var endScroll = window.innerHeight - aside.offsetHeight - 500,
currPos = window.scrollY,
screenHeight = window.innerHeight,
asideHeight = aside.offsetHeight;
aside.style.top = startScroll + 'px';

//check heights of the viewport and the aside on window resize and reapply positioning
window.addEventListener('resize', ()=>{
    screenHeight = window.innerHeight;
    asideHeight = aside.offsetHeight;
    position_sticky_sidebar();
});

document.addEventListener('scroll', position_sticky_sidebar, {
    capture: true,
    passive: true
});

//main function
function position_sticky_sidebar() {
    endScroll = window.innerHeight - aside.offsetHeight - bottomGap;
    let asideTop = parseInt(aside.style.top.replace('px;', ''));
    if (asideHeight>screenHeight) {
        if (window.scrollY < currPos) {

            //scroll up
            if (asideTop < startScroll) {
                aside.style.top = (asideTop + currPos - window.scrollY) + 'px';
            } else if (asideTop >= startScroll && asideTop != startScroll) {
                aside.style.top = startScroll + 'px';
            }
        } else {

            //scroll down
            if (asideTop > endScroll) {
                aside.style.top = (asideTop + currPos - window.scrollY) + 'px';
            } else if (asideTop < (endScroll) && asideTop != endScroll) {
                aside.style.top = endScroll + 'px';
            }
        }
    } else {
        aside.style.top = startScroll + 'px';
    }
    currPos = window.scrollY;
}
