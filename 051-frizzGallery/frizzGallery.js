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
          // 喵同学: 遍历parent dom中的所有dom，对含有图片的dom执行set css？
********************************************************/
; (function(global) {

    //函数返回值为new之后的对象，使得可以非显式声明对象。
    var frizzGallery = function($parentDOM, layoutType, imageList){
        return new frizzGallery.init($parentDOM, layoutType, imageList);
    };

    frizzGallery.prototype = {
        layoutType : undefined,

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
            this.layout.add(url);
            return this;
        },

        show : function(){
            this.layout.show();
            return this;
        },

        setup : function($parentDOM, imageList){
            layoutType = this.layout;

            //初始化时调用
            if((!$parentDOM) && (!imageList)){
                this.layout.setup(this.$parentDOM, this.imageList);
                return;
            }
            //修改时调用
            if($parentDOM)
                this.parentDOM = $parentDOM;
            if(imageList)
                this.imageList = imageList;
            this.validate();
            this.layout.setup(this.parentDOM, this.imageList);
            return this;
        },

        scrollLoading : function() {
            layoutType.scrollLoading();
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
                // this.$parentDOM.className = 'image-mutong';
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
                this.$parentDOM.innerHTML = "";

                // the callback function will append the preloaded images

                var callback = function() {
                    var $containerDOM = document.createElement("div");
                    $containerDOM.className = "mutong-layout";
                    $parentDOM.appendChild($containerDOM);

                    for (var i = 0; i < imageObjs.length; i++) {

                        if (i % numInRow === 0){
                            var $div_imgRow = document.createElement("div");
                            $div_imgRow.className = "img-mutong-row";
                            $containerDOM.appendChild($div_imgRow);
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
                    addDisplayEvent($img_div, $img_div.src);
                    $img_div.onload = function() {
                        if (--picNum === 0) { callback(); }
                    }
                }
            },

            scrollLoading :function() {

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
            nextIdx : 0,
            maxShow : 10,
            imageObjs : [],


            setup : function($parentDOM, imageList){
                this.$parentDOM = $parentDOM;
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
                    renderPics = this.renderPics;

                if(picNum === 0){
                    console.log("Empty ImageList.");
                    return;
                }
                this.$parentDOM.innerHTML = "";

                // preset the layouts
                var $containerDOM = document.createElement("div");
                $containerDOM.className = "pubu-layout";
                this.$parentDOM.appendChild($containerDOM);


                for (var i = 0; i < this.numInCol; i++) {
                    var $div_imgCol = document.createElement("div");
                    $div_imgCol.className = "img-pubu-col";
                    $div_imgCol.style.width = (100 / this.numInCol).toString() + "%";
                    $div_imgCol.id = "col-" + i.toString();
                    $containerDOM.appendChild($div_imgCol);
                }

                // the callback function will append the preloaded images

                var callback = function() {
                    this.nextIdx = this.imageObjs.length > this.maxShow ? this.maxShow : this.imageObjs.length;
                    renderPics.bind(this)(0, this.nextIdx);
                };

                // preload the images and get the width AND height

                this.imageObjs = [];
                this.nextIdx = 0;
                for (var i = 0; i < this.imageList.length; i++){
                    var $img_div = new Image(), _this = this;
                    $img_div.src = this.imageList[i];
                    _this.imageObjs.push($img_div);
                    // args["imageObjs"].push($img_div);
                    addDisplayEvent($img_div, $img_div.src);
                    $img_div.onload = function() {
                        if (--picNum === 0) { callback.bind(_this)(); }
                    }
                }


            },
            scrollLoading : function() {
                var start = this.nextIdx, end = start + this.maxShow;
                end = end > this.imageObjs.length ? this.imageObjs.length : end;
                this.nextIdx = end;
                // console.log()
                alert("我真的在加载哟!!!"); 
                this.renderPics(start, end);
            },

            renderPics : function(start, end) {
                if (start < 0 || start >= this.imageObjs.length || end > this.imageObjs.length) { return ;}
                // console.log(this);
                for (var i = start; i < end; i++) {
                    var idx = this.selector(),
                        $div_imgContainer = document.createElement("div"),
                        $img_div = this.imageObjs[i],
                        $div_imgCol = document.getElementById("col-" + idx.toString());
                    
                    $img_div.ratio = $img_div.height / $img_div.width;

                    // $div_imgContainer.className = "padding";
                    $div_imgContainer.style.padding = this.paddingVal.toString() + "px";
                    // $div_imgContainer.style.height = ($img_div.ratio * ($div_imgCol.offsetWidth - 2 * this.paddingVal)).toString() + "px";
                    $div_imgContainer.appendChild($img_div);
                    $div_imgCol.appendChild($div_imgContainer);
                }

                // this.nextIdx += end - start;
            },


            add : function(url){
                this.imageList.push(url);
                this.maxShow += 1;
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
                // console.log(this.$parentDOM);
                this.$parentDOM.innerHTML = "";
                var $containerDOM = document.createElement("div");
                $containerDOM.className = "puzzle-layout";
                this.$parentDOM.appendChild($containerDOM);


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
                    addDisplayEvent($img, $img.src);
                    $box.appendChild($img);
                }
                $containerDOM.appendChild($box);
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

            scrollLoading :function() {

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
        imageDisplay.init(this.imageList);
        this.layout = layout[layoutType || "puzzle"];
        this.validate();
        this.setup();
    };

    frizzGallery.init.prototype = frizzGallery.prototype;

    global.frizzGallery = global.QAQ = frizzGallery;





    ///////////////////////////////////////
    // Fullscreen display
    ///////////////////////////////////////

    var addDisplayEvent = function(DOM, imageURL) {
        DOM.addEventListener("click", function(e) { imageDisplay.display(imageURL); });
    }

    var imageDisplay = (function() {
        var curImageIndex;      // index of displayed image
        var imageList;          // reference to image list

        // get the instance of display object
        var instance;
        function getDisplay() {
            return instance || (instance = createDisplay());
        }

        // create display object
        function createDisplay() {
            var div = document.body.appendChild(document.createElement("div"));
            var prevBtn = div.appendChild(document.createElement("div"));
            var image = div.appendChild(document.createElement("img"));
            var nextBtn = div.appendChild(document.createElement("div"));

            div.className = "gallery-display";
            prevBtn.className = "gallery-display-left-arrow";
            nextBtn.className = "gallery-display-right-arrow";
            prevBtn.addEventListener('click', function(e){ prev(); });
            nextBtn.addEventListener('click', function(e){ next(); });
            div.addEventListener('click', function(e){
                if (e.target != image && e.target != prevBtn && e.target != nextBtn)
                    hide();
            });
            function show() { div.style.display = "flex"; }
            function hide() { div.style.display = "none"; }
            function setImage(imageURL) { image.src = imageURL; }

            return {
                show: show,
                hide: hide,
                setImage: setImage
            }
        }

        function display(imageURL) {
            console.log("display " + imageURL);
            curImageIndex = imageList.indexOf(imageURL);
            getDisplay().setImage(imageURL);
            getDisplay().show();
        }

        function hide(){
            getDisplay().hide();
        }

        function prev() {
            curImageIndex--;
            if (curImageIndex < 0)
                curImageIndex = imageList.length - 1;
            getDisplay().setImage(imageList[curImageIndex]);
        }

        function next() {
            curImageIndex++;
            if (curImageIndex >= imageList.length)
                curImageIndex = 0;
            getDisplay().setImage(imageList[curImageIndex]);
        }

        function init(list) {
            imageList = list;
        }

        return {
            init: init,
            display: display
        }
    })()

    ///////////////////////////////////////
    // end fullscreen display
    ///////////////////////////////////////


    /******** 拖到页面尾部后动态加载图片  *********/


    window.onscroll = function() {
        var scrollH = document.body.scrollHeight,
            clientH = document.body.clientHeight,
            scrollTop = document.body.scrollTop;
        var t = scrollH - clientH - scrollTop;
        if (t <= 0) {
            frizzGallery.prototype.scrollLoading();
        }
    };

}(window));
