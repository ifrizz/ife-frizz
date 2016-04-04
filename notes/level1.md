## 阶段一笔记

#### Task 1 - HTML

* Form中 `input` 和 `label` 的关系及对 accessibility 的考虑

#### Task 2 - CSS

* 对 inline 或者 table cell 的 box 可以用 `vertical-align` 进行垂直对齐
* `mid-width` 设置最小宽度，小于该宽度会产生 scroll bar

#### Task 3 - Three-column layout

* 左右两栏各 `float` to `left` or `right`，中间会自己填充

#### Task 4 - Centering

* 两种方法：Flexbox 和 position，详情见[相应笔记](./Centering.md)。

#### Task 5 - Two-column layout

* 讲了啥？（记得按时请吃药？）

#### Task 6 - Newspaper

* 如何实现 Piciture Overlay 黑科技（[笔记](./newspaper_layout.md)好贴心）
    * Parent set `relative`
    * Set Background image & fix height&width
    * Use `absolute` for overlay div
* 字体在不同浏览器/分辨率显示 bug 还未解决

#### Task 7 - One page show

* 咦没人做这个

#### Task 8 - Responsive grid layout

* `box-sizing` set to `border-box` to include padding & border (mainly for setting width and height)
    * Default: `box-sizing: content-box`
* 用 `[class*='col-']` 批量设置css
* 不同屏幕宽度用 `@media (min-width: 769px){...}` 来设置
    * 不同屏幕宽度的划分：[笔记](../010-xic-flexbox)

#### Task 9 - Complicated layout

#### Task 10 - Flexbox

* 教程
    * [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
    * [Learn CSS Layout](http://learnlayout.com/flexbox.html)
* [呆毛团队配色官方手册](../010-xic-flexbox)

```
.item1 { background: indigo }
.item2 { background: darkturquoise }
.item3 { background: gold }
.item4 { background: firebrick }
```

#### Task 11 - Web page layout

#### Task 12 - CSS3

* CSS动画，黑科技还不太懂 （[style.css](../012-wx-css/style.css)）

> 今天魔法少女喵同学还讲了阶段二（不对，阶段$\infty$）的几个 task，由于本人睡着了，详情请与其本人预约面授。