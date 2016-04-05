# Object-Oriented Javascript

4.4 Update

定义类的三种方式，传送门：

* **[Constructor + prototype](#constructor)** （经典方法，功能完善，编写复杂）

* **[Object.create()](#create)** （简洁，功能不全面）

* **[Minimalist approach](#minimalist)** （优雅的新方法，便于部署传统的OOP特性）

## Introduction to Object

#### 1. 对象的原始封装：

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

- 缺点：一是如果多生成几个实例，写起来会非常麻烦；二是没有类的原型。


#### 2. 原始封装的改进：struct

用函数，返回一个生成的对象：
```
function Cat (name, color) {
    return { name:name, color:color}
}

var cat1 = Cat("喵酱", "white");
var cat2 = Cat("Bakane", "black");
```

- 可以将其理解为一个有构造函数的struct，并不是class


## <a name="constructor">Constructor + Prototype</a>

### 1. Encapsulation 

#### (1) Constructor

JavaScript提供了一个Constructor函数模式，函数内使用`this`变量。

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

- 每个实例对象都是原型对象的一个instance。

- 这样声明，每个`Cat`对象都实例化了相同的`eat`函数对象，造成显而易见的内存浪费。因此，需要把共有函数挪进prototype。

#### (2) Prototype

每个Constructor原型对象都有一个prototype属性，指向一个prototype对象。

这个prototype的所有属性和方法，都会被实例对象继承。

```javascript
function Cat (name, color) {
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "喵科动物";
Cat.prototype.eat = function() { alert("eat cupcakes") };

// *说人话：
miao = new Cat("喵酱", "black");
console.log(Cat.prototype.eat === miao.eat()); // true
```

此处可将prototype理解为成员函数与static成员变量

类似于CPP，在编译时，成员函数存储在类的公用内存中，每个对象所占用的空间只是成员变量所占用的存储空间。（*）

// 省出这么多内存觉得自己整个人都有钱了（挺胸

### 2. Inheritance

#### (1) 普通继承

父类与子类定义如下：

```
function Animal () { 
    this.species = "animal";
}

function Cat (name, color) {
    this.name = name;
    this.color = color;
}
```

将Cat的prototype对象指向Animal实例：

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

- 原理：JavaScript中，每个prototype对象也都有一个constructor属性，指向它的构造函数。生成实例对象时，默认调用其prototype对象的constructor。

- 执行第一行后，Cat.prototype的constructor指向了Animal。

- 因此在第二行修正Cat的constructor，使Cat的constructor还是Cat，prototype则是Animal

- 缺点：每次继承时需要实例化一个父类对象，当父类对象较大，甚至父类上方有多层继承时，占用的内存十分可怕。

#### (2) 直接继承prototype

为解决上述问题，将父类需要被继承的属性直接写进prototype，此时父类的prototype相当于abstract class：

```
function Animal() { }
Animal.prototype.species = "animal";

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```

优点：解决了内存浪费的问题

隐患：Animal.prototype和Cat.prototype指向同一个prototype对象，造成了浅拷贝

#### (3) 利用空对象作为中介

另一种解决(1)中内存问题的思路：

```
function extend (Child, Parent) {
    var F = function() { };                // create an empty object
    F.prototype = Parent.prototype;        // copy prototype
    Child.prototype = new F();             // inherit prototype
    Child.prototype.constructor = Child;
}
```

- F是空对象，所以几乎不占内存

- 此时修改子类对象的prototype，不会影响父类的prototype

- 以上为YUI库的继承原理


#### (4) 拷贝继承

另一种思路，把父类prototype中的所有属性和方法，都拷贝给子类prototype：

（注意：用递归方式对所有object进行深拷贝）

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

- 以上为jQuery库的继承原理

## <a name="create">Object.create()</a>

```
var Cat = {
    name: "逗比喵",
    makeSound: function(){ alert("汪"); }
};
var cat1 = Object.create(Cat);
```

比"构造函数法"简单，但是不能实现私有属性和私有方法，实例对象之间也不能共享数据，对"类"的模拟不够全面。

## <a name="minimalist">Minimalist Spproach</a>

极简主义写法：实现私有变量、同一个类的实例对象共享数据（你再说javascript不是魔幻语言？(:з」∠)

### 1. Encapsulation

```
var Cat = {
    createNew: function(){
        var cat = {};
        cat.name = "喵酱";
        cat.makeSound = function(){ alert("诶呀妈呀"); };
        return cat;
    }
};
var cat1 = Cat.createNew();
cat1.makeSound();  // "诶呀妈呀"
```

### 2. Private fields & methods

在createNew()中，只要不是定义在cat上的方法和属性，都是私有的。

```
var Cat = {
    createNew : function() {
        var cat = {};
        var sound = "嗷";  // private field
        cat.makeSound = function() { alert(sound); }  // public method
        return cat;
    }
};
```
外部无法直接访问sound
```
var cat1 = Cat.createNew();
alert(cat1.sound);   // 无法访问
cat.makeSound();     // "嗷"
```

### 3. Fields sharing

使所有实例对象能够读写同一项内部数据，则将这个内部数据封装在类对象里、createNew()方法外面

```
var Cat = {
    sound : "喵", // private
    createNew: function(){
        var cat = {};
        cat.makeSound = function(){ alert(Cat.sound); }; // public
        cat.changeSound = function(x){ Cat.sound = x; }; // public
        return cat;
    }
};
```
一个实例对象修改了数据，另一个实例也会受影响，因为它们调用的sound的reference指向同一个object
```
var cat1 = Cat.createNew();
var cat2 = Cat.createNew();
cat2.changeSound("哒哒哒~");
cat1.makeSound();  // "哒哒哒~"
```

原理等同于：不同对象之间通过浅拷贝共享数据
