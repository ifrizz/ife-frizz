
// main manager
var Manager = (function() {

    // ---------------------- API -----------------------
    var manager = {
        log: log,
        moveSquare: moveSquare,
        getPath: getPath,
        buildWall: buildWall,
        colorWall: colorWall,
        reset: reset
    }

    // DOM & listeners
    var $btnWall = document.getElementById('btn-build-wall');
    var $btnReset = document.getElementById('btn-reset');
    var $selectSize = document.getElementById('select-size');
    var $selectDense = document.getElementById('select-density');

    $btnWall.addEventListener('click', function(e){ createMaze() });
    $btnReset.addEventListener('click', function(e){ reset() });
    $selectSize.addEventListener('change', function(e){ changeSetting(); createMaze(); });
    $selectDense.addEventListener('change', function(e){ changeSetting(); createMaze(); });

    // initialize
    var map = Map();
    var square = Square();
    var executor = Executor();
    var editor = CommandEditor(executor);
    var finder = Finder();

    changeSetting();
    createMaze();

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
        if (!validPos(pos) || isWall(pos)) {
            log(CONFIG.LOG.ERROR_WALL);
            return;
        }
        map.buildWall(pos);
    }

    // paint the wall
    function colorWall(color, pos) {
        pos = pos || square.getFront();
        if (!validPos(pos) || !isWall(pos)) {
            log(CONFIG.LOG.ERROR_COLOR);
            return;
        }
        map.colorWall(pos, color);
    }

    function createMaze(){
        map.setMaze();
        square.reset();
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
        if (map.wallCount >= CONFIG.VALUE.COLUMN * CONFIG.VALUE.ROW - 1)
            return;
        var pos = randomPos(CONFIG.VALUE.COLUMN, CONFIG.VALUE.ROW);

        var factor = Math.floor(Math.random()*2);
        for(var i=0; i<15; i++) {
            var pos1 = {x: factor ? pos.x : i + pos.x, y: !factor ? pos.y : i + pos.y};
            if (!square.atPos(pos1) && !map.isWall(pos1) && map.validPos(pos1))
                buildWall(pos1);
        }
        // buildWall(pos);
    }

    // reset everything www
    function reset() {
        map.reset();
        square.reset();
    }

    function changeSetting() {
        CONFIG.set($selectSize.value, $selectDense.value);
        reset();
    }
})();
