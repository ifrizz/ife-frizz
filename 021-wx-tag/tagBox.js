/******************************************************************
西文
回车 ：\n
tab  ：\t
空格 ：\s
为了正则匹配，需要找到对应的unicode编码
全角指一个字符占用两个标准字符位置的状态，只在做文字处理时才用到全角. 中文标点默认为全角.
中文逗号, : \uff0c
中文句号。: \u3002
中文顿号、: \u3001
中文空格  : \u0020
中文分号；：\uff1b
*******************************************************************/

function TagEditor($parentDOM){
    if($parentDOM === undefined)
        $parentDOM = document.body;
    var $boxDOM = document.createElement("div");
        $boxDOM.className = "tag-box";
        $boxDOM.innerHTML = "<div class=\"tag-input\"><label>Tag</label><input></input><p class=\"tag-input-tip\">注意：标签最多100字符</p></div><div class=\"tag-show\"><ul class=\"tag-container\"></ul></div>";
        $parentDOM.appendChild($boxDOM);
    var $containerDOM = $boxDOM.getElementsByClassName ("tag-container")[0];   
    var $inputDOM = $boxDOM.childNodes[0].childNodes[1];  
        $inputDOM.addEventListener("keyup", keyAct);
    var $tipDOM = $boxDOM.childNodes[0].childNodes[2];
    var $tagDOMs = $containerDOM.getElementsByTagName("div"); 
    var splitPattern  = /\s+/g;
    var replacePattern = /(\n)|(\t)|(,)|(\.)|(\uff0c)|(\u3002)|(\u3001)|(\u0020)|(\uff1b)/g;
    var maxTagLength = 100;

    function keyAct(e){
        if($inputDOM.value.length < maxTagLength){
            $tipDOM.style.display = "none";
            if(e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 188 || e.keyCode == 190 || e.keyCode == 186) 
                manageInput();
            if(e.keyCode == 32)
                if($inputDOM.value[$inputDOM.selectionStart-1] == " ")
                    manageInput();
        }else{
            $tipDOM.style.display = "block";
        }
    }

    function manageInput(){
        var data = $inputDOM.value.replace(replacePattern, " ").trim().split(splitPattern);
        for(var i = 0; i < data.length; i++)
            if(data[i].length > 0 && checkTag(data[i]))
                addTag(data[i]);
        $inputDOM.value = null;
    }

    function checkTag(value){
        for(var i = 0; i < $tagDOMs.length; i++)
            if($tagDOMs[i].innerHTML===value)
                return false;
        return true;
    }

    function addTag(value){
        if($tagDOMs.length == 10){
            removeTag($tagDOMs[0]);
        }
        var $tagDOM = document.createElement("div");
        $tagDOM.innerHTML = value;
        $tagDOM.addEventListener("click", function(){removeTag($tagDOM);});
        $containerDOM.appendChild($tagDOM);
    }

    function removeTag(ele){
        ele.parentNode.removeChild(ele);
    }

    function getTags(){
        var tagArray = [];
        for(var i = 0; i < $tagDOMs.length; i++)
            tagArray.push($tagDOMs[i].innerHTML);
        return tagArray;
    }
}

function TagPuttor($parentDOM){
    if($parentDOM === undefined)
        $parentDOM = document.body;
    var $boxDOM = document.createElement("div");
        $boxDOM.className = "tag-box";
        $boxDOM.innerHTML = "<div class=\"tag-puttor\"><textarea></textarea><p class=\"tag-puttor-tip\">注意：允许输入小于300字符</p><button class=\"tag-puttor-btn\">Add</button></div><div class=\"tag-show\"><div class=\"tag-container\"></div></div>";
        $parentDOM.appendChild($boxDOM);
    var $containerDOM = $boxDOM.getElementsByClassName ("tag-container")[0];   
    var $puttorDOM = $boxDOM.childNodes[0].childNodes[0];  
        $puttorDOM.addEventListener("keydown", keyAct);
    var $tipDOM = $boxDOM.childNodes[0].childNodes[1];
    var $btnDOM = $boxDOM.childNodes[0].childNodes[2];
        $btnDOM.addEventListener("click", btnAct);
    var $tagDOMs = $containerDOM.getElementsByTagName("div");   
    var splitPattern  = /\s+/g;
    var replacePattern = /(\n)|(\t)|(,)|(\.)|(\uff0c)|(\u3002)|(\u3001)|(\u0020)|(\uff1b)/g;
    var maxInputLength = 300;

    function keyAct(){
        if($puttorDOM.value.length < maxInputLength){
            $tipDOM.style.display = "none";
        }else{
            $tipDOM.style.display = "block";
        }
    }
    
    function btnAct(){
        if($puttorDOM.value.length < maxInputLength){
            manageInput();
        }
    }
    
    function manageInput(){
        var data = $puttorDOM.value.replace(replacePattern, " ").trim().split(splitPattern);
        for(var i = 0; i < data.length; i++)
            if(data[i].length > 0 && checkTag(data[i]))
                addTag(data[i]);
        $puttorDOM.value = null;
    }

    function checkTag(value){
        for(var i = 0; i < $tagDOMs.length; i++)
            if($tagDOMs[i].innerHTML===value)
                return false;
        return true;
    }

    function addTag(value){
        if($tagDOMs.length == 10){
            removeTag($tagDOMs[0]);
        }
        var $tagDOM = document.createElement("div");
        $tagDOM.innerHTML = value;
        $tagDOM.addEventListener("click", function(){removeTag($tagDOM);});
        $containerDOM.appendChild($tagDOM);
    }

    function removeTag(ele){
        ele.parentNode.removeChild(ele);
    }

    function getTags(){
        var tagArray = [];
        for(var i = 0; i < $tagDOMs.length; i++)
            tagArray.push($tagDOMs[i].innerHTML);
        return tagArray;
    }
}

var tagPuttorInstance = new TagPuttor();

var tagInstance = new TagEditor();
