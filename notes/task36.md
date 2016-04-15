# Task 36 Notes

## Module

* Use `get() / set()` function to deal with primitive variables in closure

## Array

#### splice


```
arr.splice(index, deleteCount, item1, ..., itemX)
```
* `index`: 起始坐标

 * 如果index大于数组长度，自动设为数组长度
 
 * 负数表示从后向前的index
 
* `deleteCount`: 从起始坐标开始要删除的元素个数

 * 如果省略，自动设为length - start，即start后面全删掉
 
* `items`: 添加的新元素们


**魔幻用法**：Inplace swap `arr[x]` and `arr[y]`:

`arr[x] = arr.splice(y, 1, arr[x])[0];

#### slice

```
arr.slice(begin, end);
```
获得数组最后一个元素：

`arr1 = arr.slice(-1);  // equals to -> arr.slice(arr.length, -1)`

# DOM相关

## Costume Events

Create event:
```
var event = new CustomEvent('eventName', {'detail': "miaomiaomiao"});
```
Dispatch event:
```
$element.dispatchEvent(event);
```

EventListener:
```
$element.addEventListener('eventName', function(e){
    console.log(e.detail); // miaomiaomiao
});
```

## TextArea光标位置

`$editor.selectStart`

修改位置的时候需要同时修改:

`$editor.selectEnd`

## Scroller定位

Scroller位置：即页面滚动后，窗口顶端以上被隐藏掉的高度(px)

`$container.scrollTop`

滚动到container内某个div的位置：

`$container.scrollTop = $div.offsetTop`

## 获取DOM大小

* `$DOM.clientHeight`: includes padding

* `$DOM.offsetHight`: includes padding, scrollbar and borders

## 获取DOM的左上角坐标

```
function getContainerPosition() {
    var e = container;
    var offset = {x:0, y:0};
    while (e) {
        offset.x += e.offsetLeft;
        offset.y += e.offsetTop;
        e = e.offsetParent;
    }
    return offset;
}
```

## 获取鼠标坐标

（只对和mouse相关的event有效）

* `e.clientX`

* `e.clientY`
