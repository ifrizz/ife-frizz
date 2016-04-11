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
        },
        // manhattan distance
        dist: function(pos) {
            return Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y);
        }
    };

    var PathNode = function(prev, pos, value, cost) {
        this.prev = prev;
        this.pos = pos
        this.value = value || 0; // E(S) + G(S) -> manhattan dist + (penalty in A*)
        this.cost = cost || 0;
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
        bfs: bfs,
        best: bestfs,
        "a*": astar
    };

    // ---------------------- API -----------------------

    return {
        getPath: function (src, dst, map, type) {
            return algorithms[type]( new V2(src.x, src.y), new V2(dst.x, dst.y), map );
        }
    };

    // ------------ 方块君跑DFS的路线真是让人心疼啊汪wwww --------------------

    // 就是任性不写递归你咬我呀ヽ(●´ω｀●)ﾉ
    function dfs(src, dst, map) {
        var stack = [new PathNode(undefined, src)];
        var calc = 0;
        while (stack.length > 0) {
            calc += 1;
            var node = stack.pop();
            if (node.pos.equal(dst))
                return pathInfo("DFS", node.getPath(), calc);
            var adj = getAdj(node.pos);
            for (a of adj) {
                if (validatePos(a, map)) {
                    map.info[a.y][a.x] = false;
                    stack.push(new PathNode(node, a));
                }
            }
        }
        return null;
    }

    // ---------------- 我们省省力气来跑蠢乎乎的BFS --------------------

    function bfs(src, dst, map) {
        var queue = [new PathNode(undefined, src)];
        var calc = 0;
        while (queue.length > 0) {
            calc += 1;
            var node = queue.shift();           // dequeue
            if (node.pos.equal(dst))            // if found
                return pathInfo("BFS", node.getPath(), calc);
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

    // ---------------- 笨头笨脑的BestFS君 ------------------

    function bestfs(src, dst, map) {
        var pq = new PriorityQueue(compare);
        var calc = 0;
        pq.enqueue(new PathNode(undefined, src, src.dist(dst))); // start: push start node into PQ
        while (pq.size() > 0) {
            calc += 1;
            var node = pq.dequeue();       // get the best node
            if (node.pos.equal(dst))       // if found, return path
                return pathInfo("Best-FS", node.getPath(), calc);
            var adj = getAdj(node.pos);    // o.w. try all adj
            for (a of adj) {
                if (validatePos(a, map)) {   // check if pos is valid
                    map.info[a.y][a.x] = false;    // mark the pos as visited
                    pq.enqueue(new PathNode(node, a, a.dist(dst)));  // push into PQ
                }
            }
        }
        return null;
    }

    // ---------------- 喵同学喜欢的冷静的A*君 ------------------

    function astar(src, dst, map) {
        var pq = new PriorityQueue(compare);
        var calc = 0;
        pq.enqueue(new PathNode(undefined, src, src.dist(dst), 1)); // start: push start node into PQ
        while (pq.size() > 0) {
            calc += 1;
            var node = pq.dequeue();       // get the best node
            if (node.pos.equal(dst))       // if found, return path
                return pathInfo("A*", node.getPath(), calc);
            var adj = getAdj(node.pos);    // o.w. try all adj
            for (a of adj) {
                if (validatePos(a, map)) {   // check if pos is valid
                    map.info[a.y][a.x] = false;    // mark the pos as visited
                    pq.enqueue(new PathNode(node, a, a.dist(dst) + node.cost, node.cost + 1));  // push into PQ
                }
            }
        }
        return null;
    }

    function pathInfo(name, path, calc) {
        return {
            path: path,
            calc: calc,
            name: name
        }
    }

    function compare(node1, node2) {
        return node1.value - node2.value;
    }

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
