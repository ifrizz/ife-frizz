/*
    *** Notes:
    重要的话要在前面标三颗星星~
    When using module pattern, remember to use get() & set() functions to for primitive variables.
    Otherwise, it will return a copy instead of a reference.
*/

// global variables
var CONFIG = (function() {
    var MAIN_WIDTH = 500,
        MAIN_HEIGHT = 500;

    var value = {
        COLUMN: 20,
        ROW: 20,
        WIDTH: 25,
        HEIGHT: 25,
        WALL_COLOR: '#ccc',
        INTERVAL: 80,
        MAX_STEP: 5,
        MAZE_WIDTH: 2,
        MAZE_DENSE: 0.5,
    };

    var log = {
        ERROR_PATH:  "走呀走呀走不到（●>∀<●）",
        ERROR_WALL:  "此处禁止违章建筑(｡ŏ_ŏ)",
        ERROR_COLOR: "此处禁止涂鸦(#`Д´)ﾉ",
        ERROR_SQUARE: "撞墙惹 ( ˘•ω•˘ )"
    };

    var setting = {
        "10": {
            max_step: 3,
            interval: 400,
            maze_dense: {"sparse": 0.4, "dense": 0.4},
            maze_width: {"sparse": 3, "dense": 2}
        },
        "20": {
            max_step: 3,
            interval: 250,
            maze_dense: {"sparse": 0.6, "dense": 0.5},
            maze_width: {"sparse": 4, "dense": 2}
        },
        "50": {
            max_step: 2,
            interval: 100,
            maze_dense: {"sparse": 0.5, "dense": 0.4},
            maze_width: {"sparse": 4, "dense": 3}
        },
        "100": {
            max_step: 3,
            interval: 100,
            maze_dense: {"sparse": 0.5, "dense": 0.4},
            maze_width: {"sparse": 6, "dense": 3}
        }
    }

    function set (size, dense) {
        value.COLUMN= +size;
        value.ROW = +size;
        value.WIDTH = MAIN_WIDTH / value.COLUMN;
        value.HEIGHT = MAIN_HEIGHT / value.ROW;
        value.INTERVAL = setting[size].interval;
        value.MAX_STEP = setting[size].max_step;
        value.MAZE_DENSE = setting[size].maze_dense[dense];
        value.MAZE_WIDTH = setting[size].maze_width[dense];
    }

    return {
        VALUE: value,
        LOG: log,
        set: set
    }
})();
