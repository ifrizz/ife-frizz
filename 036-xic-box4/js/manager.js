// global variables
var Config = {
    WIDTH: 42,
    HEIGHT: 42,
    COLUMN: 10,
    ROW: 10,
    WALL_COLOR: '#555'
};

// main manager
var Manager = (function() {

    var $btnWall = document.getElementById('btn-build-wall');
    var $btnReset = document.getElementById('btn-reset');

    var map = Map(Config.COLUMN, Config.ROW);
    var square = Square(document.getElementById('maze-container'));
    CommandEditor();

    $btnWall.addEventListener('click', function(e){ randomWall() });
    $btnReset.addEventListener('click', function(e){ reset() });

    var executor = Executor(square);
    executor.execute();

    function randomPos(w, h) {
        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);
        return {x:x, y:y};
    }

    function randomWall() {
        // if the map is full, skip
        if (map.wallCount >= map.column * map.row - 1)
            return;

        // find an empty block to build the wall
        var pos = randomPos(map.column, map.row);
        while (square.atPos(pos) || map.isWall(pos)) {
            pos = randomPos(map.column, map.row);
        }
        map.buildWall(pos);
    }

    function reset() {
        map.reset();
        square.reset();
    }
})();
