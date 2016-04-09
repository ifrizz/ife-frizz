/*
    Notes:

    这个草鸡好用！
    object["func"](arguments)
    口以直接调成员函数！
    ……话说回来这个不就是普通的访问object成员的方式吗_(:з」∠)_（你蠢

*/
var Finder = function(){

    // ---------------- private class --------------------

    var V2 = function(x, y) {
        this.x = x;
        this.y = y;
    }

    V2.prototype = {
        constructor: V2,
        clone: function() {
            return new V2(this.x, this.y);
        },
        equal: function(pos) {
            return pos && this.x===pos.x && this.y===pos.y;
        },
        to: function(dst) {
            var x = dst.x - this.x;
            var y = dst.y - this.y;
            if (x && !y) return [x > 0 ? 2 : 4, Math.abs(x)];
            else if (y && !x) return [y > 0 ? 3 : 1, Math.abs(y)];
            else return [0, 0];
        },
        add: function(pos) {
            if (!pos) return this.clone();
            return new V2(this.x + pos.x, this.y + pos.y);
        }
    };

    var PathNode = function(_prev, _pos) {
        this.prev = _prev;
        this.pos = _pos
    }

    PathNode.prototype = {
        constructor: PathNode,
        getPath: function() {
            var node = this;
            var path = [];
            while(node.prev) {
                path.unshift(node.prev.pos.to(node.pos));
                node = node.prev;
            }
            return path;
        }
    }

    var algorithms = {
        dfs: dfs,
        bfs: bfs
    };

    // ---------------------- API -----------------------

    return {
        getPath: function (src, dst, map, type) {
            return algorithms[type]( new V2(src.x, src.y), new V2(dst.x, dst.y), map );
        }
    };

    // ------------ 方块君跑DFS的路线真是让人心疼啊汪wwww --------------------

    function dfs(cur, dst, map) {
        map.info[cur.y][cur.x] = false; // mark {cur} as visited
        if(cur.equal(dst)) return [];   // if find target
        var adj = getAdj(cur);          // o.w. bfs
        for (var a of adj) {
            if (validatePos(a, map)) {
                // path.push(cur.to(a));
                var result = dfs(a, dst, map);
                if (result !== undefined) {
                    result.unshift(cur.to(a));
                    return result;
                }
                // path.pop();
            }
        }
        return undefined;
    }

    // ---------------- 我们省省力气来跑蠢乎乎的BFS --------------------

    function bfs(src, dst, map) {
        var queue = [new PathNode(undefined, src)];
        while (queue.length > 0) {
            var node = queue.shift();           // dequeue
            if (node.pos.equal(dst))            // if found
                return node.getPath();          // return path
            var adj = getAdj(node.pos);         // o.w. get adj positions
            for (a of adj) {
                if (validatePos(a, map)) {      // if position is valid
                    map.info[a.y][a.x] = false; // mark as visited
                    queue.push(new PathNode(node, a));  // enqueue
                }
            }
        }
        return null;
    }

    // ---------------- 贪心得像室友君一样的BestFS君 ------------------

    function validatePos(pos, map) {
        return pos.x >= 0
            && pos.x < map.width
            && pos.y >= 0
            && pos.y < map.height
            && map.info[pos.y][pos.x];
    }

    function getAdj(pos) {
        return [
            pos.add(new V2( 0, -1)),
            pos.add(new V2( 1,  0)),
            pos.add(new V2( 0,  1)),
            pos.add(new V2(-1,  0)),
        ];
    }
};
