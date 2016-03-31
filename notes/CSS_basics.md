# CSS

> [Getting started with CSS](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started)

## Intro
How it works
* The browser converts the markup language and the CSS into the *DOM*.

*Cascading* Style Sheets
* Browser's default styles
* Styles specified by the user
* Styles linked to the document by the author
  * external
  * def at the begining: used for styles only used on that page
  * on an element in the body: can be used for testing


## [Selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Selectors)

### Basics
```
selector { 
  //declaration inside
  property: value;
}
```
* Class selectors
* ID selectors


* Attribute selectors
  * use square brackets and put attr name inside
  * optionally followed by a matching operator and a value
  * `i` indicates it's case-insensitive (not fully supported by browsers)

```css
[diabled] [type='button']
[class~=key] /* one of the classes is exactly key (same as .key) */
[lang|=es] /* exactly or starts with es- */
[title*="example"] /* includes as a substring */
a[href^="https://"] /* starts with */
img[src$=".png"] /* ends with */
```
> More on [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors).

* Pseudo-classes selectors
  * `:hover`, `:focus`, `:visited`,`:nth-child`, `:checked`, etc.

### Precedence

Conflicting rules

1. more specific (eg. #id > .class/pseudo-classes/attribute > tag/pseudo-element)
2. equally specific: later in the stylesheet

### Selectors based on relationships

Rules applied to `E`

* `A E` - descendant
  * Note that `A, E` does not represent any relationship, just applying the same rules to them (Grouped selectors)
* `A > E` - direct descendant
* `E:first-child` - first child of its parent
* `B + E` - next sibling of B (next child of the same parent)


## [Text styles](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Text_styles)

> Use [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font) to set several properties at once (but I think it's not very readable)

* `font-family`
* `font-size`
* `line-height`
* `text-decoration`
* `font-style`
* `font-weight`
* `font-variant`
* Turn off: `normal` or `inherit`

## [Color](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Color)

* use keywords
* `#red-green-blue`
  * `#fff` white
  * `#000` black
* `#ff0000` (= `#0f0`)
* `rgb(128, 0, 0)` - decimal RGB values ranging from 0 - 255


## [Content](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Content)

**Text content**

Add `::before` or `::after` to the selector to insert text content before or after an element. [DEMO](http://codepen.io/weicliu/pen/GZvRLL)

**Image content**

Specify the URL of an image file in the value of the [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) property.

```css
/* This rule adds a space and an icon after every link that has the class glossary */
a.glossary:after {content: " " url("../images/glossary-icon.gif");}
```

Use `backgroud: url("...")` to add an image as an element's background.

## [Lists](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Lists)

**Unordered lists**

`list-style: disc/circle/square`

**ordered list**

`list-style: decimal/lower,upper-roman/lower,upper-latin`

## [Boxes](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Boxes)

**Color**

* color(padding) === color(element's background)
* color(margin) === transparent

**border**

* set to `none` or `hidden` to remove

**width**

* one: all around
* two: (top & bottom, left & right)
* four: (top, right, bottom, left)

## [Layout](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Layout)

**Size unit**

* better to use a percentage or em
* em: size of the current font (the width of a letter m)

**Text layout**

* `text-align: left/right/center/justify`
* `text-indent`

**Floats**

* [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float) forces an element to the left or right until it touches the edge of its container *or another floated element*.

<img src="https://developer.mozilla.org/@api/deki/files/4927/=floats.png" width="300">

**Clearing floats**

* If the text is not long enough, use **`clear`** property to align, say a new heading, to the left instead of making it between the red boxes.
* Another way if there are problems with the `clear` (eg. the heading has siblings the should also float): use `overflow: hiddle` to the parent element to cause it to expand to contain them.

**Positioning**

> These are advanced properties. It is possible to use them in simple ways—that is why they are mentioned in this basic tutorial. But using them for complex layouts can be difficult.

* `relative`: shifted *relative to its normal position*. Sometimes can also be achieved by `margin`
* `fixed`: relative to the document window
* `absolute`: fixed relative to a parent element (Only a parent that is itself positioned with relative, fixed or absolute will do)
* `static`: default. use this value to turn positiong off.

## [tables](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Tables)

* See you later :)


## [media](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_Started/Media)

Present a document differently in different media (eg. screen, print, projection, all).

**User interfaces**

For devices that support a UI.

* `E:hover`
* `E:focus` (keyboard focus)
* `E:active` (involved in the current user action)
* `E:link` (link not visited recently)
* `E:visited`

**`Curser` property**

* `pointer` (indicating a link. can be used for an element that is a link without using `<a>`)
* `wait` (cannot accept input)
* `progress` (is working, but can still accept input)
* `default`

**`outline`**

Use to indicate keyboard focus. Similar to `border`, but cannot specify individual sides.

```
:link:hover { outline: 1px solid #000; }
```

**use attribute**

* `disable` or `readonly`
* selector: `.green-button[disabled] `
