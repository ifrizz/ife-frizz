var Config = {
    WIDTH: 42,
    HEIGHT: 42,
    COLUMN: 10,
    ROW: 10,
    WALL_COLOR: '#333'
};

var Control = (function(){
    init();

    function init() {
        Map(Config.COLUMN, Config.ROW);
        Square(document.getElementById('maze-container'));
        CommandEditor();
    }
})();
