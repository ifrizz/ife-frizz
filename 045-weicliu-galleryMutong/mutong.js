
var Mutong = function() {
  this.settings = {
    imgNum: 52,
    baseUrl: "http://placehold.it/",
    numInRow: 4
  }
}

Mutong.prototype.init = function() {
  this.Create();
  this.Render();
}

// create photos
Mutong.prototype.Create = function() {
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

Mutong.prototype.Render = function() {

  for (var i = 0; i < this.imgSrc.length; i++){
    if (i % this.settings.numInRow == 0){
      var div_imgRow = document.createElement("div");
      div_imgRow.className = "img-row";
      document.getElementById("wrap").appendChild(div_imgRow);
    }

    var div_imgContainer = document.createElement("div");
    div_imgContainer.className = "padding";
    div_imgContainer.style.flex = this.imgSrc[i].ratio;
    var img = document.createElement("img");
    img.setAttribute("src", this.imgSrc[i].url);
    div_imgContainer.appendChild(img);
    div_imgRow.appendChild(div_imgContainer);
  }
}
