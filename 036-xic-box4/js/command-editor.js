/*
    str.slice(-1) -> str.slice(str.length, -1) 这个神奇的用法
    str.slice(0, -1)
*/
var CommandEditor = function (commandExecutor) {
    var $container = document.querySelector('.commander');
    var $lines = document.querySelector('.commander-lines');
    var $marks = document.querySelector('.commander-marks');
    var $editor = document.querySelector('.commander-editor');
    var $history = document.querySelector('.commander-history');

    $editor.addEventListener('input', function(e){ check(); });

    var clear = true;
    var historyCount = 0;
    var pendingCommand = [];
    var executor = commandExecutor;

    function parse(lines) {
        for (var i in lines) {
            if (lines[i].slice(-1)===';')
                lines[i] = lines[i].slice(0, -1);
            executor.parseCommand(lines[i]);
        }
    }

    function check() {
        var input = $editor.value;

        // if error, keep validating
        if (!clear)
            clear = validateInput(input);

        // check if input complete
        if (!checkInputComplete(input))
            return;

        // remove '\n' from the end
        input = input.slice(0, -1);

        // validate input
        clear = validateInput(input);
        if (!clear) {
            $editor.value = input;
            return;
        }

        // update editor
        addHistory(input);
        updateLine();
        updateMark();
        $editor.value = '';

        // if input ends with ';', continue
        if (input.slice(-1) === ';') {
            pendingCommand.push(input.slice(0, -1));
        } else {
            pendingCommand.push(input);
            parse(pendingCommand);
            pendingCommand = [];
        }
    }

    function validateInput(input) {
        if (input.slice(-1) === ';')
            input = input.slice(0, -1);
        if (executor.validateCommand(input)) {
            setFlag(historyCount, '');
            return true;
        } else {
            setFlag(historyCount, ' error');
            return false;
        }
    }

    function checkInputComplete(input) {
        // if not pressing enter, return
        if (input.slice(-1) !== '\n')
            return false;

        // if input is empty, return
        if (input.trim() === '') {
            $editor.value = '';
            return false;
        }
        return true;
    }

    function addHistory(input) {
        // for (var i = 0; i < input.length; i++) {
            var p = document.createElement('p');
            p.innerHTML = input;
            $history.appendChild(p);
            historyCount += 1;
        // }
    }

    function updateLine() {
        var lines = '';
        for (var i = 1; i <= historyCount + 1; i++)
            lines += '<div class="commander-lines-item">' + i + '</div>';
        $lines.innerHTML = lines;
    }

    function updateMark() {
        createMark(1);
    }

    function createMark(type) {
        var mark = document.createElement('div');
        mark.className = 'commander-mark-item';
        mark.innerHTML = type ? '&gt;&gt;' : '&nbsp;';
        $marks.appendChild(mark);
    }

    function setFlag(index, flag) {
        var lineItems = $lines.getElementsByTagName('div');
        lineItems[index].className = 'commander-lines-item' + flag;
    }
}
