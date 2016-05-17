/*******************************************************
 参考jQuery的实现模式写了基本设计
 1. 避免了使用 new 关键字, 库的调用方式为:
        QAQ(parentDOM, imageList).show(); //传入父DOM对象和图片列表imageList 用show()显示布局
      也可这样调用
        Album(parentDOM, imageList).show();
      也可这样调用
        var gallery = QAQ(parentDOM, imageList);
        gallery.show();
  2.在某几个函数中返回this，使其支持链式语法，所以可以这样调用
        QAQ(parentDOM, imageList).add(url).show();
      还可以这样调用
        var gallery = QAQ(parentDOM, imageList).show();
  3.疑问，需向喵酱请教如何应用singleton
  4.疑问，这里考虑的实现方式是传入parentDOM, 然后用代码进行DOM填充。 找到的 jQuery ui 并不是这么做的，这种方式可能并不优雅。
          考虑这里不对DOM进行任何的增删操作，只负责改变样式，要如何做？
********************************************************/
; (function(global) {
    
    //函数返回值为new之后的对象，使得可以非显式声明对象。 
    var Album = function(parentDOM, imageList){
        return new Album.init(parentDOM, imageList);
    }
    
    Album.prototype = {
        
        //检测 imageList 和 parentDOM 是否正有效
        validate : function(){
            
        },
        
        //生成，显示木桶布局
        mutongLayout : function(){
            
        },
        
        //生成，显示拼图布局
        puzzleLayout : function(){
            
        },
        
        //生成，显示瀑布布局
        waterfallLayout : function(){
            
        },
        
        //添加图片
        add : function(){
            
        },
        
        //使用 strategy pattern 显示布局
        //即依据加载进来的图片的数目，选择执行不同的布局函数。
        show : function(){
            
        },
        
        //预先申请div， 避免昂贵操作（？疑问， 可能会给不同的布局的实现增加工作量和代码复杂度）
        setup : function(){
            
        }
        
        //以及其他各种接口
    }
    
    Album.init = function(parentDOM, imageList){
        this.imageList = imageList;
        this.parentDOM = parentDOM;
       
        this.validate();
        this.setup();
    }
    
    Album.init.prototype = Album.prototype;
    
    global.Album = global.QAQ = Album;
    
}(window));