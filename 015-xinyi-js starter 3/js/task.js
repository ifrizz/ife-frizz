var source_data = document.querySelectorAll('#source li'), 
    render_area = document.getElementById('result');


/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */

function getData() {
  var embedded_data = []
  for (var i = 0; i < source_data.length; i++) {
    data = source_data[i].innerHTML;
    place = data.substr(0, 2);
    quality = data.substring(data.indexOf('<b>') + 3, data.indexOf('</b>'))
    embedded_data.push([place, quality])
  }
  // console.log(embedded_data)

  return embedded_data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */

function st(arr1, arr2) {
  return arr1[1] > arr2[1];
}

function sortAqiData(data) {
  data = data.sort(st);
  return data
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  str = "";
  for (var i = 1; i <= data.length; i++) {
    str += "<li>第" + i + "名：" + data[i-1][0] + "空气质量：<b>" + data[i-1][1] + "</b></li>"
  }
  render_area.innerHTML = str;

}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {
  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  document.getElementById('sort-btn').addEventListener('click', btnHandle);
}
