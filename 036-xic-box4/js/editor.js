/*
    str.slice(-1); 这个神奇的用法
*/
var CommandEditor = function () {
    var $container = document.querySelector('.commander');
    var $lines = document.querySelector('.commander-lines');
    var $marks = document.querySelector('.commander-marks');
    var $editor = document.querySelector('.commander-editor');
    var $history = document.querySelector('.commander-history');

    $editor.addEventListener('input', function(e){check($editor.value);});

    function check(input) {
        var lines = input.split('\n');
        updateLine(lines.length);
        // if (input.slice(-1) == ';')
        //     return;
        // Control.parse(input);
    }

    function updateLine(length) {
        var line = '', mark = '';
        for (var i = 1; i <= length; i++) {
            line += '<div class="commander-lines-item">' + i + '</div>';
            mark += '<div class="commander-mark-item>">&gt;&gt;</div>';
        }
        $lines.innerHTML = line;
        // $marks.innerHTML = mark;
    }
}
