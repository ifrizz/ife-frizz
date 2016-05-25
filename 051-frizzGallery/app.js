; (function(global) {
	var imgNum = 15, 
		imgList = [],
		layoutDict = {
			"PUZZLE" : "puzzle",
			"WATERFALL" : "pubu",
			"BARREL" : "mutong"
		};


	for (var i = 0; i < imgNum; i++){
	    var width = Math.floor(Math.random() * 300 + 300);
	    var height = Math.floor(Math.random() * 300 + 300);
	    var color = Math.random().toString(16).substring(2,8);
	    var myurl = "http://placehold.it/" + width + "x" + height + "/" + color + "/fff";
	    imgList.push(myurl);
	}

	var show = function(_layout) {
		layout = _layout || "puzzle";
		console.log(layout);
		var g = QAQ(document.getElementById("testbox"), layout, imgList);
		g.show();
	}


	// g.add("https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png").show();

	// alert(document.getElementsByClassName('active')[0].innerHTML);

	var lists = document.getElementsByTagName('li');
	for (var i = 0; i < lists.length; i++) {
		var _show = function(idx) {
				return function() {
					document.getElementsByClassName('active')[0].className = "";
					lists[idx].className = "active";
					new_layout = layoutDict[lists[idx].firstChild.innerHTML]
					show(new_layout);
				}
			};

		lists[i].addEventListener("click", _show(i));
		
	}

	show();

}(window));