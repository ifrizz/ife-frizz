//-------------------- 全局变量 --------------
var CHART_WIDTH = 800;
var CHART_HEIGHT = 500;
var chart = document.getElementById("aq-chart");
var select = document.getElementById("city-select");
//用于保存城市名，方便访问。
var cityKey = [];
//wwwww
var box = [];
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
var selectState = {
    startDay : new Date("2016-01-01"),
    cityIndex : 0,
    type : 1
};

//-------------------- init page ------------
function initCitySelector(aqiSourceData) {
    for(cityData in aqiSourceData){
        var selectNode = document.createElement('option');
        selectNode.innerHTML = cityData;
        cityKey.push(cityData);
        select.appendChild(selectNode);
    }
}

function initChart(){
    var i;
    for(i = 0; i < 400; i++){
        var div = createDiv();
        chart.appendChild(div);
        box.push(div); 
    }
}

function createDiv(){
    var div = document.createElement('div');
    div.className = 'aqi-chart-col';
    return div;
}

function addListener(select){
    //给三种类型绑定函数
    var yearCheck = document.getElementById("year");
    yearCheck.addEventListener("click", function(){handleTypeSelect(1,  selectState);}, false);
    var monthCheck = document.getElementById("month");
    monthCheck.addEventListener("click", function(){handleTypeSelect(2, selectState);}, false);
    var weekCheck = document.getElementById("week");
    weekCheck.addEventListener("click", function(){handleTypeSelect(3, selectState);}, false);
    //给城市Select绑定函数
    select.addEventListener("click", function(){handleCitySelect(select, selectState);}, false);
}

function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 366; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}


//-------------------- handle selection -----------
function handleCitySelect(select, selectState){
    selectState.startDay = new Date("2016-01-01");
    for(var i = 0; i<select.options.length; i++){  
        if(select.options[i].selected){  
            if(i != selectState.cityIndex){
                selectState.cityIndex = i;
                setCols(selectState.type, selectState.startDay, aqiSourceData[cityKey[selectState.cityIndex]]);
            }
            break;  
        }  
    } 
}

function handleTypeSelect(type, selectState){
    if(type != selectState.type){
        selectState.type = type;
        selectState.startDay = new Date("2016-01-01");
        setCols(selectState.type, selectState.startDay, aqiSourceData[cityKey[selectState.cityIndex]]);
    } 
}

function isLeap(year){
    return false;
}

function setCols(type, dat, data){
    var w, h;
    var cnt, num;
    var y = dat.getFullYear();
    switch(type){
        case 1:
            if(isLeap(y)){
                w = CHART_WIDTH / 366;
                num = 366;
            }else{
                w = CHART_WIDTH / 365;
                num = 365;
            }
            break;
        case 2:
            //w = CHART_WIDTH / monthLen[m];
            //num = monthLen[m];
            w = CHART_WIDTH / 30;
            num = 30;
            break;
        case 3:
            w = CHART_WIDTH / 7;
            num = 7;
    }
    //清除所有小格子显示
    for(cnt = 0; cnt < 400; ++cnt)
        box[cnt].style = null;  

    for(cnt = 0; cnt < num; ++cnt, dat.setDate(dat.getDate() + 1)){
        datStr = getDateStr(dat);
        val = data[datStr];
        h =  val / 500 * CHART_HEIGHT;
        
        box[cnt].style.height = h + "px";
        box[cnt].style.width = w + "px";
        box[cnt].style.bottom = 0 + "px";
        box[cnt].style.left = w * cnt + "px";
        box[cnt].style.transition = "height, 1s";
        box[cnt].title = dat.toDateString();
        
        if(val < 50){
            box[cnt].style.backgroundColor = "#00e400";
        }else if(val < 100){
            box[cnt].style.backgroundColor = "#ffff00";
        }else if(val < 150){
            box[cnt].style.backgroundColor = "#ff7e00";
        }else if(val < 200){
            box[cnt].style.backgroundColor = "#ff0000";
        }else if(val < 300){
            box[cnt].style.backgroundColor = "#7e0023";
        }else{
            box[cnt].style.backgroundColor = "#888888";
        }
    }
    
}

function init() {
    initChart();
    initCitySelector(aqiSourceData);
    addListener(select);
    setCols(selectState.type, selectState.startDay, aqiSourceData[cityKey[selectState.cityIndex]]);
}

init();

/*跨浏览器addListener支持
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}*/




