// global variables
var Config = {
    WIDTH: 42,
    HEIGHT: 42,
    COLUMN: 10,
    ROW: 10,
    WALL_COLOR: '#555',
    INTERVAL: 200,
    LOG: {
        ERROR_PATH:  "走呀走呀走不到（●>∀<●）",
        ERROR_WALL:  "此处禁止违章建筑(｡ŏ_ŏ)",
        ERROR_COLOR: "此处禁止涂鸦(#`Д´)ﾉ",
        ERROR_SQUARE: "撞墙惹 (╯°Д°)╯︵ ┻━┻"
    }
};

// main manager
var Manager = (function() {

    // ---------------------- API -----------------------
    var manager = {
        log: log,
        moveSquare: moveSquare,
        getPath: getPath,
        buildWall: buildWall,
        colorWall: colorWall,
    }

    // DOM & listeners
    var $btnWall = document.getElementById('btn-build-wall');
    var $btnReset = document.getElementById('btn-reset');
    $btnWall.addEventListener('click', function(e){ randomWall() });
    $btnReset.addEventListener('click', function(e){ reset() });

    // initialize
    var map = Map(Config.COLUMN, Config.ROW);
    var square = Square(document.getElementById('maze-container'));
    var executor = Executor();
    var editor = CommandEditor(executor);
    var finder = Finder();

    return manager;

    // ---------------- public methods -------------------

    // log
    function log(str) {
        var event = new CustomEvent('log', {'detail':str});
        window.dispatchEvent(event);
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

    // ---------------- private methods -------------------

    // generate a random position within the map
    function randomPos(w, h) {
        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);
        return {x:x, y:y};
    }

    // find an empty place to build a wall
    // if no such place, return
    function randomWall() {
        if (map.wallCount >= Config.COLUMN * Config.ROW - 1)
            return;
        var pos = randomPos(Config.COLUMN, Config.ROW);
        while (square.atPos(pos) || map.isWall(pos)) {
            pos = randomPos(Config.COLUMN, Config.ROW);
        }
        buildWall(pos);
    }

    // reset everything www
    function reset() {
        map.reset();
        square.reset();
    }
})();
