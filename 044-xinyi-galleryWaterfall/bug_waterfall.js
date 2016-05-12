
var Waterfall = function() {
    this.settings = {
        imgNum: 15,
        baseUrl: "http://placehold.it/",
        numInCol: 6,
        paddingVal: "16px",
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
    var idx = 0, pos = Number.MAX_VALUE;
    for (var i = 0; i < this.settings.numInCol; i++) {
        // i = 0
        var ele = document.getElementById('col-' + i.toString());
        var cur_pos = ele.getBoundingClientRect().bottom;
        console.log('~~~~');
        console.log(cur_pos);

        if (cur_pos < pos) { 
            idx = i; 
            pos = cur_pos;
        }
    }
    return idx;
}

Waterfall.prototype.Render = function() {
    // var cols = [];
    for (var i = 0; i < this.settings.numInCol; i++) {
        var div_imgCol = document.createElement("div");
        div_imgCol.className = "img-col";
        div_imgCol.style.width = (100 / this.settings.numInCol).toString() + "%";
        div_imgCol.id = "col-" + i.toString();
        document.getElementById("wrap").appendChild(div_imgCol);
    }

    for (var i = 0; i < this.imgSrc.length; i++){
        var idx = this.Selector(), 
            div_imgContainer = document.createElement("div"),
            img = document.createElement("img");

        console.log(idx);
        
        div_imgCol = document.getElementById("col-" + idx.toString());
        div_imgContainer.className = "item";
        div_imgContainer.style.padding = this.settings.paddingVal;
        img.setAttribute("src", this.imgSrc[i].url);
        div_imgContainer.appendChild(img);
        div_imgCol.appendChild(div_imgContainer);               
    }    

}
