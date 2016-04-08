var Square = function(container) {
    var x, y, rotation;
    var square = create();
    reset();

    return {
        /* move (step, direction)
           @step: steps to move
           @direction: 0-up, 1-right, 2-down, 3-left. default: curent direction.
        */
        move: move,

        /* atPos (position): return a boolean: if the square is at the position {x, y}
        */
        atPos: atPos,

        /* getPos(): return current position {x, y} (read only) */
        getPos: pos,

        /* rotate(degree): rotate a degree angle */
        rotate: rotate,

        /* reset() */
        reset: reset
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
        square.style.left = x * Config.WIDTH + 'px';
        square.style.top = y * Config.HEIGHT + 'px';
        square.style.transform = 'rotate(' + rotation + 'deg)';
    }

    // move [arg0] steps to [arg1] direction
    function move(step, direction) {
        direction = direction || rotation / 90;
        switch(direction) {
        case 0: y = step > y ? 0 : y - step; break; // up
        case 1: x = x + step >= Config.COLUMN ? Config.COLUMN-1 : x + step; break; // right
        case 2: y = y + step >= Config.ROW ? Config.ROW-1 : y + step; break;
        case 3: x = step > x ? 0 : x - step; break;
        default: break;
        }
        update();
    }

    // rotate [arg0] in degree angle
    function rotate(angle) {
        rotation += angle;
        while (rotation < 0)
            rotation += 360;
        while (rotation >= 360)
            rotation -= 360;
        update();
    }

    // return if the square is at [arg0] position
    function atPos(pos) {
        return (pos.x === x && pos.y === y);
    }

    // return the position of square (read only)
    function pos() {
        return { x: x.eval(), y: y.eval() };
    }

    // reset random position and rotation
    function reset() {
        x = Math.floor(Math.random() * Config.COLUMN);
        y = Math.floor(Math.random() * Config.ROW);
        rotation = Math.floor(Math.random() * 4) * 90;
        update();
    }
}
