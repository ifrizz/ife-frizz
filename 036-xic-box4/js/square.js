/*
      Setting: 1: top  2: right  3: down  4: left
*/
var Square = function() {

    var x, y, rotation, degree;
    var container = document.getElementById('maze-container')
    var square = create();
    reset();

    return {
        move: move,            // move (step, dir)

        rotateTo: rotateTo,    // rotateTo (dir)

        reset: reset,          // reset(): reset a random pos & rot, change the size according to settings

        getFront: getFront,    // getFront(): return the position {x, y} of the block right in front of the square

        getRotation: getRotation,   // getRotation(): return rotation

        getPosition: getPosition    // getPosition(): return position {x, y}
    }

    // ---------------------------  Initialize ------------------------------------

    // create square div
    function create() {
        var div = document.createElement('div');
        div.className = 'square';
        container.appendChild(div);
        return div;
    }

    // update position & rotation of square div in DOM
    function update() {
        square.style.left = x * CONFIG.VALUE.WIDTH + 'px';
        square.style.top = y * CONFIG.VALUE.HEIGHT + 'px';
        square.style.transform = 'rotate(' + (degree-90) + 'deg)';
    }

    // reset random position and rotation
    function reset() {
        // reset a random position, making sure it wont collape with the wall
        do {
            x = Math.floor(Math.random() * CONFIG.VALUE.COLUMN);
            y = Math.floor(Math.random() * CONFIG.VALUE.ROW);
        } while (x % CONFIG.VALUE.MAZE_WIDTH == 0 || y % CONFIG.VALUE.MAZE_WIDTH == 0)
        rotation = Math.floor(Math.random() * 4) + 1;
        degree = rotation * 90;

        // reset styles
        square.style.width = CONFIG.VALUE.WIDTH + 'px';
        var h = Math.floor(CONFIG.VALUE.HEIGHT * 4/5);
        square.style.height = h + 'px';
        square.style.borderTop = (CONFIG.VALUE.HEIGHT - h) + 'px solid indigo';
        square.style.transition = CONFIG.VALUE.INTERVAL / 1000 + 's';

        // check if it's removed from the container
        if (square.parentNode !== container)
            container.appendChild(square);
        update();
    }


    // ----------------------------- Movements ------------------------------------

    // move steps to direction * this method is ugly *
    function move(step, direction) {
        direction = direction || rotation;
        switch(direction) {
            case 1: y = step > y ? 0 : y - step; break; // up
            case 2: x = x + step >= CONFIG.VALUE.COLUMN ? CONFIG.VALUE.COLUMN-1 : x + step; break; // right
            case 3: y = y + step >= CONFIG.VALUE.ROW ? CONFIG.VALUE.ROW-1 : y + step; break;
            case 4: x = step > x ? 0 : x - step; break;
            default: break;
        }
        update();
    }

    // rotate
    function rotateTo(angle) {
        angle = angle < 0 ? rotation + angle : angle;
        while (angle > 4) angle -= 4;
        while (angle < 1) angle += 4;

        // update degree
        var rot = angle - rotation;
        while (rot < -2) rot += 4;
        while (rot >  2) rot -= 4;
        degree += rot * 90;

        // update rotation
        rotation = angle;
        update();
    }

    // get front position of square
    function getFront() {
        switch(rotation) {
        case 1: return {x: x,   y: y-1 };
        case 2: return {x: x+1, y: y   };
        case 3: return {x: x,   y: y+1 };
        case 4: return {x: x-1, y: y   };
        }
    }

    function getRotation() {
        return rotation;
    }

    function getPosition() {
        return {x:x, y:y};
    }
}
