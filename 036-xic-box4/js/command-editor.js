/*
    str.slice(-1) -> str.slice(str.length, -1) 这个神奇的用法
    str.slice(0, -1)
*/
var CommandEditor = function (commandParser) {
    var $container = document.querySelector('.commander');
    var $lines = document.querySelector('.commander-lines');
    var $marks = document.querySelector('.commander-marks');
    var $editor = document.querySelector('.commander-editor');
    var $history = document.querySelector('.commander-history');

    $editor.addEventListener('input', function(e){ update(e); });

    var parser = commandParser;

    function validate(lines) {
    }

    function update(e) {
        // if not pressing enter, return
        var input = $editor.value;
        if (input.slice(-1) !== '\n')
            return;

        // if input is empty, return
        if (input.trim() === '') {
            $editor.value = '';
            return;
        }

        // remove '\n' from the end
        input = input.slice(0, -1);

        // update lines number
        var inputLines = input.split('\n');
        updateLine(inputLines.length);

        // if input ends with ';', continue
        if (input.slice(-1) === ';')
            return;

        // reset input area
        $editor.value = '';

        // update history
        addHistory(inputLines);
        updateMark(inputLines.length);
    }

    function addHistory(input) {
        for (var i = 0; i < input.length; i++) {
            var p = document.createElement('p');
            p.innerHTML = input[i];
            $history.appendChild(p);
        }
    }

    function updateLine(len) {
        len += $history.getElementsByTagName('p').length + 1;
        var line = '';
        for (var i = 1; i <= len; i++)
            line += '<div class="commander-lines-item">' + i + '</div>';
        $lines.innerHTML = line;
    }

    function updateMark(len) {
        for (var i = 0; i < len-1; i++)
            createMark(0);
        createMark(1);
    }

    function createMark(type) {
        var mark = document.createElement('div');
        mark.className = 'commander-mark-item';
        mark.innerHTML = type ? '&gt;&gt;' : '&nbsp;';
        $marks.appendChild(mark);
    }
}
