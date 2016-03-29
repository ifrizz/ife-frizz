
var aqiData = {};

// elements
var inputCity  = document.getElementById('aqi-city-input'),
    inputAqi   = document.getElementById('aqi-value-input'),
    button     = document.getElementById('add-btn');
    table      = document.getElementById("aqi-table");
    checkmarks = document.getElementsByClassName ('checkmark');

// input validators
var CityValidator = {
    pattern : /^[A-Za-z\u4E00-\u9FA5]+$/,
    errorMessage : "* Input only characters"
};

var AqiValidator = {
    pattern : /^\d+$/,
    errorMessage : "* Input a nonnegative integer"
}

var validate = function(element, validator) {
    var tips = element.parentElement.nextElementSibling;
    var mark = element.nextElementSibling;

    // validate
    if (element.value.trim().match(validator.pattern)){
        tips.style.display = 'none';
        mark.style.display = 'inline-block';
    } else {
        tips.style.display = 'block';
        mark.style.display = 'none';
        tips.innerHTML = validator.errorMessage;
    }

    // check if all fields are completed
    if (checkAllFields()) {
        button.className = '';
    } else {
        button.className = 'disable';
    }
}

function checkAllFields() {
    for (var i=0; i<checkmarks.length; i++) {
        if (checkmarks[i].style.display == 'none')
            return false;
    }
    return true;
}

function resetAllFields() {
    inputCity.value = "";
    inputAqi.value = "";
    button.className = 'disable';
    for (var i=0; i<checkmarks.length; i++)
        checkmarks[i].style.display = 'none';
}

// add data
function addAqiData() {
    var city = inputCity.value.trim(),
        aqi  = inputAqi.value.trim();
    aqiData[city] = aqi;
}

// show data table
function renderAqiList() {
    var txt = "<tr><th>City</th><th>AQI</th><th>Option</th></tr>";
    for (var item in aqiData)
        txt += "<tr><td>"+ item + "</td><td>" + aqiData[item] + "</td><td><button data-item='" + item + "'>Delete</button></td></tr>";
    table.innerHTML = item ? txt : "";
}

// add button
function addBtnHandle() {
    if (button.className == "") {
        addAqiData();
        renderAqiList();
        resetAllFields();
     }
}

// delete button
function delBtnHandle (item) {
    delete aqiData[item];
    renderAqiList();
}

function init() {

    // add listener to input
    inputCity.addEventListener ('input', function(event) { validate(inputCity, CityValidator); });
    inputAqi.addEventListener  ('input', function(event) { validate(inputAqi, AqiValidator);   });

    // add listener to add botton
    button.className = "disable";
    button.addEventListener("click", addBtnHandle);

    // add listener to all delete buttons
    document.getElementById('aqi-table').addEventListener("click", function(event) {
        if (event.target.nodeName.toLowerCase() == 'button')
            delBtnHandle (event.target.dataset.item)
    });
}
