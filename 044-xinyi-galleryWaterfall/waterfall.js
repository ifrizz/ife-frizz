
var Waterfall = function() {
    this.settings = {
        imgNum: 7,
        baseUrl: "http://placehold.it/",
        numInCol: 4,
        paddingVal: "16px"
    }
}

Waterfall.prototype.init = function() {
    this.Create();
    this.Render();
}

// create photos
Waterfall.prototype.Create = function() {
    this.imgSrc = [];
    for (var i = 0; i < this.settings.imgNum; i++){
        var width = Math.floor(Math.random() * 300 + 300);
        var height = Math.floor(Math.random() * 300 + 300);
        var color = Math.random().toString(16).substring(2,8);
        this.imgSrc.push({
            width: width,
            height: height,
            url: this.settings.baseUrl + width + "x" + height + "/" + color + "/fff",
            ratio: width / height
        });
    }
}

// select the shortest column when insert a new picture
Waterfall.prototype.Selector = function() {
    var idx = 0;
    for (var i = 0; i < accHeight.length; i++) {
        if (accHeight[i] < accHeight[idx]) { idx = i; }
    }
    return idx;
}

Waterfall.prototype.Render = function() {
    accHeight = [];
    for (var i = 0; i < this.imgSrc.length; i++){
        if (i < this.settings.numInCol){
            var div_imgCol = document.createElement("div");
            div_imgCol.className = "img-col";
            div_imgCol.id = "col-" + i.toString();
            document.getElementById("wrap").appendChild(div_imgCol);
            accHeight.push(0);
        }

        var idx = this.Selector(), 
            div_imgContainer = document.createElement("div"),
            img = document.createElement("img");
        
        accHeight[idx] += 1 / this.imgSrc[i].ratio;
        
        div_imgCol = document.getElementById("col-" + idx.toString());
        div_imgContainer.className = "item";
        img.setAttribute("src", this.imgSrc[i].url);
        div_imgContainer.appendChild(img);
        div_imgCol.appendChild(div_imgContainer);               
    }    

    
    var items = document.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++) {
        items[i].style.padding = this.settings.paddingVal;
    }
}
