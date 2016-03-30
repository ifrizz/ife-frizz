# Object-Oriented Javascript

3.30 Update

- 上一版吐槽过于严重（喂）

- 添加：不同方法的使用场合（来自PO主人生经验）（大误）

- 添加：和其它语言的类比

- 标题难道不该是《Javascript OOP: A CPP Programmer's Perspective》

- 或者《JavaScript: 茴字的四种写法》

## Encapsulation

JavaScript是基于object的语言，万物皆对象。

它并不是真正的OOP语言，因为语法中没有class。

然而我们可以强行OOP，把property和method封装成一个对象。

### 1. 原始封装

将几个属性简单地封印在一个对象里：
```
var cat = {};           // create an empty object
cat.name = "喵酱";      // property
cat.color = "black";
```

也可以这样写：

```
var cat = { name: "喵酱", color: "black" };
```
- 优点：轻量级，适用于只封装一两个对象的情况

- 缺点：一是如果多生成几个示实例，写起来会非常麻烦；二是没有类的原型。


### 2. 原始封装的改进

用函数，返回一个生成的对象：
```
function Cat (name, color) {
    return { name:name, color:color}  // 妈呀这个constructor真是骨骼惊奇www
}

var cat1 = Cat("喵酱", "white");
var cat2 = Cat("Bakane", "black");
```

- 解决了代码重复的问题

- 缺点：不同Object之间仍然没有关联

- 可以将其理解为一个有构造函数的struct，并不是class


### 3. Constructor

开始了正经的面向对象。

JavaScript提供了一个Constructor函数模式，函数内使用了`this`变量（我们把它称为原型对象好了）

使用`new`运算符可以生成原型对象的实例。

```
function Cat (name, color) {
    this.name = name;
    this.color = color;
    this.eat = function() { alert("eat cupcakes"); };
}

var cat1 = new Cat("喵酱", "white");
alert ( cat1 instanceof Cat );        // true
```

- 看到`new`和`this`有没有觉得回到了故乡233

- 每个实例对象都是原型对象的一个instance，java的`instanceof`也可以在这里使用（回到了故乡！

- 缺点：每个`Cat`对象都实例化了相同的`eat`函数对象，造成显而易见的内存浪费。

// 哈哈哈哈活该谁让你万物皆对象wwww


### 4. Prototype

JavaScript中，所有Constructor原型对象都有一个prototype属性，指向一个prototype对象。

这个prototype的所有属性和方法，都会被实例对象继承。（// 搞的好像继承abstract class一样）

```
function Cat (name, color) {
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "喵科动物";
Cat.prototype.eat = function() { alert("eat cupcakes") };
```

此处可将prototype理解为成员函数与static成员变量

类似于CPP，在编译时，成员函数存储在类的公用内存中，每个对象所占用的空间只是成员变量所占用的存储空间。

// 省出这么多内存觉得自己整个人都有钱了（挺胸

## Inheritance

假设我们有一个`Animal`父类：

```
function Animal () {
    this.species = "animal";
}
```

有一个`Cat`子类：

```
function Cat (name, color) {
    this.name = name;
    this.color = color;
}
```

一大波Inheritance正在靠近。我们直接忽略掉已经没什么人用的语法糖，进入常见方法：

### 1. Use Prototype

将Cat的prototype对象指向Animal实例：

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

- 原理：JavaScript中，每个prototype对象也都有一个constructor属性，指向它的构造函数。生成实例对象时，默认调用其prototype对象的constructor。

- 执行第一行后，Cat.prototype的constructor指向了Animal。

- 因此我们在第二行修正Cat的constructor，使Cat的constructor还是Cat，prototype则是Animal

- 缺点：每次继承时需要实例化一个父类对象，当父类对象较大，甚至父类上方有多层继承时，占用的内存十分可怕。

### 2. 直接继承prototype

将父类需要被继承的属性直接写进prototype 

（野生abstract class君出现了！！！

```
function Animal() { }
Animal.prototype.species = "animal";

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```

优点：解决了内存浪费的问题

隐患：Animal.prototype和Cat.prototype指向同一个prototype对象，造成了浅拷贝

### 3. 利用空对象作为中介

```
function extend (Child, Parent) {
    var F = function() { };                // create an empty object
    F.prototype = Parent.prototype;        // copy prototype
    Child.prototype = new F();             // inherit prototype
    Child.prototype.constructor = Child;
}
```

- F是空对象，所以几乎不占内存

- 此时修改子类对象的prototype，不会影响父类的prototype（这里不太明白为什么不是浅拷贝……神奇的语法糖）

- 以上这种，是YUI库实现继承的原理


### 4. 拷贝继承

我们来换一种思路，把父类prototype中的所有属性和方法，都拷贝给子类prototype：

```
function extend (Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p)
        c[i] = p[i];
}
```

- 我书读得少你不要骗我，上面`c[i] = p[i]`的那步造成了浅拷贝

### 6. Deep Copy!

找到了魔幻的深拷贝继承233

用递归方式对所有object进行深拷贝：

```
function deepCopy(Child, Parent) {
    var Child = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy (p[i], c[i])
        } else {
            c[i] = p[i];
        }
    }
}

function extend(Child, Parent) {
    deepCopy (Child.prototype, Parent.prototype);
}

```

- 以上为jQuery库实现继承的原理（YUI党和jQuery党可以开始撕了

- 后面的extend函数是杜撰的，源码更冗长一些（思想感情差不多www
