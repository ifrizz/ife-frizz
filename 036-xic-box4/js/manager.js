var Manager = (function() {

    // ---------------------- API -----------------------
    var manager = {
        log: log,
        moveSquare: moveSquare,
        getPath: getPath,
        buildWall: buildWall,
        colorWall: colorWall
    };

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

    // public log info
    function log(str) {
        var event = new CustomEvent('log', {'detail':str});
        window.dispatchEvent(event);
    }


    // ----------------- private methods for initialization -------------------

    function changeSetting() {
        CONFIG.set($selectSize.value, $selectDense.value);
        reset();
    }

    function reset() {
        map.reset();
        square.reset();
    }

    function createMaze(){
        map.setMaze();
        square.reset();
    }


    // ----------- public methods for actions called by executor ---------------

    // move the square to a proper position, taking walls and borders into account
    function moveSquare(step, dir, angle) {
        if (angle) {
            square.rotateTo(angle);
        }
        else if (step) {
            // get a valid pos
            if (dir == 0) dir = square.getRotation();
            var vecmap = [0, {x:0, y:-1}, {x:1, y:0}, {x:0, y:1}, {x:-1, y:0}];
            var finalStep = 0;
            var vec = vecmap[dir];
            var curPos = square.getPosition();
            while (step--) {
                var curPos = {x: curPos.x + vec.x, y: curPos.y + vec.y};
                if (!map.validPos(curPos) || map.isWall(curPos))
                    break;
                finalStep++;
            }
            if (step > 0)
                log(CONFIG.LOG.ERROR_SQUARE);
            square.move(finalStep, dir);
        }
    }

    // get a path from current position to dst position
    function getPath(dst, type) {
        var src = square.getPosition();
        var mapInfo = map.getMapInfo();
        return finder.getPath(src, dst, mapInfo, type);
    }

    // build a wall on {pos} position
    function buildWall(pos) {
        pos = pos || square.getFront();
        if (!map.buildWall(pos))
            log(CONFIG.LOG.ERROR_WALL);
    }

    // paint the wall
    function colorWall(color, pos) {
        pos = pos || square.getFront();
        if (!map.colorWall(pos, color))
            log(CONFIG.LOG.ERROR_COLOR);
    }






    // *********** these method are for creating a random wall **************
    // ****** no longer used, since the random maze is finished lol *********

    /*

    // generate a random position within the map
    function randomPos(w, h) {
        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);
        return {x:x, y:y};
    }

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

    */
})();
