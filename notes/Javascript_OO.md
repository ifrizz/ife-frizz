# Object-Oriented Javascript

（然而框架已经封装好了继承 你别闹了

## Encapsulation

**1. 原始方法**

缺点：
* 实例多了就完蛋辣！
* 实例与原型之间并没有什么关系

```
var Cat = { name:'', color:' ' };
var cat1 = {};
cat1.name = "喵酱";
cat1.color = "black";
```



**2. 改进方法**

缺点：两只猫之间并没有什么联系

```
function Cat (name, color) {
    return { name:name, color:color}  // 妈呀这个constructor真是骨骼惊奇www
}

var cat1 = Cat("喵酱", "white");
var cat2 = Cat("Bakane", "black");
```


**3. Use Constructor**

缺点：methods显而易见的内存浪费

// 哈哈哈哈活该谁让你连function都视为对象www 

```
function Cat (name, color) {
    this.name = name;
    this.color = color;
    this.eat = function() { alert("eat cupcakes"); };
}
var cat1 = new Cat("喵酱", "white");
alert ( cat1 instanceof Cat );  // 此刻我仿佛回到了故乡
```


**4. Use Prototype**
```
function Cat (name, color) {
    this.name = name;
    this.color = color;
}
Cat.prototype.type = "喵科动物";
Cat.prototype.eat = function() { alert("eat cupcakes") };
```
// 自带abstract class的语言真是太可怕了（喂

相关方法：
```
class.prototype.isPrototypeOf(object) : boolean
bobject.hasOwnProperty("property") : boolean
("property" in object) : boolean
```

## Inheritance

Suppose we have the parent class Animal:
```
function Animal () {
    this.species = "animal";
}
```

**1. Apply Constructor**

// 这是一颗已经没有什么人用的语法榴莲糖

```
function Cat (name, color) {
    Animal.apply (this, arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat ("喵酱", "white");
alert (cat1.species);  // "animal"
```

**2. Use Prototype**

最常见继承方式

将Cat的prototype对象指向Animal实例（果然是abstract class

```
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat
```
以上相当于cpp →
```
class A { }
class B : A { }
A* a = new B();
```

**3. 改进：直接继承prototype**

优点：不用实例化一个父类对象，在当父类上方有多层继承时相当不错ww

隐患：Animal.prototype和Cat.prototype指向同一对象，浅拷贝

```
function Animal() { }
Animal.prototype.species = "animal";
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
```



**4. 利用空对象作为中介**

空对象不含private fields，节约内存

```
function extend (Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;         // uber = super
}
```

**5. 拷贝继承**
```
function extend (Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p)
        c[i] = p[i];
    c.uber = p;
}
```
// 以上造成了浅拷贝，我书读得少你不要骗我

**6. 深拷贝**

找到了十分魔幻的深拷贝继承2333（jQuery中继承的实现方式
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
    return c;
}
```
