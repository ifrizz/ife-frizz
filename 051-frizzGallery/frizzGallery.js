/*******************************************************
 参考jQuery的实现模式写了基本设计
 1. 避免了使用 new 关键字, 库的调用方式为:
        QAQ(parentDOM, imageList).show(); //传入父DOM对象和图片列表imageList 用show()显示布局
      也可这样调用
        frizzGallery(parentDOM, imageList).show();
      也可这样调用
        var gallery = QAQ(parentDOM, imageList);
        gallery.show();
  2.在某几个函数中返回this，使其支持链式语法，所以可以这样调用
        QAQ(parentDOM, imageList).add(url).show();
      还可以这样调用
        var gallery = QAQ(parentDOM, imageList).show();
  3.疑问，这里考虑的实现方式是传入parentDOM, 然后用代码进行DOM填充。 找到的 jQuery ui 并不是这么做的，这种方式可能并不优雅。
          考虑这里不对DOM进行任何的增删操作，只负责改变样式，要如何做？
  4.我需要找一个妹子抚慰我受伤的心灵
********************************************************/
; (function(global) {
    
    //函数返回值为new之后的对象，使得可以非显式声明对象。 
    var frizzGallery = function($parentDOM, layoutType, imageList){
        return new frizzGallery.init($parentDOM, layoutType, imageList);
    };
    
    frizzGallery.prototype = { 
        validate : function(){
            if(this.$parentDOM.constructor.toString().indexOf("Element") === -1)
                throw "Need a HTMLDOM";
            if(this.imageList.constructor.toString().indexOf("Array") === -1)
                throw "Need an Array ";
            if(!this.layout)
                throw "Not supported layout type"
            return this;
        },
        
        add : function(url){
            this.layout.add.bind(this.layout);
            this.layout.add(url);
            return this;
        },
        
        show : function(url){
            this.layout.show.bind(this.layout);
            this.layout.show();
            return this;
        },
        
        setup : function($parentDOM, imageList){
            //初始化时调用 
            if((!$parentDOM) && (!imageList)){
                //bind更保险一些, 可以用call
                this.layout.setup.bind(this.layout);
                this.layout.setup(this.$parentDOM, this.imageList);
                return;
            }
            //后期修改调用
            if($parentDOM)
                this.parentDOM = $parentDOM;
            if(imageList)
                this.imageList = imageList;
            this.validate();
            //bind更保险一些, 可以用call  = = 为什么不用call呢..
            this.layout.setup.bind(this.layout);
            this.layout.setup(this.parentDOM, this.imageList);
            return this;
        }
    };
    var layout = {
		mutong : {
            imageList : undefined,
            $parentDOM : undefined,
            numInRow: 4,

            setup : function($parentDOM, imageList){
                this.$parentDOM = $parentDOM;
                this.$parentDOM.className = 'image-mutong';
                this.imageList = imageList;
            },

            show : function(){
                var picNum = this.imageList.length,
                    imageObjs = [],
                    numInRow = this.numInRow,
                    $parentDOM = this.$parentDOM;

                if(picNum === 0){
                    console.log("Empty ImageList.");
                    return;
                }


                // the callback function will append the preloaded images

                var callback = function() {
                    for (var i = 0; i < imageObjs.length; i++) {
                         
                        if (i % numInRow === 0){
                            var $div_imgRow = document.createElement("div");
                            $div_imgRow.className = "img-mutong-row";
                            $parentDOM.appendChild($div_imgRow);
                        }

                        var $div_imgContainer = document.createElement("div"),
                            $img_div = imageObjs[i];

                        $img_div.ratio = $img_div.width / $img_div.height;
                        $div_imgContainer.className = "padding";
                        $div_imgContainer.style.flex = $img_div.ratio;
                        $div_imgContainer.appendChild($img_div);
                        $div_imgRow.appendChild($div_imgContainer);      
                    }
                };

                // preload the images and get the width AND height

                for (var i = 0; i < this.imageList.length; i++){
                    var $img_div = new Image();                        
                    $img_div.src = this.imageList[i];
                    imageObjs.push($img_div);

                    $img_div.onload = function() {
                        if (--picNum === 0) { callback(); }
                    }    
                }      
            },
            
            
            add : function(url){
                this.imageList.push(url);
                this.show();
            }

		},
		
		pubu : {
            imageList : undefined,
            $parentDOM : undefined,
            numInCol : 4,
            paddingVal : 16,

            
            setup : function($parentDOM, imageList){
                this.$parentDOM = $parentDOM;
                this.$parentDOM.className = 'image-pubu';
                this.imageList = imageList;
            },

            selector : function() {
                var idx = 0, pos = Number.MAX_VALUE;
                for (var i = 0; i < this.numInCol; i++) {
                    // i = 0
                    var ele = document.getElementById('col-' + i.toString());
                    var cur_pos = ele.getBoundingClientRect().bottom;

                    if (cur_pos < pos) { 
                        idx = i; 
                        pos = cur_pos;
                    }
                }
                return idx;
            },

            show : function(){
                var picNum = this.imageList.length, 
                    padding = this.paddingVal,
                    selector = this.selector.bind(this),
                    imageObjs = [];

                if(picNum === 0){
                    console.log("Empty ImageList.");
                    return;
                }

                // preset the layouts
                
                for (var i = 0; i < this.numInCol; i++) {
                    var $div_imgCol = document.createElement("div");
                    $div_imgCol.className = "img-pubu-col";
                    $div_imgCol.style.width = (100 / this.numInCol).toString() + "%";
                    $div_imgCol.id = "col-" + i.toString();
                    this.$parentDOM.appendChild($div_imgCol);
                }

                // the callback function will append the preloaded images

                var callback = function() {

                    for (var i = 0; i < imageObjs.length; i++) {
                        var idx = selector(), 
                            $div_imgContainer = document.createElement("div"),
                            $img_div = imageObjs[i],
                            $div_imgCol = document.getElementById("col-" + idx.toString());

                        $img_div.ratio = $img_div.height / $img_div.width;
                        
                        $div_imgContainer.className = "item";
                        $div_imgContainer.style.padding = padding.toString() + "px";
                        $div_imgContainer.style.height = ($img_div.ratio * ($div_imgCol.offsetWidth - 2 * this.paddingVal)).toString() + "px";
                        $div_imgContainer.appendChild($img_div);
                        $div_imgCol.appendChild($div_imgContainer);      
                    }
                };

                // preload the images and get the width AND height

                for (var i = 0; i < this.imageList.length; i++){
                    var $img_div = new Image();                        
                    $img_div.src = this.imageList[i];
                    imageObjs.push($img_div);

                    $img_div.onload = function() {
                        if (--picNum === 0) { callback(); }
                    }    
                }      
            },
            
            
            add : function(url){
                this.imageList.push(url);
                this.show();
            }

			
		},
		
		puzzle : {
			imageList : undefined,
            $parentDOM : undefined,
            
            setup : function($parentDOM, imageList){
                this.$parentDOM = $parentDOM;
                this.imageList = imageList;
            },
            
            show : function(){
                if(this.imageList.length === 0){
                    console.log("Empty ImageList.");
                    return;
                }
                console.log(this.$parentDOM);
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
            },
            
            handleExpView : function(){
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
                
            },
            
            add : function(url){
                this.imageList.push(url);
                this.show();
            }
		}
	};
	
    frizzGallery.init = function($parentDOM, layoutType, imageList){
        if(!$parentDOM){
            throw "Missing parentDOM";
        }
        this.$parentDOM = $parentDOM;
        this.imageList = imageList || [];
        this.layout = layout[layoutType || "puzzle"];
        this.validate();
        this.setup();
    };
    
    frizzGallery.init.prototype = frizzGallery.prototype;
    
    global.frizzGallery = global.QAQ = frizzGallery;
    
}(window));