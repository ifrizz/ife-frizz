# Centering

* [Advanced CSS](http://www.w3cplus.com/css/advanced-html-css-lesson2-detailed-css-positioning.html): Advanced CSS for positioning

## Two ways of centering

**Using Flexbox**

* Wrap the current block item in a parent block

* Set the CSS of the parent block
 * `width`, `height`: 100%
 * `display`: flex
 * `justify-content`: center
 * `align-item`: center

* Set the CSS of the child block
 * `position`: relative


**Using positioning**

* `top`: 50%
* `left`: 50%
* `margin-top`: $- \frac{height}{2} - padding$
* `margin-left`: $- \frac{width}{2} - padding$
