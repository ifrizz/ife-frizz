# Flexbox

* [Flexbox](http://ife.baidu.com/task/detail?taskId=10): Used for the components of an application, and small-scale layouts.
* [Grid layout](http://ife.baidu.com/task/detail?taskId=8): Used for larger scale layouts

## Properties for flex containers

**`display`**

- Defines a flex container.

- `flex`: default.

- `inline-flex`: makes flex container display inline.


**`flex-direction`**

- How items are placed in the container.

- `row`: left to right (default)

- `row-reverse`: right to left

- `column`: top to bottom

- `column-reverse`: bottom to top



**`flex-wrap`**

- `nowrap`: all items will try to fit in single line (default)

- `wrap`: multi-line

- `war-reverse`: multi-line, right to left



**`flex-flow`** 

- Shorthand `flex-direction` and `flex-wrap` properties
- `flex-flow: <'flex-direction'> || <'flex-wrap'>`



**`justify-content`**

- ![](https://github.com/weicliu/ife-frizz/blob/master/010-xic-flexbox/notes/001-justify-content.jpg?raw=true)



**`align-items`**

- ![](https://github.com/weicliu/ife-frizz/blob/master/010-xic-flexbox/notes/002-align-items.jpg?raw=true)



**`align-content`**

- ![](https://github.com/weicliu/ife-frizz/blob/master/010-xic-flexbox/notes/003-align-content.jpg?raw=true)



## Properties for flex items

**`order`**

- The order in which items appear in the container



**`flex-grow`**

- The proportion of space taken by each item

- `flex-grow: <number>;`



**`flex-shrink`**

- The ability for an item to shrink (if necessary)

- `flex-shrink: <number>;`



**`align-self`**

- Override the default alignment specified by container's `align-items`
