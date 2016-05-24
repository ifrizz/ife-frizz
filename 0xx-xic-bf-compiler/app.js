var bfDialog = {
    dialogDOM : undefined,
    sum : 15,
    outputString : "",
    singleLineLength : 80,
    m_outputProcess : function(){
        var strArray = [];
        var subStr = "";
        var singleLineLength = this.singleLineLength;
        //小于第一行长度，直接输出
        if(this.outputString.length <= singleLineLength - 5){
            subStr = "$bf: " + this.outputString;
            strArray.push(subStr);
            return strArray;
        }
        //多行的情况
        //首先处理第一行
        subStr = "$bf: " + this.outputString.substring(0, singleLineLength - 5);
        strArray.push(subStr);
        //接下来的完整行
        var cnt = Math.floor((this.outputString.length - (singleLineLength - 5)) /  singleLineLength);
        var i = 0;
        for(; i < cnt; i++){
            subStr = this.outputString.substring((singleLineLength - 5) + singleLineLength * i, (singleLineLength - 5) + singleLineLength * (i + 1));
            strArray.push(subStr);
        }
        //最后一行
        subStr = this.outputString.substring((singleLineLength - 5) + singleLineLength * cnt);
        strArray.push(subStr);

        return strArray;
    },
    v_refresh : function(strArray){
        var extraNum = this.dialogDOM.getElementsByClassName("dialog-row").length + strArray.length -  this.sum;

        var i = 0;
        if(extraNum > 0){
            var collectDOM = this.dialogDOM.getElementsByClassName("dialog-row");
            for(; i < extraNum; i++)
                this.dialogDOM.removeChild(collectDOM[0]);
        }

        //删除光标行
        if(this.dialogDOM.getElementsByClassName("dialog-row").length > 0)
            this.dialogDOM.removeChild(this.dialogDOM.getElementsByClassName("dialog-row")[this.dialogDOM.getElementsByClassName("dialog-row").length - 1]);

        //输出文本
        i = 0;
        for(; i < strArray.length; i++){
            var rowDOM = document.createElement("div");
            rowDOM.className = "dialog-row";
            rowDOM.innerHTML = strArray[i];
            this.dialogDOM.appendChild(rowDOM);
        }

        //输出作者行
        var rowDOM = document.createElement("div");
        rowDOM.className = "dialog-row";
        rowDOM.innerHTML = "brainfxxk Compiler@Cecilia";
        this.dialogDOM.appendChild(rowDOM);

        //输出光标行
        var rowDOM = document.createElement("div");
        rowDOM.className = "dialog-row";
        rowDOM.innerHTML = "$bf:<span id = 'dialog-row-shining'>_</span>";
        this.dialogDOM.appendChild(rowDOM);
    },
    v_resizeHandler : function(){
        //呵呵

    },
    c_setup : function(dialogDOM){
      bfDialog.dialogDOM = dialogDOM;
    },
    c_compile : function(output){
      this.outputString = output;
      this.v_refresh(this.m_outputProcess());

    }
}

bfDialog.c_setup(document.getElementById("dialog"));

function compile() {
  bfDialog.c_compile(brainfxxk(document.getElementById("codeBox").value));
}
