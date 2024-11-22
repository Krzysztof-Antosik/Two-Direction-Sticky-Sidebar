# Changelog

All notable changes to this project will be documented in this file.  
The changelog for versions prior to 1.6 will be added in the future.

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
Details for this version and earlier versions will be added in the future.