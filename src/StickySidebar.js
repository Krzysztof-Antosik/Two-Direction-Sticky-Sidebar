/**
 * StickySidebar.js
 * Optimized version with Live Attribute Monitoring (MutationObserver).
 *
 * @version 1.8.8
 * @author   Krzysztof Antosik, https://github.com/Krzysztof-Antosik/
 * @changelog https://github.com/Krzysztof-Antosik/Two-Direction-Sticky-Sidebar/blob/main/CHANGELOG.md
 * @link     https://github.com/Krzysztof-Antosik/Two-direction-Sticky-Sidebar/
 * @demo     https://tdss.antosik.dev/
 */

(() => {
    'use strict';

    const initStickySidebar = () => {
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

        // Reads attributes and updates the internal state
        function updateFromAttributes() {
            const data = stickyElement.dataset;
            const rect = stickyElement.getBoundingClientRect();
            const initialRectTop = rect.top + window.scrollY;

            state.topGap = data.topGap === 'auto' ? initialRectTop : (parseInt(data.topGap) || 0);
            state.bottomGap = parseInt(data.bottomGap) || 0;
            state.mobileWidth = parseInt(data.mobileWidth) || 0;

            // Immediate re-apply
            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        }

        function init() {
            // Force inject defaults if missing
            if (!stickyElement.hasAttribute('data-top-gap')) stickyElement.setAttribute('data-top-gap', '0');
            if (!stickyElement.hasAttribute('data-bottom-gap')) stickyElement.setAttribute('data-bottom-gap', '0');
            if (!stickyElement.hasAttribute('data-mobile-width')) stickyElement.setAttribute('data-mobile-width', '0');

            updateFromAttributes();
            setupObserver();
        }

        /**
         * MUTATION OBSERVER
         * Watches for changes in data-attributes and triggers update
         */
        function setupObserver() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName.startsWith('data-')) {
                        updateFromAttributes();
                    }
                });
            });

            observer.observe(stickyElement, { attributes: true });
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
                    targetTop = Math.min(state.topGap, targetTop);
                } else { 
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

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            updateMetrics();
            applyInitialStyles();
            positionSidebar();
        });

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