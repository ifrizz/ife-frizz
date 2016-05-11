## 笔记

> 用了flexbox实现，是参考[这个](https://kartikprabhu.com/articles/equal-height-images-flexbox)的，还蛮神奇

### CSS

> [standalone demo](http://codepen.io/weicliu/pen/EKMeEj)
> [flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

1. image resize with its container

```css
img{
	width:100%;
	height:auto;
}
```

2. set its container to `flex`

```css
.img-row{
	display:flex;
	/* centering */
	width: 80%;
  margin: auto;
}
```

3. set `flex-grow` to the weight (width/height ratio). (可以理解为每单位高度的宽度)

