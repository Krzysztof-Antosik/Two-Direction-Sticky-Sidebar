# Two Direction Sticky Sidebar
**Bi-directionally scrolling sticky sidebar in pure JavaScript for use in any project**

A short JavaScript code that allows you to quickly and easily implement a Sticky Sidebar, if the browser's viewport is too short, sidebar's contents will scroll  in the direction the user scrolls and sticks to either top or bottom of the screen when there's no more content. And everything with the use of pure JavaScript, thanks to which you we'll save redundant code and gain efficiency.
![working of code](https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar/blob/main/sticky-sidebar.png?raw=true)

I wrote code to use in my own project. All ready-made solutions used jQuery or had a lot of unnecessary code.
I share it because it may be useful to someone. I allow it to be freely modified. Perhaps I will extend the script in the future.

you can read more about the project in my article (in Polish): [Two Direction Sticky Sidebar - Antosik.dev](https://antosik.dev/projekty/two-direction-sticky-sidebar/)

## Usage

Using the script is straightforward. Simply add the `data-sticky-sidebar` attribute to your sidebar element:

`<aside data-sticky-sidebar></aside>`

This is the use of this script you must add attribute: `data-sticky ="true"` to your Sidebar.

Configuration via Data Attributes
The script automatically initializes with default values (0), but you can customize it directly in HTML using the following attributes:

`data-top-gap`: (Default: 0) Margin (in pixels) between the top of the viewport and the sidebar.

`data-bottom-gap`: (Default: 0) Margin (in pixels) between the bottom of the viewport and the sidebar.

`data-mobile-width`: (Default: 0) Screen width (in pixels) below which the sticky effect is disabled.

Example with custom settings:

`<aside data-sticky-sidebar data-top-gap="140" data-bottom-gap="40" data-mobile-width="1024"></aside>`

## Demo

*[A working demo](https://tdss.antosik.dev/)*

## Changelog

You can view the full changelog [here](CHANGELOG.md).

### Recent Updates
- **[1.8.8] - 2026-02-22**  
  - MutationObserver Integration: The sidebar now monitors its own data-attributes for live updates without page refresh.
  - Auto-Injection Mechanism: Missing data-attributes are automatically populated with default values (0) upon initialization.
  - Performance Optimization: Implemented requestAnimationFrame for smoother scrolling and reduced CPU overhead.
  - tandardized selector to [data-sticky-sidebar] with backward compatibility for [data-sticky="true"].
  - Forced CSS priority using style.setProperty with !important to override external theme styles. 
  - Improved initialization logic to handle slow-loading dynamic content (images/ads).
  - Eliminated layout thrashing during rapid window resizing or scrolling.

- **[1.7.1] - 2024-11-22**  
  - Updated header comment.
  - In some cases, the two-way sticky sidebar would not start automatically. This has been fixed.  

- **[1.7] - 2024-11-22**  
  - Added mobile optimization for sticky behavior.  
  - Fixed style persistence issues on mobile.  
  - Introduced detailed inline comments.  

## Download
Follow this [GitHub archive link](https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar/archive/main.zip)
or run in the terminal:

    $ git clone https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar.git
    
## Support

If you found a bug or would like to contribute to the development, please contact me:
[krzysztof@antosik.dev](mailto:krzysztof@antosik.dev) or use contact form on my website: [antosik.dev](https://antosik.dev/formularz-kontaktowy/)
