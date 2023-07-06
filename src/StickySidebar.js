/**
 * StickySidebar.js
 * A short JavaScript code that allows you to quickly and easily implement a Sticky Sidebar,
 * if the browser's viewport is too short, sidebar's contents will scroll in the direction
 * the user scrolls and sticks to either top or bottom of the screen when there's no more content. 
 * And everything with the use of pure JavaScript, 
 * thanks to which you we'll save redundant code and gain efficiency.
 * -- Krzysztof Antosik
 *
 *
 * @license The MIT License, https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/blob/main/LICENSE
 * @version 1.6
 * @author  Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @updated 2023-07-06
 * @link    https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/
 *
 *
 */


//Sticky element selector..
const stickyElement = document.querySelector(`[data-sticky="true"]`),

//..and other constant
startPosition = stickyElement.getBoundingClientRect().top;

//Varibles
var endScroll = window.innerHeight - stickyElement.offsetHeight - 500,
currPos = window.scrollY,
screenHeight = window.innerHeight,
stickyElementHeight = stickyElement.offsetHeight
topGap = 0,
bottomGap = 0;

//Set Gaps
setTimeout(() => {
	if (stickyElement.hasAttribute(`data-top-gap`)){
		const dataTopGap = stickyElement.getAttribute(`data-top-gap`);
		topGap = String(dataTopGap) == "auto" ? startPosition : parseInt(dataTopGap);
	}

	if (stickyElement.hasAttribute(`data-bottom-gap`)){
		bottomGap = parseInt(stickyElement.getAttribute(`data-bottom-gap`));
	}
}, 100);

//Add required style to sticky element
stickyElement.style.position = `sticky`;
stickyElement.style.top = topGap + `px`; 
stickyElement.style.height = "fit-content";

//Main function
function positionStickySidebar() {
	endScroll = window.innerHeight - stickyElement.offsetHeight - bottomGap;
	let stickyElementTop = parseInt(stickyElement.style.top.replace(`px;`, ``));
	if (stickyElementHeight+topGap+bottomGap>screenHeight) {
		if (window.scrollY < currPos) {

			//Scroll up
			if (stickyElementTop < topGap) {
				stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + `px`;
			} else if (stickyElementTop >= topGap && stickyElementTop != topGap) {
				stickyElement.style.top = topGap + `px`;
			}
		} else {

			//Scroll down
			if (stickyElementTop > endScroll) {
				stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + `px`;
			} else if (stickyElementTop < (endScroll) && stickyElementTop != endScroll) {
				stickyElement.style.top = endScroll + `px`;
			}
		}
	} else {
		stickyElement.style.top = topGap + `px`;
	}
	currPos = window.scrollY;
}
function stickyElementToMe(){
	stickyElement.style.top = topGap + `px`;
}
function updateSticky(){
	screenHeight = window.innerHeight;
	stickyElementHeight = stickyElement.offsetHeight;
	positionStickySidebar();
}
setTimeout(() => {
	//Check heights of the viewport and the sticky element on window resize and reapply positioning
	window.addEventListener(`resize`, ()=>{
		currPos = window.scrollY;
		updateSticky();
	});   
	//Follow the main function when scrolling
	document.addEventListener(`scroll`, updateSticky, {
		capture: true,
		passive: true
	}); 
}, 1000);