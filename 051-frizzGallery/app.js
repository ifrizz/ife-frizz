

var imgNum = 6, imgList = [];
var g = QAQ(document.getElementById("testbox"), "pubu", imgList);


for (var i = 0; i < imgNum; i++){
    var width = Math.floor(Math.random() * 300 + 300);
    var height = Math.floor(Math.random() * 300 + 300);
    var color = Math.random().toString(16).substring(2,8);
    var myurl = "http://placehold.it/" + width + "x" + height + "/" + color + "/fff";
    imgList.push(myurl);
}

g.show();

// g.add("https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png").show();
