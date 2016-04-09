var Finder = function(){
    return {
        getPath: getPath
    };

    function getPath(src, dst, map, type) {
        return bfs([], src, dst, map);
    }

    function bfs(path, cur, dst, map) {
        // target found
        if(cur.equal(dst))
            return path;
        // bfs
        var adj = getAdj(cur);
        for (var a of adj) {
            if (validatePos(a, map)) {
                map.info[a.y][a.x] = false;
                path.push(cur.to(a));
                var result = bfs(path, a, dst, map);
                if (result)
                    return result;
                path.pop();
            }
        }
        return null;
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
            new V2(pos.x, pos.y-1),
            new V2(pos.x-1, pos.y),
            new V2(pos.x+1, pos.y),
            new V2(pos.x, pos.y+1)
        ];
    }
};
