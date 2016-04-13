# Task 13

* `+"123"` 魔性的将 string 转换成 int 的方法。（参考[这里](http://stackoverflow.com/questions/175739/is-there-a-built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number)）

* The `trim()` method returns the string stripped of whitespace from both ends.

* `NaN` -  a property of the global object, Not-A-Number // 又是一个魔性的东西
	* 每个 `NaN` 都不一样 （`NaN ===/== NaN` // both false）
	* `v !== v` 只对 `NaN` 为 true

* `isNaN()` 可用来判断是否为 Number


# Task 14

* `arr.sort([compareFunction])`
	* sort *in place* and also return the sorted array
	* 前方有坑！如果没有`compareFunction`，会全部转换成`String`来比较
	* compareFunction(a, b)返回值 `<0`: 把a排在前面（默认ascending order）；`=0`不变

````javascript
	var scores = [1, 10, 2, 21];
	scores.sort(); // [1, 10, 2, 21] - Unicode code point order
```

* 用到了 Arrow Function，类似于 lambda

* `filter()` // 跟Spark一样一样的

* 直接innerHTML就好了
