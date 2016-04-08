var Executor = function (Square) {
    var square = Square;
    var actionQueue = [];
    var timer;

    // test (...)
    function execute() {
        setTimeout(function(){
            clearTimeout(timer);
            time = null;
            square.move(1, 1);
            execute();
        }, 400);
    }

    return {
        execute: execute
    }
}
