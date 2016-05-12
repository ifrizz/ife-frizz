## 笔记

> 用了flexbox实现，是参考[这个](https://kartikprabhu.com/articles/equal-height-images-flexbox)的，还蛮神奇

### CSS

> [standalone demo](http://codepen.io/weicliu/pen/EKMeEj), [flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

1\. image resize with its container

```css
img{
	width:100%;
	height:auto;
}
```

2\. set its container to `flex`

```css
.img-row{
  display:flex;
  /* centering */
  width: 80%;
  margin: auto;
}
```

3\.  set `flex-grow` to the weight (width/height ratio). (可以理解为每单位高度的宽度)

### keng（小吐槽

浏览器加载图片需要速度呀~ 所以说你写了一个 appendChild(img) 之后，图片并不会立马insert进去。也就是说，如果马上获取其parent DIV的大小的话其实是不对的。另外，如果你按顺序一个一个插入图片，但其实最后显示的效果也不是一个一个显示出来（感觉不大可能），因为图片加载的速度还取决于图片的大小等等，这个速度比for loop慢多了，所以这是不可控的。

一般在插入图片的时候都会通过一个placeholder图片来控制，另外也可以explictly设置parent div的height/width来「占位」。

大概是大家被搞烦了所以[这里](http://imagesloaded.desandro.com/)有一个判断image是否加载完成的JS库。

> JavaScript is all like "You images done yet or what?" (hehe

