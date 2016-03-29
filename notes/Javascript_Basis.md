# JavaScript Basis
细节笔记，自用

## IIFE
[Immediately-Invoked Function Expression](https://link.zhihu.com/?target=http%3A//benalman.com/news/2010/11/immediately-invoked-function-expression/%23iife)
```JavaScript
(function(){ 
    ...  
})();
```
- Javascript这个小妖精没有`private`，所有变量都是全局变量，容易被别人的同名变量覆盖掉。
- <立即执行函数>将匿名函数封装为一个容器，内部可以访问外部变量，外部不能访问容器的内部变量。
- 相当于`namespace`

## Loop through arrays
**Old-fashioned `for` loop**

- Please please don't use old-fachioned for loop if you can use foreach -- oop professor

**ForEach**

```JavaScript
array.forEach( function(item) {
    ...
});
```

**for-of**

```JavaScript
for (item of array) {
    ...
}
```

**for-in**

- Must add safeguards （舒肤佳（划掉
- This is too 有病, dont use it （此处应使用东北英语

```JavaScript
for (key in array) {
    if (arrayHasOwnIndex(array, key)) {
        ...
    }
}
```

## HashMap

```JavaScript
var array;
array["key"] = "data";
```

——快看我望着脚本语言的惊愕神情（你咬我呀
