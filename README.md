# Two Direction Sticky Sidebar
**Bi-directionally scrolling sticky sidebar in pure JavaScript (ES6) and CSS3 for use in any project**

A short JavaScript code that allows you to quickly and easily implement a Sticky Sidebar, if the browser's viewport is too short, sidebar's contents will scroll  in the direction the user scrolls and sticks to either top or bottom of the screen when there's no more content. And everything with the use of pure JavaScript, thanks to which you we'll save redundant code and gain efficiency.
![working of code](https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar/blob/main/sticky-sidebar.png?raw=true)
*[source of the original picture](https://abouolia.github.io/sticky-sidebar/)*

I wrote code to use in my own project. All ready-made solutions used jQuery or had a lot of unnecessary code.
I share it because it may be useful to someone. I allow it to be freely modified. Perhaps I will extend the script in the future.

## Usage

This is the use of this script you must add attribute: `data-sticky ="true"` to your Sidebar.

If you want to optionally set gaps over or under the Sidebar you can use additional attributes:`data-top-gap="20" data-bottom-gap="20"`.

P.S. Only one element can be used so far

### Example

    <aside data-sticky="true" data-top-gap="20" data-bottom-gap="20">
*[A working example on JSFiddle](https://jsfiddle.net/antosik/kejofhtm/1/)*

## Download
Follow this [GitHub archive link](https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar/archive/main.zip)
or run in the terminal:

    $ git clone https://github.com/Antosik-dev/Two-direction-Sticky-Sidebar.git
    
## Support

If you found a bug or would like to contribute to the development, please contact me:
[krzysztof@antosik.dev](mailto:krzysztof@antosik.dev)
