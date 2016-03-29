
var aqiData = {};
var inputCity = document.getElementById('aqi-city-input'),
    inputAqi = document.getElementById('aqi-value-input'),
    button = document.getElementById('add-btn');

function checkCityInput (input, tips) {

}

function checkAqiInput () {

}

function addAqiData() {
    // get custom input
    var city = inputCity.value.trim(),
        aqi  = inputAqi.value.trim();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle (city) {
  // do sth.

  renderAqiList();
}

function init() {
    // add listener to input
    inputCity.addEventListener("unfocus", function(event) {
        checkCityInput(inputCity.value, inputCity.parentElement.nextElementSibling);
    });
    inputAqi.addEventListener("unfocus", function(event) {
        checkCityInput(inputAqi.value, inputAqi.parentElement.nextElementSibling);
    });
    // add listener to add botton
    button.className = "disable";
    button.addEventListener("click", addBtnHandle);
    // add listener to all delete button
    document.getElementById('aqi-table').addEventListener("click", function(event){
        if (event.target.nodeName.toLowerCase() == 'button')
            delBtnHandle (event.target)
    });
}
