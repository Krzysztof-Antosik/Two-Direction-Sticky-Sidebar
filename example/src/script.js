//aside selector
const aside = document.querySelector('[data-sticky="true"]'), 
//varibles
startScroll = 0;
var endScroll = window.innerHeight - aside.offsetHeight -500,
currPos = window.scrollY;
screenHeight = window.innerHeight,
asideHeight = aside.offsetHeight;
aside.style.top = startScroll + 'px';
//check height screen and aside on resize
window.addEventListener('resize', ()=>{
    screenHeight = window.innerHeight;
    asideHeight = aside.offsetHeight;
});
//main function
document.addEventListener('scroll', () => {
    endScroll = window.innerHeight - aside.offsetHeight;
    let asideTop = parseInt(aside.style.top.replace('px;', ''));
    if(asideHeight>screenHeight){
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
    }
    currPos = window.scrollY;
}, {
    capture: true,
    passive: true
});