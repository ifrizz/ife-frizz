## Javacript  : this
---

`this` 是动态指定的，取决于方法被调用的`object`， 而不是`this`被声明时所在的`object`. 

`this`使用不正常的情况


###1. 调用的object与预想的不同 
```
$("gfw").click(byr.coding);  //byr.coding 中的this不是byr
```
解决方法用`bind`方法改变 context 
```
$("gfw").click(byr.coding.bind(byr));  //我是byr我骄傲 
```
良心教程 [有关于bind call apply][1]  


###2.当this使用在一个匿名函数中当作值传递时
`this` inside the anonymous function cannot access the outer function's `this`, so it is bound to the global window object. When use in `strict mode`, `this` holds the value of undefined in global functions and in anonymous functions that are not bound to any object.

``` 
var daddy = "window";
var byrSon = {
               daddy  : "byr", 
               backHome : function( baby ){
                     baby();
               },
               coding : function(){
                     this.backHome(function () {
                          console.log(this.daddy);   //this : object Window
                     });
               }
            }             //byr 回家后听到 baby 叫daddy 叫错了w

```
解决方法
```
   var daddy = "window";
   var byrSon = {
                   daddy  : "byr", 
                   backHome : function( baby ){
                         baby();
                   },
                   coding : function(){
                         var mySon = this;
                         this.backHome(function () {
                              console.log(mySon.daddy);   //this : byrSon
                         });
                   }
                }             //这次叫对了
```
###3.某object的function被赋予全局变量
```
var daddy = "window";
var byrSon = {
               daddy  : "byr", 
               cry : function(){
                    console.log(this.daddy);
               }
            };   
var whosYourDaddy = byrSon.cry;
whosYourDaddy();  //嘴长在了别人的身上
```
解决方法
```
var whosYourDaddy = byrSon.cry.bind(byrSon);  //bind 以后就好啦
whosYourDaddy();
```
###4.Borrow method
用于从别的`object`借方法来用
```
var oldWang = {
     name : "老王"
}

var bob = {
     name : "小头爸爸",
     Daddy : function(){
            console.log(this.name);
      }
}

oldWang.Daddy = bob.Daddy.bind(oldWang);
oldWang.Daddy();   // 会输出老王

//call 和 apply 也可以
bob.Daddy.call(oldWang);
bob.Daddy.apply(oldWang);
```



[1]: http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/