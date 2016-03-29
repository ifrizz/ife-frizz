# DOM Methods

## HTML Elements

#### Finding HTML Elements
```
document.getElementById (id);                // Get element by id
document.getElementsByTagName (name);        // Get elements by tag
document.getElementsByClassName (name);      // Get elements by class
document.querySelectorAll ("p.intro");       // Returns all `<p>` elements with `class="intro"`
```
#### Changing HTML Elements
```
element.innerHTML = new_html_content;        // Change text
element.attribute = value;                   // Change attribute value
element.setAttribute (attribute, value);     // Change attribute value
element.style.color = "blue";                // Change style
```

#### Adding and Deleting Elements
```
document.createElement (element)
document.removeChild (element)
document.appendChild (element)
document.replaceChild (element)
document.write (text)
```
## Events

#### Adding Events Handlers
```
document.getElementById (id).onclick = function() { }
```

#### Reacting to Events:

* `onload`, `onunload`: triggered when the user enters or leaves the page
* `onchange`: often combined with input fields
* `onmouseover`, `onmouseout`
* `onmousedown`, `onmouseup`, `onclick`
* `onfucus`, `onunfocus`
* `onresize`

#### EventListener:

Add EventListener

```
element.addEventListener(event, function, useCapture);

    @ event:         type of the event (like `"click"` or `"mousedown"`)
    @ function:      the function to call when the event occurs
    @ useCapture:    true: the inner most element's event is handdled first
                     false: otherwise
```

Remove EventListener

```
element.removeEventListener(event, function)
```

## Element Tree

#### Navigation through the elements

* `parentNode`
* `childNodes [nodenumber]`
* `firstChild`
* `lastChild`
* `nextSibling`
* `previousSibling`

#### Nodes Methods:

Append the new element as the last child of the parent:
```
element.appendChild (child)
```
Code sample:
```
var para = document.createElement("p");             // create a <p> element
var node = document.createTextNode("text");         // create text node
para.appendChild(node);                             // append the text node to <p> element
document.getElementById("div1").appendChild(para);  // append new element to an existing element
```
Other methods
```
element.insertBefore (new_child, old_child);
element.removeChild (child);
element.replaceChild (child);
```

