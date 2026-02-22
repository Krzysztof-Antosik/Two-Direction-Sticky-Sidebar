# Changelog

## [1.8.8] - 2026-02-22

### Added
- MutationObserver Integration: The sidebar now monitors its own data-attributes for live updates without page refresh.
- Auto-Injection Mechanism: Missing data-attributes are automatically populated with default values (0) upon initialization.
- Performance Optimization: Implemented requestAnimationFrame for smoother scrolling and reduced CPU overhead.

### Changed
- tandardized selector to [data-sticky-sidebar] with backward compatibility for [data-sticky="true"].
- Forced CSS priority using style.setProperty with !important to override external theme styles.

### Fixed
- Improved initialization logic to handle slow-loading dynamic content (images/ads).
- Eliminated layout thrashing during rapid window resizing or scrolling.

## [1.7.1] - 2024-11-22
### Changed
- Updated header comment.

### Fixed
- In some cases, the two-way sticky sidebar would not start automatically. This has been fixed

## [1.7] - 2024-11-22
### Added
- Introduced mobile optimization by disabling sticky behavior on screens narrower than 768px.
- Added functionality to dynamically update sticky behavior and styles upon viewport resizing.
- Implemented a new constant (`mobileWidth`) to define the mobile screen width threshold.

### Changed
- Improved overall code readability and maintainability by restructuring logic for gap calculations and style updates.
- Enhanced the `resize` event handler to manage both resizing and mobile optimization in a single flow.

### Fixed
- Resolved potential issues where sticky styles would persist incorrectly on mobile devices.
- Addressed inconsistent handling of inline styles when switching between sticky and non-sticky modes.

### Documentation
- Added detailed inline comments explaining the logic, functions, and purpose of each code section.
- Introduced this `CHANGELOG.md` file to track project updates and changes.

## [1.6] - 2023-07-06
### Added
- Author header to the files.

### Changed
- Renamed `.gitattribute` to `.gitattributes`.
- Updated the `.gitattributes` file with improved definitions.
- Tagged release as **v1.6**.

## [1.5] - 2022-05-09
### Fixed
- Enhanced performance for slow-loading pages and dynamically loaded content.

## [1.4] - 2022-04-15
### Added
- Capability to use gaps without additional CSS or specific attributes.

### Fixed
- Errors in positioning logic.
- Improved code efficiency.

### Changed
- Updated `README.md` and example files.
- Merged contributions adding new features.

## [1.3] - 2021-11-26
### Added
- Support for gaps between the top/bottom of the viewport and the sidebar.

### Changed
- Enhanced sidebar resizing behavior for different viewport sizes.
- Updated documentation with clearer examples.
- Rebuilt `StickySidebar.min.js`.

## [1.2] - 2021-08-18
### Fixed
- Minor bugs in the logic.
- Updated JSFiddle demo link for better demonstration.

## [1.1] - 2021-01-04
### Fixed
- Issues with sidebars smaller than the screen height.
- Typos in the code.

### Changed
- Updated `README.md` for clarity.
- Improved links in documentation for better usability.

## [1.0] - 2021-01-04
### Added
- Initial release of the sticky sidebar feature.
- Included examples and a comprehensive `README.md`.
