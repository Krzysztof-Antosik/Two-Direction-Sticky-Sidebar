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
 * @version 1.8.7
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
        // Target the sidebar element
        const stickyElement = document.querySelector('[data-sticky-sidebar]') || 
                             document.querySelector('[data-sticky="true"]');
        
        if (!stickyElement) return;

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
         * Injects attributes if missing and reads their values.
         */
        function init() {
            // Force inject attributes if they don't exist in HTML
            if (!stickyElement.hasAttribute('data-top-gap')) {
                stickyElement.setAttribute('data-top-gap', '0');
            }
            if (!stickyElement.hasAttribute('data-bottom-gap')) {
                stickyElement.setAttribute('data-bottom-gap', '0');
            }
            if (!stickyElement.hasAttribute('data-mobile-width')) {
                stickyElement.setAttribute('data-mobile-width', '0');
            }

            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            const initialRectTop = rect.top + window.scrollY;

            // Read values (now guaranteed to exist as attributes)
            state.topGap = data.topGap === 'auto' ? initialRectTop : (parseInt(data.topGap) || 0);
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        }

        function updateMetrics() {
            state.viewportHeight = window.innerHeight;
            state.sidebarHeight = stickyElement.offsetHeight;
        }

        function applyInitialStyles() {
            if (window.innerWidth > state.mobileWidth) {
                stickyElement.style.position = 'sticky';
                stickyElement.style.height = 'fit-content';
                state.lastComputedTop = state.topGap;
                
                // Use !important to override any CSS conflicts
                stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            } else {
                stickyElement.style.removeProperty('position');
                stickyElement.style.removeProperty('height');
                stickyElement.style.removeProperty('top');
            }
        }

        function positionSidebar() {
            if (window.innerWidth <= state.mobileWidth) return;

            const newScrollY = window.scrollY;
            const scrollDelta = state.currentScrollY - newScrollY;
            const bottomLimit = state.viewportHeight - state.sidebarHeight - state.bottomGap;

            if (state.sidebarHeight + state.topGap + state.bottomGap <= state.viewportHeight) {
                state.lastComputedTop = state.topGap;
            } else {
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

            stickyElement.style.setProperty('top', `${state.lastComputedTop}px`, 'important');
            
            state.currentScrollY = newScrollY;
            state.isTicking = false;
        }

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

        init();
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
        initStickySidebar();
    } else {
        document.addEventListener("DOMContentLoaded", initStickySidebar);
    }

    window.addEventListener("load", () => {
        window.dispatchEvent(new Event('resize'));
    });

})();