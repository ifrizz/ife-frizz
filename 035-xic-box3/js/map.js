var Map = function(c, r){
    var container = document.getElementById("maze-container");
    container.style.width = c * Config.width + 'px';
    container.style.height = r * Config.height + 'px';

    var column = c;
    var row = r;
    var box = [];

    var createDiv = function(y, x){
        var div = document.createElement('div');
        div.className = 'maze-block';
        if (x === 0 && y !== 0) div.style.clear = 'both';
        if (x === column-1) div.className += ' maze-block-right';
        if (y === row-1) div.className += ' maze-block-bottom';
        return div;
    };

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            var div = createDiv(i, j);
            container.appendChild(div);
            box.push(div);
        }
    }

    return {
        column: column,
        row: row,
    };
}
