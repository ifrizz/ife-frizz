## DOM Guides

[**Events and the DOM**](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)

Three ways to register event listener

* `EventTarget.addEventListener('cli`

* HTML attribute eg. `onclick="..."`

* Dom element properties eg. `Button.onclick = function(e){...}`
    * `onclick` is a property of `GlobalEventHandlers` (a "mixin", review it later) -- commonly, there are several interfaces like `HTMLElement`, `Document`, or `Window`
    * `e` is an instance of  `Event` interface. One of its notable methods is `preventDefault()`

[**Examples**](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Examples)

```javascript
// #1 & 3
element.height
element.style.height/color/fontSize

// #2
// <input ... onclick="setBorderWidth(50);">

function setBorderWidth(width){
    element.style.borderWidth = width + "px";
}

// #4
var ss = document.styleSheets; // return a list of the stylesheets that have been loaded on that document

for(var i = 0; i < ss.length; i++) {
  for(var j = 0; j < ss[i].cssRules.length; j++) {
    dump( ss[i].cssRules[j].selectorText + "\n" );
  }
}

// #5 - Event Propagation
event.stopPropagation(); 
// 不会把对当前元素的事件传递到其父元素。（详见后面的 #Bubbling and capturing ）

// #6 - getComputedStyle
// 获得不是由css或者JS设置的styles (比如自动宽度等)
var elem1 = document.getElementById("elemId");
var style = window.getComputedStyle(elem1, null);

// this is equivalent:
// var style = document.defaultView.getComputedStyle(elem1, null);

// #8 - DOM Table Interface: use these; don't use innerHTML/createElement/appendChild...
* `table.insertRow`
* `tableRow.insertCell`
```

> 淘气三千问：`Window` 和 `Document` 有啥区别？
> 
> * `window` 是 root，最先被加载进浏览器的。
> * `document` 是被加载在 `window` 里面的，所以有 `document.document` == `window`
> * `document` 包括 html 等等，一般都是 DOM 操作的对象
> * 买一送一：`window.screen` 指的物理屏幕属性


### Events: Bubbling and capturing

**Bubbling**

* 给父元素添加点击事件 -> 点击任何一个子元素都会该触发
* 这是一个Bubbling的过程：触发`target`子元素的事件一层一层地对父元素触发，形象地表现为向上冒泡
* 如果父子元素都注册了这个事件，如果触发子元素，在冒泡的过程中，`event.target`始终为子元素，但`this`会随着bubbling的过程而变化。
* 用 `event.stopPropagation()` 来停止冒泡

**Capturing**

* 实际上 "event processing" 有两个阶段：先是 "captures down" 然后再 "bubbles up".
* 所有的 event handling 的方法都忽略了 Capturing 这个阶段（关着门哭...（谁叫你这么多事
* 我不服：`element.addEventListener(type, handler, *phase*)` 中 `phase = true` 来将handler设为capturing phase

> 动画DEMO戳[我](http://javascript.info/tutorial/bubbling-and-capturing)
