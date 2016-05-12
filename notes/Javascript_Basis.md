# JavaScript Basis
细节笔记，自用

## IIFE
[Immediately-Invoked Function Expression](https://link.zhihu.com/?target=http%3A//benalman.com/news/2010/11/immediately-invoked-function-expression/%23iife)
```JavaScript
(function(){ })();
```
- Javascript这个小妖精没有`private`，所有变量都是全局变量，容易被别人的同名变量覆盖掉。
- <立即执行函数>将匿名函数封装为一个容器，内部可以访问外部变量，外部不能访问容器的内部变量。
- 相当于`namespace`

## Loop through arrays
Please please don't use old-fachioned for loop if you can use foreach -- oop professor

**ForEach**: Available only for looping in Array objects.

```JavaScript
array.forEach( function(item) { });
```

**for-in**: Loop through properties of an object

```JavaScript
for (key in array) { }
```

Equivalent to this in java:
```Java
for (key : map.keyset()) { }
```

**for-of**: New feature. Works only on collections with `[iterator]` property

```JavaScript
for (item of array) { }
```


## Array

```JavaScript
var array;
array["key"] = "data";
```
——快看我望着脚本语言的惊愕神情（你咬我呀

```
var arr = [];
arr["a"] = 1; arr["b"] = 2; arr["c"] = 3;
console.log(arr.length);
```
此时输出 arr.length = 0

因此这个array无法用传统`for-loop`和`forEach`来遍历，请使用`for-in`

```
var arr = [];
arr[100] = "item";
arr.length;     // arr.length = 101
sizeof(arr);    // sizeof(arr) = 1
```

`array.length`在每次向数组插入元素时更新，数值比最大index多1

`sizeof(array)`返回array中实际的元素个数

* more array methods: `push()`, `pop()`, `sort()`, `slice()`, `splice()`

## Details

**== vs. ===**

- `==`: convert different types before comparing 
- `===`: doesn't convert types. if two objects have different types, they are not equal.

```javascript
console.log(1 == "1"); // true
console.log(1 === "1"); // false

```

## 获得div坐标
 * `$(div).getBoundingClientRect()`: left, right, top, bottom
 * div内的img在加载之前没有高度，若需要占位可手动设置div的height

## 宽度、高度变量
 * `offsetWidth`, `offsetHeight`: The size of the visual box incuding all borders. Can be calculated by adding width/height and paddings and borders, if the element has display: block
 * `clientWidth`, `clientHeight`: The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.
 * `scrollWidth`, `scrollHeight`: The size of all of the box's content, including the parts that are currently hidden outside the scrolling area. Can not be calculated directly from CSS, depends on the content. 
 * ![img](http://ww2.sinaimg.cn/mw690/5bbd69a3gw1f3smfeb02bj20ib0gbn3i.jpg)
