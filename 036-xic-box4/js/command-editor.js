/*  Notes:

    (1)
    str.slice(-1) -> str.slice(str.length, -1) 这个神奇的用法
    str.slice(0, -1)

    (2)
    监听其它DOM发来的log事件，在历史记录里面打印log信息ヽ(●´ω｀●)ﾉ
    costumeEvent:
    var event = new CustomEvent('eventName', {'detail': data});
    $element.addEventListener('eventName', ...);
    $element.dispatchEvent(event);

    (3)
    监听回车，并且按回车的时候textarea里面不换航
    e.preventDefault(); ****** 这个好用哭了嘤嘤嘤 ***** 完美解决因为input是在keydown之后才响应ヽ(●´ω｀●)ﾉ

    (4)
    强制改textarea内容之后防止光标移动  ↓
    $textarea.selectionStart & $textarea.selectionEnd

    (5)
    scroll自动移到activate的那行附近，嗯……
    container.scrollTop = rowToScrollTo.offsetTop;
    优秀！

    (6)
    更新一下输入框的高度……editor终于可以往下拖了(´・ω・`)
    获取DOM的高度：
    $DOM.clientHeight: includes padding
    $DOM.offsetHight: includes padding, scrollbar and borders
*/
var CommandEditor = function (commandExecutor) {

    // 强迫症少女 ↓ 完蛋了最下面的弧度不一致_(・ω・｣ ∠)_
    var $lines = document.querySelector('.commander-lines');
    var $marks = document.querySelector('.commander-marks');
    var $editor = document.querySelector('.commander-editor');
    var $history = document.querySelector('.commander-history');
    var $container = document.querySelector('.commander');
    var $linesWrapper = document.querySelector('.commander-lines-wrapper');
    var $marksWrapper = document.querySelector('.commander-marks-wrapper');

    $editor.addEventListener('keydown', function(e){ checkInputKey(e); });
    $editor.addEventListener('input', function(e){ updateCheck(e); });
    window.addEventListener('log', function(e){ log(e) });

    var clear = true;
    var historyCount = 0;
    var pastIndex = 0;
    var pastCommands = [];
    var pendingCommands = [];
    var executor = commandExecutor;

    // check enter
    function checkInputKey(e) {
        var keycode = e.keyCode;
        var len = pastCommands.length;
        if (keycode == 13) {
            finalCheck();
            e.preventDefault();
        }
        if (!len)
            return;
        if (keycode == 38) {
            pastIndex = pastIndex - 1 <= 0 ? 0 : pastIndex - 1;
            $editor.value = pastCommands[pastIndex];
            e.preventDefault();
        }
        if (keycode == 40) {
            pastIndex = pastIndex + 1 >= len ? len - 1 : pastIndex + 1;
            $editor.value = pastCommands[pastIndex];
            e.preventDefault();
        }
    }

    function finalCheck() {
        var input = $editor.value;
        clear = validateInput(input);
        if (!clear) return;

        // mark一下scroll酱的位置
        var prevScroll = $editor.offsetTop - $container.scrollTop;

        // update editor
        addHistory(input);
        updateLine();
        createMark(1);
        $editor.value = '';

        // if input ends with ';', add into pending lines and continue
        if (input.slice(-1) === ';') {
            input = input.slice(0, -1);
            pendingCommands.push(input.toLowerCase());
        } else {
            pendingCommands.push(input.toLowerCase());
            parse(pendingCommands);
            pendingCommands = [];
        }
        pastCommands.push(input);
        pastIndex = pastCommands.length;

        // 新的scroll酱そこだ！
        if (prevScroll >= 200)
            $container.scrollTop = $editor.offsetTop - prevScroll;

        // resize
        // 艾玛我好蠢，写好函数忘记调用
        updateSize();
    }

    // triggered on input
    function updateCheck(e) {
        var input = $editor.value;
        var cursor = $editor.selectionStart;
        $editor.value = input.toUpperCase();
        $editor.selectionStart = cursor;
        $editor.selectionEnd = cursor;  // 迷之作弊2333

        if (!clear)
            clear = validateInput(input); // if error, keep validating
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

    // 更！新！编！辑！器！大！小！辣！！！
    function updateSize() {
        // chrome酱说一行是20px！chrome酱长得这么可爱一定说什么都对！！（张嘴，吃药。
        var height = $history.offsetHeight;
        console.log(height);
        $linesWrapper.style.height = (height + 400) + 'px';   // 这个逗比又把变量名拼错了（我选择狗带
        $marksWrapper.style.height = (height + 400) + 'px';
        $editor.style.height = 400 + 'px';
    }
}
