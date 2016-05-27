; (function(global) {
	var imgNum = 18, 
		imgList = [],
		layoutDict = {
			"PUZZLE" : "puzzle",
			"WATERFALL" : "pubu",
			"BARREL" : "mutong"
		},
		g = QAQ(document.getElementById("container"), layout, imgList),
		layout = "puzzle";

	var genPic = function() {
	    var width = Math.floor(Math.random() * 300 + 300);
	    var height = Math.floor(Math.random() * 300 + 300);
	    var color = Math.random().toString(16).substring(2,8);
	    var myurl = "http://placehold.it/" + width + "x" + height + "/" + color + "/fff";
	    return myurl;
	}

	var show = function(_layout) {
		layout = _layout || "puzzle";
		g = QAQ(document.getElementById("container"), layout, imgList);
		g.show();
	}

	var add = function() {
		var newurl = genPic();
		g.add(newurl);
	}

	// alert(document.getElementsByClassName('active')[0].innerHTML);

	for (var i = 0; i < imgNum; i++){
	    imgList.push(genPic());
	}

	var lists = document.getElementsByTagName('li');
	for (var i = 0; i < lists.length; i++) {
		if (lists[i].className !== "add") {
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
		else {

			lists[i].addEventListener("click", add);	
		}
		
	}

	show();

}(window));