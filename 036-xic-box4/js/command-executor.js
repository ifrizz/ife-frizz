/*
Notes:

RegEx.test(string) - return true / false
str.match(RegEx) - return [matching string, substr1, substr2, ..., matching index, org str]

func.apply(thisArg, [argsArray]) - can use array
func.call(thisArg[, arg1[, arg2[, ...]]]) - must use named object

array.push() - push to tail
array.pop() - pop from tail
array.unshift() - push to head
array.shift() - dequeue from head

+str - str2Int
*/

var Executor = function () {
    var actionQueue = [];
    var timer;

    // ---------------------- pattern list -----------------------

    var tunmap = {"lef" : -1, "bac": -2, "rig":-3};
    var dirmap = {"lef" : 4, "top": 1, "rig":2, "bot":3};

    var validator = [{
            pattern: /^go\s+(\d+)\s*$/,
            action: [function(step) { Manager.moveSquare(+step, 0, 0); }]
        },{
            pattern: /^tun\s+(lef|rig|bac)\s*$/,
            action: [function(tun) { Manager.moveSquare(0, 0, tunmap[tun]); }]
        },{
            pattern: /^tra\s+(lef|top|rig|bot)\s+(\d+)\s*$/,
            action: [function(dir, step) { Manager.moveSquare(+step, dirmap[dir], 0); }]
        },{
            pattern: /^mov\s+(lef|top|rig|bot)\s+(\d+)\s*$/,
            action: [
                function(dir, step) { Manager.moveSquare(0, 0, dirmap[dir]); },
                function(dir, step) { Manager.moveSquare(+step, dirmap[dir], 0); }]
        },{
            pattern: /^biud\s*$/,
            action: [function() { Manager.buildWall(); }]
        },{
            pattern: /^bru\s+(#[0-9a-f]{3}|#[0-9a-f]{6})?\s*$/,
            action: [function(color) { Manager.colorWall(color); }]
        },{
            pattern: /^mov to\s+(\d+),\s*(\d+)\s+(a\*|bfs|best|dfs)\s*$/,
            action: [function(x, y, type) { parsePath( Manager.getPath({x:+x, y:+y}, type)); }]
        },
    ];

    // ---------------------- API -----------------------

    return {
        validateCommand: validateCommand,
        parseCommand: parseCommand
    }

    // ---------------------- public methods -----------------------

    function validateCommand(input) {
        for (var i in validator) {
            if (validator[i].pattern.test(input))
                return true;
        }
        return false;
    }

    function parseCommand(input) {
        var matched;
        for (var i in validator) {
            if (validator[i].pattern.test(input)) {
                matched = input.match(validator[i].pattern);
                matched.shift();
                for(var j in validator[i].action)
                    actionQueue.push({action: validator[i].action[j], args: matched});
                break;
            }
        }
        execute();
    }

    // ---------------------- private methods -----------------------

    // execute task queue
    function execute() {
        if (timer) return;
        var command = actionQueue.shift();
        if (!command) return;
        command.action.apply(this, command.args);
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            execute();
        }, CONFIG.VALUE.INTERVAL);
    }

    // bind moves in the same direction
    function parsePath(path) {
        if (!path) {
            Manager.log(CONFIG.LOG.ERROR_PATH);
            return;
        }
        Manager.log(path.name + "君进行了 " + path.calc + " 次运算，路径长度 " + path.path.length);
        path = path.path;
        var last = path.shift(),
            cur = last,
            sum = [0, 0];
        while(cur || path.length > 0) {
            if (cur[0] != last[0] || sum[1] >= CONFIG.VALUE.MAX_STEP) {
                parsePathNode(sum);
                sum = [0, 0];
            }
            last = cur;
            sum = [last[0], last[1] + sum[1]];
            cur = path.shift();
        }
        parsePathNode(sum);
        execute();
    }

    function parsePathNode(node) {
        if (CONFIG.VALUE.COLUMN !== 100)
        actionQueue.push({
            action: function(dir) { Manager.moveSquare(0, 0, dir); },
            args: [node[0]]
        });
        actionQueue.push({
            action: function(dir, step) { Manager.moveSquare(step, dir, 0); },
            args: node
        })
    }
}
