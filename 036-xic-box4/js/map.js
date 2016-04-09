var Map = function(c, r){
    var container = document.getElementById("maze-container");
    var column = c;
    var row = r;
    var box = [];
    var wallCount = 0;
    init();

    return {
        column: column,
        row: row,
        wallCount: wallCount,   // number of walls in the map
        /* isWall (pos): return if a wall is at the position {x, y} */
        isWall: isWall,
        /* buildWall (pos): build a wall at position {x, y} */
        buildWall: buildWall,
        /* reset () : reset color of all blocks */
        reset: reset,
        /* getMapInfo() */
        getMapInfo: getMapInfo
    };

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

    function getBox(pos) {
        return box[pos.y * column + pos.x];
    }

    function setColor(pos, color) {
        if (!validatePos(pos))
            return;
        var box = getBox(pos);
        box.style.backgroundColor = color;
        box.style.border = '1px solid ' + color;
    }

    function setType(pos, type) {
        getBox(pos).dataset.type = type;
    }

    function getType(pos) {
        var box = getBox(pos);
        return box && box.dataset.type;
    }

    function buildWall(pos) {
        if (!validatePos(pos))
            return;
        if (!isWall(pos))
            wallCount += 1;
        setType(pos, 'wall');
        setColor(pos, Config.WALL_COLOR);
    }

    function isWall(pos) {
        return getType(pos) === 'wall';
    }

    function reset() {
        for (var i in box) {
            box[i].style.backgroundColor = '';
            box[i].style.border = '';
        }
    }

    function validatePos(pos) {
        return (pos.x >= 0 && pos.x < column && pos.y >= 0 && pos.y < row)
    }

    function getMapInfo() {
        var mapInfo = [];
        for (var i=0; i<row; i++) {
            var item = [];
            for (var j=0; j<column; j++) {
                item.push(!isWall({x:j, y:i}));
            }
            mapInfo.push(item);
        }
        return {info:mapInfo, width:column, height:row};
    }
}
