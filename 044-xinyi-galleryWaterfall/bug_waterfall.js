
var Waterfall = function() {
    this.settings = {
        imgNum: 15,
        baseUrl: "http://placehold.it/",
        numInCol: 6,
        paddingVal: "16px",
        cols : []
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
        console.log('~~~~');
        console.log(this.settings.cols[i].clientHeight);
        var ele = this.settings.cols[i].lastChild;
        // var ele = document.getElementById('col-' + i.toString()).lastChild;
        if (ele) {
            // console.log(ele);
            // console.log(i)
            console.log(ele.getBoundingClientRect().bottom);
            console.log(ele.clientHeight);
        }
        if(ele) {
            var cur_pos = ele.getBoundingClientRect().bottom;
            if (cur_pos < pos) { 
                idx = i; 
                pos = cur_pos;
            }
        }
        else {
            return i;
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
        this.settings.cols.push(div_imgCol);
        document.getElementById("wrap").appendChild(this.settings.cols[i]);
    }

    for (var i = 0; i < this.imgSrc.length; i++){
        var idx = this.Selector(), 
            div_imgContainer = document.createElement("div"),
            img = document.createElement("img");

        console.log(idx);
        
        // div_imgCol = document.getElementById("col-" + idx.toString());
        div_imgContainer.className = "item";
        div_imgContainer.style.padding = this.settings.paddingVal;
        img.setAttribute("src", this.imgSrc[i].url);
        div_imgContainer.appendChild(img);
        this.settings.cols[idx].appendChild(div_imgContainer);               
    }    

}
