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
 * @version 1.8.6
 * @author   Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @contributors Krzysztof-Antosik, vadim-on-github 
 * @changelog https://github.com/Krzysztof-Antosik/Two-Direction-Sticky-Sidebar/blob/main/CHANGELOG.md
 * @link     https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/
 * @demo     https://tdss.antosik.dev/
 *
 */

(() => {
    'use strict';

    const initStickySidebar = () => {
        // Support both the new selector and the legacy version used in the demo
        const stickyElement = document.querySelector('[data-sticky-sidebar]') || 
                             document.querySelector('[data-sticky="true"]');
        
        if (!stickyElement) return;

        /**
         * INTERNAL STATE
         * Caching values to avoid "Layout Thrashing" and ensure high performance.
         */
        const state = {
            topGap: 0,
            bottomGap: 0,
            mobileWidth: 0,
            sidebarHeight: 0,
            viewportHeight: 0,
            currentScrollY: window.scrollY,
            lastComputedTop: 0,
            isTicking: false
        };

        /**
         * INITIALIZATION
         * Reads data-attributes and establishes initial state.
         */
        function init() {
            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            
            // Calculate initial top for 'auto' mode correctly based on current scroll
            const initialRectTop = rect.top + window.scrollY;

            // Default values to 0 if not explicitly provided
            state.topGap = data.topGap === 'auto' ? initialRectTop : (parseInt(data.topGap) || 0);
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        }

        /**
         * METRICS UPDATE
         * Refreshes height and viewport measurements.
         */
        function updateMetrics() {
            state.viewportHeight = window.innerHeight;
            state.sidebarHeight = stickyElement.offsetHeight;
        }

        /**
         * STYLE APPLICATION
         * Sets initial CSS properties and forces priority via !important.
         */
        function applyInitialStyles() {
            if (window.innerWidth > state.mobileWidth) {
                stickyElement.style.position = 'sticky';
                stickyElement.style.height = 'fit-content';
                state.lastComputedTop = state.topGap;
                
                // Using !important to override CSS conflicts (like top: 0 in stylesheets)
                stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            } else {
                // Clear styles if below the mobile breakpoint
                stickyElement.style.removeProperty('position');
                stickyElement.style.removeProperty('height');
                stickyElement.style.removeProperty('top');
            }
        }

        /**
         * POSITIONING ENGINE
         * The core logic for two-direction scrolling.
         */
        function positionSidebar() {
            if (window.innerWidth <= state.mobileWidth) return;

            const newScrollY = window.scrollY;
            const scrollDelta = state.currentScrollY - newScrollY;
            const bottomLimit = state.viewportHeight - state.sidebarHeight - state.bottomGap;

            // If sidebar fits within the viewport, it acts as a simple sticky element
            if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                state.lastComputedTop = state.topGap;
            } 
            // If sidebar is taller than the viewport, calculate dynamic top
            else {
                let targetTop = state.lastComputedTop + scrollDelta;

                if (newScrollY < state.currentScrollY) { 
                    // Scrolling Up
                    targetTop = Math.min(state.topGap, targetTop);
                } else { 
                    // Scrolling Down
                    targetTop = Math.max(bottomLimit, targetTop);
                }
                state.lastComputedTop = targetTop;
            }

            // Apply computed position with high priority
            stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            
            state.currentScrollY = newScrollY;
            state.isTicking = false;
        }

        /**
         * EVENT HANDLERS
         */
        
        // Throttled scroll using requestAnimationFrame for smooth 60fps performance
        const onScroll = () => {
            if (!state.isTicking) {
                state.isTicking = true;
                requestAnimationFrame(positionSidebar);
            }
        };

        const onResize = () => {
            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        // Run the logic
        init();
    };

    /**
     * BOOTSTRAPPER
     * Ensures execution as soon as the DOM is ready.
     */
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initStickySidebar();
    } else {
        document.addEventListener("DOMContentLoaded", initStickySidebar);
    }

    // Secondary refresh once all external assets (images/ads) are loaded
    window.addEventListener("load", () => {
        window.dispatchEvent(new Event('resize'));
    });

})();