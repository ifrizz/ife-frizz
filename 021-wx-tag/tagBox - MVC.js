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

function TagModel(tags){
    this.tagList = [];  
    this.tagAdded = new Event(this);
    this.tagRemoved = new Event(this);
}

TagModel.prototype = {
    replacePattern : /(\n)|(\t)|(,)|(\.)|(\uff0c)|(\u3002)|(\u3001)|(\u0020)|(\uff1b)/g,
    
    splitPattern : /\s+/g,
    
    maxTagNumber : 10,
    
    getTags : function(){
        return this.tagList;
        
    },
    
    tagsInput : function(inputData){
        var data = inputData.replace(this.replacePattern, " ").trim().split(this.splitPattern);
        var i = 0;
        for(i = 0; i < data.length; i++)
            if(data[i].length > 0 && this.checkTag(data[i])){
                this.tagList.push(data[i]);
                if(this.tagList.length > this.maxTagNumber)
                    this.tagList.shift();
            }
        this.tagAdded.notify();
    },
    
    checkTag : function(value){
        var i = 0;
        for(i = 0; i < this.tagList.length; i++)
            if(this.tagList[i] == value)
                return false;
        return true;
    },
    
    removeTagAt : function(index){
        var tag = this.tagList[index];
        this.tagList.splice(index, 1);
        this.tagRemoved.notify();
    }
};

function Event(sender){
    this.sender = sender;
    this.listener = [];
}

Event.prototype = {
    attach : function(lsner){
        this.listener.push(lsner);
    },
    
    notify : function(args){
        var i = 0;
        for(i = 0; i < this.listener.length; i++)
            this.listener[i](args);
    }
};

function TagShowView(mdl, ele){
    this.model = mdl;
    this.elements = ele;
    
    this.deleteIndex = -1;
    this.deleteTriggered = new Event(this);
    var sv_this = this;
   
    this.model.tagAdded.attach(function(){ 
            sv_this.showTags(); 
        });
    this.model.tagRemoved.attach(function(){ 
            sv_this.showTags(); 
        });
    
    
}

TagShowView.prototype = {
    rebuildList : function(){
        var $containerDOM, $tagDOM, tag, tagList;
        $containerDOM = this.elements.$container;
        $containerDOM.innerHTML = "";
        
        tagList = this.model.getTags();
        
        var sv_this = this;
        var i = 0;
        for(i = 0; i < tagList.length; i++){
            $tagDOM = document.createElement("div");
            $tagDOM.innerHTML = tagList[i];
            var index = i; //太魔幻了
            $tagDOM.addEventListener("click", function(){sv_this.deleteTriggered.notify(index);});
            $containerDOM.appendChild($tagDOM);
        }
    },
    
    showTags : function(){
        this.rebuildList();
        
    }
};

function TagInputView(mdl, ele){
    this.model = mdl;
    this.elements = ele;
    
    var _this = this;
    
    this.inputTriggered = new Event(this);
    this.$inputDOM = this.elements.$input;
    this.$tipDOM = this.elements.$tip;
    this.$inputDOM.addEventListener("keyup", function(e){ _this.keyAct(e); });    
}

TagInputView.prototype = {
    maxTagLength : 100,
    
    keyAct : function(e){
        if(this.$inputDOM.value.length < this.maxTagLength){
            this.$tipDOM.style.display = "none";
            if(e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 188 || e.keyCode == 190 || e.keyCode == 186){ 
                this.inputTriggered.notify(this.$inputDOM.value);
                this.$inputDOM.value = "";
            }
            if(e.keyCode == 32)
                if(this.$inputDOM.value[this.$inputDOM.selectionStart-1] == " "){
                    this.inputTriggered.notify(this.$inputDOM.value);
                    this.$inputDOM.value = "";
                }
        }else{
            this.$tipDOM.style.display = "block";
        }
    }
};

function TagPuttorView(mdl, ele){
    this.model = mdl;
    this.elements = ele;
    
    var pv_this = this;
    this.inputTriggered = new Event(this);
    
    this.$tipDOM = this.elements.$tip;
    this.$puttorDOM = this.elements.$puttor;
    this.$buttonDOM = this.elements.$btn;
    this.$puttorDOM.addEventListener("keyup", function(e){ pv_this.keyAct(e); });
    this.$buttonDOM.addEventListener("click", function(){ pv_this.btnAct(); });
}

TagPuttorView.prototype = {
    maxInputLength : 300,
    
    keyAct : function(e){
        
        if(this.$puttorDOM.value.length < this.maxInputLength){
            this.$tipDOM.style.display = "none";
        }else{
            this.$tipDOM.style.display = "block";
        }
    },
    
    btnAct : function(){
        if(this.$puttorDOM.value.length < this.maxInputLength){
            this.inputTriggered.notify(this.$puttorDOM.value);
            this.$puttorDOM.value = "";
        }
    }
};

function TagInputController(mdl, tgAdVw, tgShwVw){
    this.model = mdl;
    this.tagAddView = tgAdVw;
    this.tagShowView = tgShwVw;
    
    var c_this = this;
    
    this.tagAddView.inputTriggered.attach(function(inputData){    
       c_this.addTags(inputData);
    });
    
    this.tagShowView.deleteTriggered.attach(function(index){
        c_this.delTag(index);
    });
}

TagInputController.prototype = {
    addTags : function(inputData){
        this.model.tagsInput(inputData);
    },
    
    delTag : function(index){
        this.model.removeTagAt(index);
    }
};
    
var model1 = new TagModel();
var view1_1 = new TagInputView(model1, 
    {
        $tip : document.getElementsByClassName("tag-input-tip")[0],
        $input : document.getElementsByClassName("tag-input")[0].childNodes[2]
    } 
);
var view1_2 = new TagShowView(model1,
    {
        $container : document.getElementsByClassName("tag-container")[1]  
    }
);
var control1 = new TagInputController(model1, view1_1, view1_2);

view1_2.showTags();

var model2 = new TagModel();
var view2_1 = new TagPuttorView(model2, 
    {
        $tip : document.getElementsByClassName("tag-puttor-tip")[0],
        $puttor : document.getElementsByClassName("tag-puttor")[0].childNodes[1],
        $btn : document.getElementsByClassName("tag-puttor-btn")[0],
    } 
);
var view2_2 = new TagShowView(model2,
    {
        $container : document.getElementsByClassName("tag-container")[0]  
    }
);

var control2 = new TagInputController(model2, view2_1, view2_2);
view2_2.showTags();

