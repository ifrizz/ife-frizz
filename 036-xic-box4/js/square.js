var Square = function() {
    /* rotation
     * 1: top
     * 2: right
     * 3: down
     * 4: left
    */
    var x, y, rotation, degree;
    var container = document.getElementById('maze-container')
    var square = create();
    reset();

    return {
        /* move (step, direction)
           @step: steps to move
           @direction: 4-up, 1-right, 2-down, 3-left. default: curent direction.
        */
        move: move,
        /* atPos (position): return a boolean: if the square is at the position {x, y}
        */
        atPos: atPos,
        /* getPos(): return current position {x, y} (read only) */
        position: pos,
        /* rotateTo(degree): rotate to direction */
        rotateTo: rotateTo,
        /* reset() */
        reset: reset,
        /* getfront(): get the front position of square */
        getFront: getFront,
        /* setInterval(float interval) */
        setInterval: setInterval
    }

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
        // calculate degree

        square.style.transform = 'rotate(' + (degree-90) + 'deg)';
    }

    // move [arg0] steps to [arg1] direction
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

    // rotate [arg0] in degree angle
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

    // return if the square is at [arg0] position
    function atPos(pos) {
        return (pos.x === x && pos.y === y);
    }

    // return the position of square (read only)
    function pos() {
        return {x:x, y:y};
    }

    // reset random position and rotation
    function reset() {
        // set random position
        do {
            x = Math.floor(Math.random() * CONFIG.VALUE.COLUMN);
            y = Math.floor(Math.random() * CONFIG.VALUE.ROW);
        } while (x % CONFIG.VALUE.MAZE_WIDTH == 0 || y % CONFIG.VALUE.MAZE_WIDTH == 0)
        rotation = Math.floor(Math.random() * 4) + 1;
        degree = rotation * 90;

        // set size
        square.style.width = CONFIG.VALUE.WIDTH + 'px';
        var h = Math.floor(CONFIG.VALUE.HEIGHT * 4/5);
        square.style.height = h + 'px';
        square.style.borderTop = (CONFIG.VALUE.HEIGHT - h) + 'px solid indigo';
        square.style.transition = CONFIG.VALUE.INTERVAL / 1000 + 's';

        // add to container
        if (square.parentNode !== container)
            container.appendChild(square);
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

    function setInterval(interval) {
        square.style.transition = interval + 's';
    }
}
