//Sticky element selector..
const stickyElement = document.querySelector('[data-sticky="true"]'),

//..and other constant
startPosition = stickyElement.getBoundingClientRect().top,
topGap = stickyElement.hasAttribute('data-top-gap') ? parseInt(stickyElement.getAttribute('data-top-gap')) : 0,
bottomGap =  stickyElement.hasAttribute('data-bottom-gap') ? parseInt(stickyElement.getAttribute('data-bottom-gap')) : 0;

//Varibles
var endScroll = window.innerHeight - stickyElement.offsetHeight - 500,
currPos = window.scrollY,
screenHeight = window.innerHeight,
stickyElementHeight = stickyElement.offsetHeight;

//Add required style to sticky element
stickyElement.style.marginTop = topGap + 'px';
stickyElement.style.marginBottom = bottomGap + 'px';
stickyElement.style.position = 'sticky';
stickyElement.style.top = topGap + 'px'; 

//Main function
function position_sticky_sidebar() {
    endScroll = window.innerHeight - stickyElement.offsetHeight - bottomGap;
    let stickyElementTop = parseInt(stickyElement.style.top.replace('px;', ''));
    if (stickyElementHeight>screenHeight) {
        if (window.scrollY < currPos) {

            //Scroll up
            if (stickyElementTop < topGap) {
                stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + 'px';
            } else if (stickyElementTop >= topGap && stickyElementTop != topGap) {
                stickyElement.style.top = topGap + 'px';
            }
        } else {

            //Scroll down
            if (stickyElementTop > endScroll) {
                stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + 'px';
            } else if (stickyElementTop < (endScroll) && stickyElementTop != endScroll) {
                stickyElement.style.top = endScroll + 'px';
            }
        }
    } else {
        stickyElement.style.top = topGap + 'px';
    }
    currPos = window.scrollY;
}

//Check heights of the viewport and the sticky element on window resize and reapply positioning
setTimeout(() => {
    window.addEventListener('resize', ()=>{
        currPos = window.scrollY,
        screenHeight = window.innerHeight;
        stickyElementHeight = stickyElement.offsetHeight;
        position_sticky_sidebar();
    });    
}, 100);
//Follow the main function when scrolling
document.addEventListener('scroll', position_sticky_sidebar, {
    capture: true,
    passive: true
});