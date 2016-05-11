//封装为ImageShowPuzzle
function ImageShowPuzzle($parentDOM){
    this.imageList = [];
    this.$parentDOM = $parentDOM;    
}

//使用imageList生成拼图
ImageShowPuzzle.prototype.buildPuzzleView = function(){
    if(this.imageList.length === 0){
        console.log("Empty ImageList.");
        return;
    }
    this.$parentDOM.innerHTML = "";
    var picNum = this.imageList.length;
    if(this.imageList.length > 6){
        picNum = 6;
    }
    var $box = document.createElement("div");
    $box.className = "image-puzzle-" + picNum;
    var i = 0;
    for(; i < picNum; i++){
        var $img = document.createElement("img");
        $img.src = this.imageList[i];
        $box.appendChild($img);
    }
    this.$parentDOM.appendChild($box);
    //3图和5图的情况无法用css实现
    this.handleExpView();
    var _this = this;
    //当窗口变化时对3图和5图的情况进行处理
    //注意：只有window能侦测resize事件
    window.addEventListener("resize", _this.handleExpView.bind(_this));
}

//对于3图和5图的情况做特殊处理。
ImageShowPuzzle.prototype.handleExpView = function(){
    if(this.imageList.length === 3){
       var $box = this.$parentDOM.getElementsByClassName("image-puzzle-3")[0];
       $box.childNodes[0].style.width = $box.offsetWidth - this.$parentDOM.offsetHeight / 2.0 + "px" ;
       $box.childNodes[1].style.width = $box.offsetHeight / 2.0 + "px";
       $box.childNodes[2].style.width = $box.offsetHeight / 2.0 + "px";
    }
    if(this.imageList.length === 5){
       var $box = this.$parentDOM.getElementsByClassName("image-puzzle-5")[0];
       $box.childNodes[3].style.height = $box.offsetWidth / 3.0 + "px";
       $box.childNodes[4].style.height = $box.offsetHeight - $box.offsetWidth / 3.0 + "px";
    }
}

//读入图片src数组
ImageShowPuzzle.prototype.inputImages = function(imageList){
    if(imageList.constructor.toString().indexOf("Array") === -1){
        console.log("Wrong input.");
        return;
    }
    this.imageList = imageList;
}

/*
以下代码用于测试和演示执行过程
用于测试，根据输入的数字生成测试的图片链接
*/
function testCaseGen($parentDOM, picNum){
    var imageList = [];
    var i = 0;
    for(; i < picNum; i++){
        var randomColor = ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        var randomSize = Math.floor(Math.random() * 15 + 1) * 100 + 'X' + Math.floor(Math.random() * 15 + 1) * 100;
        imageList.push("http://placehold.it/" + randomSize + "/" + randomColor + "/fff");
    }
    var box = new ImageShowPuzzle($parentDOM);
    box.inputImages(imageList);
    box.buildPuzzleView();
    return box;
}

var count = 0;

function test(){
    count++;
    if(count > 6)
        count = 1;
    testCaseGen(document.body, count);
}


window.addEventListener("click", test);


