## Dev notes

### Library setup

frizz.js

```javascript

(function (window){
    'use strict';

    function frizz () {
        this.name = "frizz";
    };

    frizz.prototype.alert = function () {
        alert("Hello!");
    }

    if (typeof window.frizz === 'undefined') {
        window.frizz = new frizz();
    }

})(window);

```

html: use the library

```html
<html>
<head>
    <title>test</title>
    <script src="./frizz.js"></script>

    <script>
        frizz.alert();
    </script>
    
</head>

<body>

</body>
</html>
```