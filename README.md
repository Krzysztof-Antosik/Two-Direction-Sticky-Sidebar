# Two Direction Sticky Sidebar
**Bi-directionally scrolling sticky sidebar in pure JavaScript for use in any project**

A short JavaScript code that allows you to quickly and easily implement a Sticky Sidebar, if the browser's viewport is too short, sidebar's contents will scroll  in the direction the user scrolls and sticks to either top or bottom of the screen when there's no more content. And everything with the use of pure JavaScript, thanks to which you we'll save redundant code and gain efficiency.
![working of code](https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar/blob/main/sticky-sidebar.png?raw=true)

I wrote code to use in my own project. All ready-made solutions used jQuery or had a lot of unnecessary code.
I share it because it may be useful to someone. I allow it to be freely modified. Perhaps I will extend the script in the future.

you can read more about the project in my article (in Polish): [Two Direction Sticky Sidebar – JavaScript - Antosik.dev](https://antosik.dev/projekty/two-direction-sticky-sidebar/)

## Usage

This is the use of this script you must add attribute: `data-sticky ="true"` to your Sidebar.

If you want to optionally set gaps over or under the Sidebar you can use additional attributes:`data-top-gap="20" data-bottom-gap="20"`.

You can also add the `data-mobile-width` attribute to Sidebar. If you set it, for example: `data-mobile-width="768"` the script will stop working when the screen is smaller than 768px. This allows for greater control over the responsiveness of the page.

P.S. Only one element can be used so far

### Example

    <aside data-sticky="true" data-top-gap="20" data-bottom-gap="20" data-mobile-width="768">
*[A working demo](https://tdss.antosik.dev/)*

## Changelog

You can view the full changelog [here](CHANGELOG.md).

### Recent Updates
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
