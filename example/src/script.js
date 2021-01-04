//aside selector
const aside = document.querySelector('[data-sticky="true"]'), 
//varibles
startScroll = 0;
var endScroll = window.innerHeight - aside.offsetHeight -500,
currPos = window.scrollY;
aside.style.top = startScroll + 'px';
//main function
document.addEventListener('scroll', () => {
    endScroll = window.innerHeight - aside.offsetHeight;
    let asideTop = parseInt(aside.style.top.replace('px;', ''));
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
    currPos = window.scrollY;
}, {
    capture: true,
    passive: true
});