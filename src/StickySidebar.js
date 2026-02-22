/**
 * StickySidebar.js
 * A lightweight, high-performance vanilla JavaScript library for two-direction sticky sidebars.
 * * This script allows a sidebar to scroll with the page and stick to the top or bottom 
 * boundaries of the viewport, even if the sidebar is taller than the screen.
 *
 * @version 1.8.5
 * @author Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @license MIT
 */

(() => {
    'use strict';

    const initStickySidebar = () => {
        // Selector changed to data-sticky-sidebar for better naming convention
        const stickyElement = document.querySelector('[data-sticky-sidebar]');
        if (!stickyElement) return;

        // Internal state to cache dimensions and positions
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
         * Reads data-attributes and sets up initial styles.
         */
        function init() {
            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            
            // Calculate initial position relative to document for 'auto' mode
            const initialRectTop = rect.top + window.scrollY;

            // Defaults to 0 if attributes are missing
            state.topGap = data.topGap === 'auto' ? initialRectTop : (parseInt(data.topGap) || 0);
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            updateMetrics();
            applyStyles();
            positionSidebar();
        }

        /**
         * METRICS UPDATE
         * Refreshes height and viewport data.
         */
        function updateMetrics() {
            state.viewportHeight = window.innerHeight;
            state.sidebarHeight = stickyElement.offsetHeight;
        }

        /**
         * STYLE APPLICATION
         * Sets initial CSS for the sticky effect.
         */
        function applyStyles() {
            if (window.innerWidth > state.mobileWidth) {
                stickyElement.style.position = 'sticky';
                stickyElement.style.height = 'fit-content';
                state.lastComputedTop = state.topGap;
                stickyElement.style.top = `${state.lastComputedTop}px`;
            } else {
                stickyElement.style.position = '';
                stickyElement.style.height = '';
                stickyElement.style.top = '';
            }
        }

        /**
         * CORE LOGIC
         * Calculates the dynamic position based on scroll direction.
         */
        function positionSidebar() {
            if (window.innerWidth <= state.mobileWidth) return;

            const newScrollY = window.scrollY;
            const scrollDelta = state.currentScrollY - newScrollY;
            const bottomLimit = state.viewportHeight - state.sidebarHeight - state.bottomGap;

            // Scenario 1: Sidebar is shorter than viewport
            if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                state.lastComputedTop = state.topGap;
            } 
            // Scenario 2: Sidebar is taller than viewport
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

            stickyElement.style.top = `${state.lastComputedTop}px`;
            state.currentScrollY = newScrollY;
            state.isTicking = false;
        }

        // Event Listeners
        const onScroll = () => {
            if (!state.isTicking) {
                state.isTicking = true;
                requestAnimationFrame(positionSidebar);
            }
        };

        const onResize = () => {
            updateMetrics();
            applyStyles();
            positionSidebar();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        init();
    };

    // Execution
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initStickySidebar();
    } else {
        document.addEventListener("DOMContentLoaded", initStickySidebar);
    }

    // Refresh metrics once all assets (images/ads) are loaded
    window.addEventListener("load", () => {
        window.dispatchEvent(new Event('resize'));
    });

})();