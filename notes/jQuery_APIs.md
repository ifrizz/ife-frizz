# jQuery

Frequently used jQuery APIs

## Basis

### jQuery Syntax

```
$(selector).action 
```

这个语法糖封装了HTML DOM method:

```
document.querySelectorAll(CSS selectors)
```

### Document Ready Event

等同于<立即执行函数>

* `$(document).ready( function { });`

* `$(function(){});` ——简写版

### jQuery Selectors

* `$("p")`  -  选择所有 `<p>` ，等同于 `document.getElementsByTagName("p")`

* `$(".class")` - 选择所有 `class="class"`，等同于 `document.getElementsByClassName("class")`

* `$("#id")` - 选择所有`id="id"` 等同于 `document.getElementById("id")`

* `$("*")` - 选择所有elements，等同于`document.getElementsByTagName("*")`

* `$("p.intro")` - 选择所有'class="intro"'的 `<p>`，等同于`document.querySelectorAll ("p.intro")`

* `$("p.first")` - 选择第一个 `<p>` ，等同于`document.getElementByTagName("p")[0]`

传入的参数CSS Selector，在CSS中使用的语句都可以用。Examples:
```
$("ul li:first")
$("ul li:first-child")
$("[href]")
$(":button")
$("tr:even")
$("tr:odd")
```

## jQuery Event Methods

### Events:

* Mouse: `click`, `dblclick`, `mouseenter`, `mouseleave`

* Keyboard: `keypress`, `keydown`, `keyup`

* Form: `submit`, `change`, `focus`, `blur`

* Doc/Window: `load`, `resize`, `scroll`, `unload`

### Methods:
```
$("#id").click( function(){ });
```
原型: 
```
Document.getElementById("id").onclick( function() { });
```



## Effects

重要的话要放在前面——show/hide、fade、animate的区别：

共同点：hide，fadeOut，animate都可以用来处理渐隐

区别：

* `show`/`hide`：更改element的长宽和透明度，渐隐时，所占的空间逐渐缩小。

* `fadeIn`/`fadeOut`：仅更改透明度，在最后一帧更改为`display:none`。渐隐中大小不变，结束时啪嗒一下消失。

* `animate`：仅改变透明度，所占空间始终不变。用于需要保留消失物体位置的情况。

### Hide and Show
```
$(selector).hide(speed, callback);
$(selector).show(speed, callback);

@ param
  speed: "slow" "fast" or milliseconds
  callback: function to be executed after method (optional)
```

### Toggle

Show elements that are hidden; hide elements that are shown
```
$(selector).toggle(speed, callback)
```

### Fading
```
fadeIn(speed, callback)
fadeOut(speed, callback)
fadeToggle(speed, callback)
fadeTo(speed, opacity, callback)
```

### Sliding
```
slideDown (speed, callback)
slideUp (speed, calback)
slideToggle (speed, callback)
```

### Animation
```
$(selector).animate( {params}, speed, callback );

@ {params}: CSS properties
* Multiple params:   { left: '250px', opacity: '0.5' }
* Relative params:   { height: '+=150px', width: '+=150px' }
```

Play animations in a sequence:
```
div1.animate(...);
div2.animate(...);
```

Stop Animations
```
$(selector).stop(stopAll, goToEnd);
```



## jQuery HTML

### Get/Set Content
```
text() - text content of selected elem
html() - content of selected elem
val() - value of form fields
```


### Get Attributes

```
attr("href") - get the value of the href attribute
```

### Callback Function for DOM Methods
```
$(selector).text ( function(index, origText ) { });

@ param
  index      index of the current element in the list of elements selected
  origText   original value of element
```


### Add Elements
```
append(elems)                - inserts at the end of selected elems
prepend(elems)               - inserts at the beginning of selected elems
after(elems)                 - inserts after selected elems
before(elems)                - inserts before selected elems
```

### Remove Elements
```
remove()   - removes this
empty()    - removes this.child
```

### Manipulate CSS
```
addClass("className")        - adds one or more classes to this
removeClass("className")     - removes one or more classes from this
toggleClass("className")     - ...._(:з」∠)_
css("color:#eee")            - sets / returns the style attribute
```

### css() Method

Return a CSS property
``` 
$(selector).css("propertyname");
```

Set a CSS property
``` 
$(selector).css("propertyname", "value");
```

Set multiple properties
```
$(selector).css({"propertyname":"value", "propertyname":"value", ...});
```

### jQuery Dimension Methods
```
width()
height()
innerWidth()
innerHeight()
outerWidth(0
outerHeight()
```


## Traversing

### Ancestors
```
parent()
parents()            - returns all ancestors, all the way up to root element <html>
parents("ul")        - returns all ancestors that are <ul>
parentsUntil("div")  - returns all ancestors between this and a <div>
```

### Descendants
```
children()           - returns all direct children of this
find()               - returns all descendants of this // 什么鬼命名
```

### Siblings
```
siblings()
next()
nextAll()
nextUntil()
prev()
prevAll()
prevUntil()
```

### Filtering
```
first()             - returns the first element of selected elems
last()              - returns the last elem
eq(index)           - returns the elem with index
filter()            - specifies a criteria
not()               - returns all elems that doesnt match the criteria
```

## jQuery AJAX

### Loading
```
$(selector).load(URL, data, callback)

@ params
  URL: XML file path for example
  data: destination
```


### HTTP Request: GET & POST

……最后这部分挂了宽带网络的艺术生表示看不懂了，[传送门](http://www.w3schools.com/jquery/jquery_ajax_get_post.asp)

