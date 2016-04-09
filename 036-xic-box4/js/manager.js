// global variables
var Config = {
    WIDTH: 42,
    HEIGHT: 42,
    COLUMN: 10,
    ROW: 10,
    WALL_COLOR: '#555',
    INTERVAL: 100
};

// Vector2
var V2 = function(x, y) {
    this.x = x;
    this.y = y;
}
V2.prototype.clone = function() {
    return new V2(this.x, this.y);
}
V2.prototype.equal = function(pos) {
    return pos && this.x===pos.x && this.y===pos.y;
}
V2.prototype.to = function(dst) {
    var x = dst.x - this.x;
    var y = dst.y - this.y;
    if (x && !y)
        return [x > 0 ? 2 : 4, Math.abs(x)];
    else if (y && !x)
        return [y > 0 ? 3 : 1, Math.abs(y)];
    else
        return [0, 0];
}
V2.prototype.add = function(pos) {
    if (!pos) return this.clone();
    return new V2(this.x + pos.x, this.y + pos.y);
}

// main manager
var Manager = (function() {
    // constructor
    var manager = {
        moveSquare: moveSquare,
        getPath: getPath,
        buildWall: buildWall,
        colorWall: colorWall
    }

    // DOM & listeners
    var $btnWall = document.getElementById('btn-build-wall');
    var $btnReset = document.getElementById('btn-reset');
    $btnWall.addEventListener('click', function(e){ randomWall() });
    $btnReset.addEventListener('click', function(e){ reset() });

    // initialize
    var map = Map(Config.COLUMN, Config.ROW);
    var square = Square(document.getElementById('maze-container'));
    var executor = Executor(manager);
    var editor = CommandEditor(executor);
    var finder = Finder();

    // generate a random position within the map
    function randomPos(w, h) {
        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);
        return {x:x, y:y};
    }

    // find an empty place to build a wall
    // if no such place, return
    function randomWall() {
        if (map.wallCount >= map.column * map.row - 1)
            return;
        var pos = randomPos(map.column, map.row);
        while (square.atPos(pos) || map.isWall(pos)) {
            pos = randomPos(map.column, map.row);
        }
        buildWall(pos);
    }

    // reset everything www
    function reset() {
        map.reset();
        square.reset();
    }

    // move the square to a proper position
    // take walls and borders into account
    function moveSquare(step, dir, angle) {
        if (step && angle) {
            square.rotateTo(angle);
            square.move(step, dir);
        }
        else if (step)
            square.move(step, dir);
        else if (angle)
            square.rotateTo(angle);
    }

    // get a path from current position to dst position
    function getPath(dst, type) {
        var src = square.position();
        var mapInfo = map.getMapInfo();
        return finder.getPath(src, dst, mapInfo, type);
    }

    // build a wall on {pos} position
    function buildWall(pos) {
        pos = pos || square.getFront();
        map.buildWall(pos);
    }

    // paint the wall
    function colorWall(color, pos) {
        pos = pos || square.getFront();
        map.colorWall(pos, color);
    }
})();
