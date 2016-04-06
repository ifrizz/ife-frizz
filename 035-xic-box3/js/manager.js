var Config = {
    width: 42,
    height: 42,
    column: 10,
    row: 10
};

function init() {
    Map(Config.column, Config.row);
    Action(document.getElementById('maze-container'));
}
