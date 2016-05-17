## 笔记

---

* 获得div坐标
 * `$(div).getBoundingClientRect()`: left, right, top, bottom
 * div内的img在加载之前没有高度，若需要占位可手动设置div的height
* 宽度、高度变量
 * `offsetWidth`, `offsetHeight`: The size of the visual box incuding all borders. Can be calculated by adding width/height and paddings and borders, if the element has display: block
 * `clientWidth`, `clientHeight`: The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.
 * `scrollWidth`, `scrollHeight`: The size of all of the box's content, including the parts that are currently hidden outside the scrolling area. Can not be calculated directly from CSS, depends on the content. 
 * ![img](http://ww2.sinaimg.cn/mw690/5bbd69a3gw1f3smfeb02bj20ib0gbn3i.jpg)