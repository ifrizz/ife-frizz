/*

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

var Executor = function (Manager) {
    var manager = Manager;
    var actionQueue = [];
    var timer;

    var validator = [{
            pattern: /^go\s+(\d+)\s*/,
            action: [function(step) { manager.moveSquare(+step, 0, 0); }]
        },{
            pattern: /^tun\s+(lef|rig|bac)\s*/,
            action: [function(dir) {
                    var dirmap = {"lef" : -1, "bac": -2, "rig":-3};
                    manager.moveSquare(0, 0, dirmap[dir]);
                }]
        },{
            pattern: /^tra\s+(lef|top|rig|bot)\s+(\d+)\s*/,
            action: [function(dir, step) {
                    var dirmap = {"lef" : 4, "top": 1, "rig":2, "bot":3};
                    manager.moveSquare(+step, dirmap[dir], 0);
                }]
        },{
            pattern: /^mov\s+(lef|top|rig|bot)\s+(\d+)\s*/,
            action: [
                function(dir, step) {
                    var dirmap = {"lef" : 4, "top": 1, "rig":2, "bot":3};
                    manager.moveSquare(0, 0, dirmap[dir]);
                },
                function(dir, step) {
                    var dirmap = {"lef" : 4, "top": 1, "rig":2, "bot":3};
                    manager.moveSquare(+step, dirmap[dir], 0);
                }]
        },{
            pattern: /^biud\s*/,
            action: [function() { manager.buildWall(); }]
        },{
            pattern: /^bru\s+(#[0-9a-e]{6}|#[0-9a-e]{3})\s*/,
            action: [function(color) { manager.colorWall(color); }]
        },{
            pattern: /^mov to\s+(\d+),\s*(\d+)\s+(a\*|bfs|best)/,
            action: [function(x, y, type) { parsePath(manager.getPath(new V2(+x,+y), type)); }]
        },
    ];

    function parse(input) {
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

    function parsePathNode(node) {
        actionQueue.push({
            action: function(dir) { manager.moveSquare(0, 0, dir); },
            args: [node[0]]
        }),
        actionQueue.push({
            action: function(dir, step) { manager.moveSquare(step, dir, 0); },
            args: node
        })
    }

    function parsePath(path) {
        console.log(path);
        /*
        var last = path.shift(), cur, sum = last;
        while(sum && path.length > 0) {
            cur = path.shift();
            if (!cur.equal(last)) {
                actionQueue.push({action: validator[3].action[0], args: []})
        }*/
        for (var i in path) {
            parsePathNode(path[i]);
        }
        execute();
    }

    function validate(input) {
        for (var i in validator) {
            if (validator[i].pattern.test(input))
                return true;
        }
        return false;
    }

    function execute() {
        if (timer) return;
        var command = actionQueue.shift();
        if (!command) return;
        command.action.apply(this, command.args);
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            execute();
        }, Config.INTERVAL);
    }

    return {
        validateCommand: validate,
        parseCommand: parse
    }
}
