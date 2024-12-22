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
 * @version 1.7.1
 * @author  Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @contributors Krzysztof-Antosik, vadim-on-github 
 * @changelog https://github.com/Krzysztof-Antosik/Two-Direction-Sticky-Sidebar/blob/main/CHANGELOG.md
 * @link    https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/
 *
 *
 */

// Select the element designated to be sticky using a custom `data-sticky="true"` attribute.
const stickyElement = document.querySelector(`[data-sticky="true"]`);

if (stickyElement) { // Ensure the sticky element exists before proceeding.

    // Define constants and calculate the initial position of the sticky element.
    const startPosition = stickyElement.getBoundingClientRect().top; // Initial top offset of the sticky element relative to the viewport.

    // Variables for managing sticky behavior.
    var endScroll = window.innerHeight - stickyElement.offsetHeight - 500, // Lower boundary for sticky movement.
        currPos = window.scrollY,                                        // Current scroll position of the viewport.
        screenHeight = window.innerHeight,                              // Height of the browser viewport.
        stickyElementHeight = stickyElement.offsetHeight,               // Height of the sticky element.
        topGap = 0,                                                     // Space between the top of the viewport and the sticky element.
        bottomGap = 0,                                                  // Space between the bottom of the sticky element and the viewport.
        width = window.innerWidth,                                      // Current width of the viewport.
		mobileWidth = 0; 												// Width threshold below which the sticky behavior will be disabled.

    // Set `topGap` and `bottomGap` based on the attributes of the sticky element.
    setTimeout(() => {
        if (stickyElement.hasAttribute(`data-top-gap`)) {
            const dataTopGap = stickyElement.dataset.topGap;
            // If `data-top-gap` is "auto," use the element's initial position; otherwise, parse the value.
            topGap = String(dataTopGap) == "auto" ? startPosition : parseInt(dataTopGap);
        }

        if (stickyElement.hasAttribute(`data-bottom-gap`)) {
            // Parse the `data-bottom-gap` value to define the distance from the bottom.
            bottomGap = parseInt(stickyElement.dataset.bottomGap);
        }

		if (stickyElement.hasAttribute(`data-mobile-width`)) {
            // Parse the `data-bottom-gap` value to define the distance from the bottom.
            mobileWidth = parseInt(stickyElement.dataset.mobileWidth);
        }


    }, 100); // Delay allows attributes to be properly set.

    // Function to disable sticky behavior on mobile devices.
    function offStickyOnMobile() {
        if (width > mobileWidth) { // Enable sticky behavior only for larger screens.
            stickyElement.style.position = `sticky`;        // Enable sticky positioning.
            stickyElement.style.top = topGap + `px`;        // Set top offset using `topGap`.
            stickyElement.style.height = "fit-content";     // Ensure the height adapts to the content.
        } else {
            stickyElement.removeAttribute(`style`); // Remove inline styles to disable sticky behavior.
        }
    }
    offStickyOnMobile(); // Apply the function initially.

    // Main function to dynamically adjust the sticky sidebar's position during scrolling.
    function positionStickySidebar() {
        endScroll = window.innerHeight - stickyElement.offsetHeight - bottomGap; // Recalculate lower boundary.
        let stickyElementTop = parseInt(stickyElement.style.top.replace(`px`, ``)); // Current top offset of the sticky element.

        // Check if the sticky element exceeds the viewport height.
        if (stickyElementHeight + topGap + bottomGap > screenHeight) {
            if (window.scrollY < currPos) {
                // Scrolling up
                if (stickyElementTop < topGap) {
                    // Move the sidebar upwards as the user scrolls up.
                    stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + `px`;
                } else if (stickyElementTop >= topGap && stickyElementTop != topGap) {
                    // Snap to the top gap if it overshoots.
                    stickyElement.style.top = topGap + `px`;
                }
            } else {
                // Scrolling down
                if (stickyElementTop > endScroll) {
                    // Move the sidebar downwards as the user scrolls down.
                    stickyElement.style.top = (stickyElementTop + currPos - window.scrollY) + `px`;
                } else if (stickyElementTop < endScroll && stickyElementTop != endScroll) {
                    // Snap to the bottom limit if it overshoots.
                    stickyElement.style.top = endScroll + `px`;
                }
            }
        } else {
            // If the sticky element fits within the viewport, keep it at the top gap.
            stickyElement.style.top = topGap + `px`;
        }

        // Update the current scroll position for the next cycle.
        currPos = window.scrollY;
    }

    // Resets the sticky element's position to the top gap.
    function stickyElementToMe() {
        stickyElement.style.top = topGap + `px`;
    }

    // Updates dimensions and calls `positionStickySidebar` to adjust positioning.
    function updateSticky() {
        screenHeight = window.innerHeight;               // Update viewport height.
        stickyElementHeight = stickyElement.offsetHeight; // Update sidebar height.
        positionStickySidebar();                         // Adjust the position accordingly.
    }

	//Initialize sticky
	function initSticky(){
		width = window.innerWidth;  // Update viewport width.
		currPos = window.scrollY;   // Update current scroll position.
		updateSticky();             // Adjust sticky position.
		offStickyOnMobile();        // Reapply sticky or disable it based on screen width.
		//stickyElementToMe();		// Reset position
	}

    // Initialize event listeners after a short delay.
    setTimeout(() => {
        // Adjust on window resize to account for changing viewport dimensions.
        window.addEventListener(`resize`, ()=>{
			initSticky();
		});

        // Trigger position updates on every scroll event.
        document.addEventListener(`scroll`, updateSticky, {
            capture: true,   // Ensures the event is handled during the capture phase.
            passive: true    // Improves performance by signaling that the listener won't call `preventDefault`.
        });
		
		initSticky();
    }, 300); // Delay allows for DOM setup and style application.
}
