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
 * @version 1.8.0
 * @author  Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @contributors Krzysztof-Antosik, vadim-on-github 
 * @changelog https://github.com/Krzysztof-Antosik/Two-Direction-Sticky-Sidebar/blob/main/CHANGELOG.md
 * @link    https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/
 *
 *
 */


/**
 * StickySidebar.js - Optimized & Documented Version
 * High-performance sticky sidebar logic using requestAnimationFrame.
 */

(() => {
    // 1. SELECTOR: Find the element with the data-sticky="true" attribute.
    const stickyElement = document.querySelector(`[data-sticky="true"]`);
    
    // Safety check: if the element doesn't exist, stop execution immediately.
    if (!stickyElement) return;

    /**
     * STATE OBJECT: Centralized storage for variables to avoid global scope pollution
     * and frequent DOM reads (which are expensive for performance).
     */
    let state = {
        topGap: 0,              // Distance from the top edge of the viewport.
        bottomGap: 0,           // Distance from the bottom edge of the viewport.
        mobileWidth: 0,         // Breakpoint below which stickiness is disabled.
        stickyElementHeight: 0, // Current height of the sidebar.
        screenHeight: 0,        // Current height of the browser window.
        currPos: window.scrollY,// Tracks the previous scroll position to detect direction.
        lastTopValue: 0,        // Cached numeric value of the 'top' CSS property.
        isScrolling: false      // Flag to prevent multiple function calls per frame.
    };

    /**
     * INITIALIZATION: Reads attributes and sets up the starting values.
     */
    function initSettings() {
        // Calculate initial top position relative to the document.
        const startPosition = stickyElement.getBoundingClientRect().top + window.scrollY;
        
        // Use Dataset API for cleaner attribute access.
        const { topGap, bottomGap, mobileWidth } = stickyElement.dataset;

        // Parse values: handle "auto" for topGap and ensure others are valid numbers.
        state.topGap = topGap === "auto" ? startPosition : (parseInt(topGap) || 0);
        state.bottomGap = parseInt(bottomGap) || 0;
        state.mobileWidth = parseInt(mobileWidth) || 0;
        
        // Initial measurement of dimensions.
        updateDimensions();
        // Check if we should apply sticky behavior based on screen width.
        checkMobileStatus();
    }

    /**
     * UPDATE DIMENSIONS: Refreshes height values (called on resize/load).
     */
    function updateDimensions() {
        state.screenHeight = window.innerHeight;
        state.stickyElementHeight = stickyElement.offsetHeight;
    }

    /**
     * MOBILE CHECK: Resets or applies styles based on the viewport width.
     */
    function checkMobileStatus() {
        if (window.innerWidth <= state.mobileWidth) {
            // Remove all inline styles if on mobile to restore natural flow.
            stickyElement.removeAttribute('style');
            return false;
        }
        // Basic sticky setup for desktop.
        stickyElement.style.position = 'sticky';
        stickyElement.style.height = 'fit-content';
        return true;
    }

    /**
     * CORE LOGIC: Calculates the dynamic position of the sidebar.
     * Triggered inside requestAnimationFrame for maximum smoothness.
     */
    function positionSidebar() {
        // Skip logic if we are below the mobile breakpoint.
        if (window.innerWidth <= state.mobileWidth) return;

        const scrollY = window.scrollY;
        // Difference in scroll since the last frame.
        const scrollDelta = state.currPos - scrollY;
        // The "bottom limit" where the sidebar stops scrolling down.
        const endScroll = state.screenHeight - state.stickyElementHeight - state.bottomGap;

        // CASE A: The sidebar is shorter than the viewport.
        // It acts like a standard CSS sticky element.
        if (state.stickyElementHeight + state.topGap + state.bottomGap <= state.screenHeight) {
            state.lastTopValue = state.topGap;
        } 
        // CASE B: The sidebar is taller than the viewport.
        // It must scroll with the user until its top/bottom edge is reached.
        else {
            let newTop = state.lastTopValue + scrollDelta;

            if (scrollY < state.currPos) { 
                // USER SCROLLING UP: Sidebar moves up but stops at topGap.
                newTop = Math.min(state.topGap, newTop);
            } else { 
                // USER SCROLLING DOWN: Sidebar moves down but stops at endScroll.
                newTop = Math.max(endScroll, newTop);
            }
            state.lastTopValue = newTop;
        }

        // Apply the calculated position to the DOM.
        stickyElement.style.top = `${state.lastTopValue}px`;
        
        // Store current scroll for the next frame's comparison.
        state.currPos = scrollY;
        // Reset flag so the next scroll event can trigger an animation frame.
        state.isScrolling = false;
    }

    /**
     * SCROLL HANDLER: Throttles the scroll event using requestAnimationFrame.
     * This prevents the browser from recalculating styles more than 60 times/sec.
     */
    const onScroll = () => {
        if (!state.isScrolling) {
            state.isScrolling = true;
            requestAnimationFrame(positionSidebar);
        }
    };

    /**
     * EVENT LISTENERS
     */
    
    // Resize handling: update measurements and re-check mobile status.
    window.addEventListener('resize', () => {
        updateDimensions();
        if (checkMobileStatus()) positionSidebar();
    });

    // Scroll handling: use 'passive: true' to improve mobile performance.
    document.addEventListener('scroll', onScroll, { passive: true });

    /**
     * STARTUP
     */
    initSettings();
    positionSidebar();
})();