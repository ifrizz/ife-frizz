var Map = function(c, r){
    var container = document.getElementById("maze-container");
    var column = c;
    var row = r;
    var box = [];
    init();

    function init() {
        container.style.width = c * Config.WIDTH + 'px';
        container.style.height = r * Config.HEIGHT + 'px';
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < column; j++) {
                var div = createDiv(i, j);
                container.appendChild(div);
                box.push(div);
            }
        }
    }

    function createDiv(y, x) {
        var div = document.createElement('div');
        div.className = 'maze-block';
        if (x === 0 && y !== 0) div.style.clear = 'both';
        if (x === column-1) div.className += ' maze-block-right';
        if (y === row-1) div.className += ' maze-block-bottom';
        div.style.backgroundColor = '';
        div.dataset.type = 'null';
        return div;
    }

    function getBox(y, x) {
        return box[y * column + x];
    }

    function setColor(y, x, color) {
        getBox(y, x).style.backgroundColor = color;
    }

    function setType(y, x, type) {
        getBox(y, x).dataset.type = type;
    }

    function getType(y, x) {
        var box = getBox(y, x);
        return box && box.dataset.type;
    }

    function buildWall(y, x) {
        setType(y, x, 'wall');
        setColor(y, x, Config.WALL_COLOR);
    }

    function isWall(y, x) {
        return getType(y, x) === 'wall';
    }

    return {
        column: column,
        row: row,
    };
}
