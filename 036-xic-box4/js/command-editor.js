/*  Notes:

    str.slice(-1) -> str.slice(str.length, -1) 这个神奇的用法
    str.slice(0, -1)

    costumeEvent:
    var event = new CustomEvent('eventName', {'detail': data});
    $element.addEventListener('eventName', ...);
    $element.dispatchEvent(event);
*/
var CommandEditor = function (commandExecutor) {
    var $container = document.querySelector('.commander');
    var $lines = document.querySelector('.commander-lines');
    var $marks = document.querySelector('.commander-marks');
    var $editor = document.querySelector('.commander-editor');
    var $history = document.querySelector('.commander-history');

    $editor.addEventListener('input', function(e){ check(); });
    window.addEventListener('log', function(e){ log(e) });

    var clear = true;
    var historyCount = 0;
    var pendingCommand = [];
    var executor = commandExecutor;

    // triggered on input
    function check() {
        var input = $editor.value;
        if (!clear)
            clear = validateInput(input); // if error, keep validating
        if (!checkInputComplete(input))   // check if input complete
            return;

        input = input.slice(0, -1);       // remove '\n' from the end
        clear = validateInput(input);     // validate input
        if (!clear) {
            $editor.value = input;
            return;
        }

        // update editor
        addHistory(input);
        updateLine();
        createMark(1);
        $editor.value = '';

        // if input ends with ';', add into pending lines and continue
        if (input.slice(-1) === ';') {
            pendingCommand.push(input.slice(0, -1).toLowerCase());
        } else {
            pendingCommand.push(input.toLowerCase());
            parse(pendingCommand);
            pendingCommand = [];
        }
    }

    // parse all pending lines
    function parse(lines) {
        for (var i in lines) {
            if (lines[i].slice(-1)===';')
                lines[i] = lines[i].slice(0, -1);
            executor.parseCommand(lines[i]);
        }
    }

    // triggered by 'log' event
    // print log info on history panel
    function log(e) {
        console.log(e.detail);
        addHistory(e.detail);
        updateLine();
        createMark(1);
    }

    // check if input is a valid expression
    function validateInput(input) {
        if (input.slice(-1) === ';')
            input = input.slice(0, -1);
        if (executor.validateCommand(input.toLowerCase())) {
            setFlag(historyCount, '');
            return true;
        } else {
            setFlag(historyCount, ' error');
            return false;
        }
    }

    // check if input is completed
    function checkInputComplete(input) {
        if (input.slice(-1) !== '\n')  // if not pressing enter, return
            return false;
        if (input.trim() === '') {     // if input is empty, return
            $editor.value = '';
            return false;
        }
        return true;
    }

    // add input content intu history panel
    function addHistory(input) {
        var p = document.createElement('p');
        p.innerHTML = input;
        $history.appendChild(p);
        historyCount += 1;
    }

    // update line numbers
    function updateLine() {
        var lines = '';
        for (var i = 1; i <= historyCount + 1; i++)
            lines += '<div class="commander-lines-item">' + i + '</div>';
        $lines.innerHTML = lines;
    }

    // add a new line mark
    function createMark(type) {
        var mark = document.createElement('div');
        mark.className = 'commander-mark-item';
        mark.innerHTML = type ? '&gt;&gt;' : '&nbsp;';
        $marks.appendChild(mark);
    }

    // set error flag in certain line
    function setFlag(index, flag) {
        var lineItems = $lines.getElementsByTagName('div');
        lineItems[index].className = 'commander-lines-item' + flag;
    }
}
