/*
原版：resize的时候移除所有div，创建需要个数的div
问题：卡卡卡卡卡，从100切回来要1秒
优化：首次载入的时候创建足够的w，复用（这是个design pattern啊！这也好意思叫design pattern啊！！！_(・ω・｣ ∠)_ ）

关于鼠标悬停的时候显示格子坐标的问题。
我竟然胆敢试图给每个格子添加悬停事件监听。
有一万个格子_(・ω・｣ ∠)_
PO主快去死吧（……）
*/
var Map = function(){
    var container = document.getElementById("maze-container");  // maze container
    var posinfo = document.getElementById("maze-position");     // position info

    var box = [];   // stores all divs of blocks

    container.addEventListener('mouseover', function(e) { showInfo(e); });
    container.addEventListener('mouseout',  function(e) { hideInfo(e); });

    init();

    // ---------------------- API -----------------------

    return {

        buildWall: buildWall,    // buildWall(pos)

        colorWall: colorWall,    // colorWall(pos, color)

        getMapInfo: getMapInfo,  // getMapInfo(): return {info, width, height} @info: marks the position that are valid for path-finding

        reset: reset,            // reset()

        setMaze: setMaze,         // setMaze(): generate a new random maze

        validPos: validPos,      // 下次优化的时候第一个就要把这俩丑陋的API去掉（咬牙

        isWall: isWall,

    };

    // ---------------- public methods -------------------

    function isWall(pos) {
        return getType(pos) === 'wall';
    }

    function buildWall(pos) {
        if (!validPos(pos) || isWall(pos))
            return false;
        setType(pos, 'wall');
        setColor(pos, CONFIG.VALUE.WALL_COLOR);
        return true;
    }

    function colorWall(pos, color) {
        if (!validPos(pos) || !isWall(pos))
            return false;
        setColor(pos, color);
        return true;
    }

    function getMapInfo() {
        var mapInfo = [];
        for (var i=0; i<CONFIG.VALUE.ROW; i++) {
            var item = [];
            for (var j=0; j<CONFIG.VALUE.COLUMN; j++) {
                item.push(!isWall({x:j, y:i}));
            }
            mapInfo.push(item);
        }
        return {info:mapInfo, width:CONFIG.VALUE.COLUMN, height:CONFIG.VALUE.ROW};
    }

    // ---------------- DOM related -------------------

    function init() {
        // clear all
        box = [];

        // set container
        container.style.width = '500px';
        container.style.height = '500px';

        // add blocks
        for (var i = 0; i < 100; i++) {
            for (var j = 0; j < 100; j++) {
                var div = createDiv(i, j);
                container.appendChild(div);
                box.push(div);
            }
        }
        reset();
    }

    function reset() {
        var size = CONFIG.VALUE.COLUMN * CONFIG.VALUE.ROW;
        for (var i=0; i<size; i++) {
                box[i].style.width = CONFIG.VALUE.WIDTH + 'px';
                box[i].style.height = CONFIG.VALUE.HEIGHT + 'px';
                box[i].dataset.type = 'null';
                box[i].style.backgroundColor = '';
                box[i].style.border = '';
        }
        for (var i=size; i<10000; i++) {
            box[i].style.width = '0px';
            box[i].style.height = '0px';
        }
    }

    function createDiv(y, x) {
        var div = document.createElement('div');
        div.className = 'maze-block';
        if (x === 0 && y !== 0) div.style.clear = 'both';
        div.style.backgroundColor = '';
        div.dataset.type = 'null';
        return div;
    }

    // --------------- mouse hover : show coord info -------------------

    // PO主已经精神失常开始写长度突破天际的函数名了（该吃药了少女
    function getContainerPosition() {
        // 获得container它全家的offset wwww
        var e = container;
        var offset = {x:0, y:0};
        while (e) {
            offset.x += e.offsetLeft;
            offset.y += e.offsetTop;
            e = e.offsetParent;
        }
        return offset;
    }

    function showInfo(e) {
        var mousePos = {x:e.clientX, y:e.clientY};
        var o = getContainerPosition();
        var x = Math.floor((mousePos.x - o.x - 2) / CONFIG.VALUE.WIDTH);
        var y = Math.floor((mousePos.y - o.y - 2) / CONFIG.VALUE.HEIGHT);
        if (x < 0) x = 0;
        if (x >= CONFIG.VALUE.COLUMN) x = CONFIG.VALUE.COLUMN - 1;
        if (y < 0) y = 0;
        if (y >= CONFIG.VALUE.COLUMN) y = CONFIG.VALUE.COLUMN - 1;
        posinfo.style.display = "block";
        posinfo.innerHTML = "(" + x + ", " + y + ")";
    }

    function hideInfo() {
        posinfo.innerHTML = "鼠标悬停的时候这里会显示格子坐标（●>∀<●）";
    }

    // ----------- calculation related private methods -----------------

    function getBox(pos) {
        return box[pos.y * CONFIG.VALUE.COLUMN + pos.x];
    }

    function setColor(pos, color) {
        if (!validPos(pos))
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

    function validPos(pos) {
        return (pos.x >= 0 && pos.x < CONFIG.VALUE.COLUMN && pos.y >= 0 && pos.y < CONFIG.VALUE.ROW)
    }

    // ------------------ create maze ----------------------

    function setMaze() {
        reset();
        for (var i = 0; i < CONFIG.VALUE.ROW; i += CONFIG.VALUE.MAZE_WIDTH) {
            for (var j = 0; j < CONFIG.VALUE.COLUMN; j += CONFIG.VALUE.MAZE_WIDTH) {
                // connect horizontal
                var rand = Math.random();
                if (rand <= CONFIG.VALUE.MAZE_DENSE)
                    connect(j, j + CONFIG.VALUE.MAZE_WIDTH, i, 1);
                // connect vertical
                rand = Math.random();
                if (rand <= CONFIG.VALUE.MAZE_DENSE)
                    connect(i, i + CONFIG.VALUE.MAZE_WIDTH, j, 0);
            }
        }
    }

    function connect(p1, p2, px, dir) {
        var start = p1 < p2 ? p1 : p2;
        var end = p1 < p2 ? p2 : p1;
        for (var i = start; i <= end; i++) {
            if (dir) buildWall({x:i, y:px});
            else buildWall({x:px, y:i});
        }
    }
}
