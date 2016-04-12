var left_in = document.getElementById('left-in'),
    left_out = document.getElementById('left-out'),
    right_in = document.getElementById('right-in'),
    right_out = document.getElementById('right-out'),
    number_input = document.getElementById('number-input'),
    que = document.getElementById('queue');


function handler(id) {
  value = number_input.value;
  if (id == "left_in") {
    str = "<div class=\"number\">" + value + "</div>";
    que.innerHTML = str + que.innerHTML;
  }
  if (id == "right_in") {
    str = "<div class=\"number\">" + value + "</div>";
    que.innerHTML = que.innerHTML + str;
  }
  if (id == "left_out") {
    child = que.firstChild;
    value = child.innerHTML;
    alert(value);
    que.removeChild(child);
  }
  if (id == "right_out") {
    child = que.lastChild;
    value = child.innerHTML;
    alert(value);
    que.removeChild(child);    
  }
}

function init() {
  left_in.addEventListener('click', function() {handler("left_in");});
  right_in.addEventListener('click', function() {handler("right_in");});
  left_out.addEventListener('click', function() {handler("left_out");});
  right_out.addEventListener('click', function() {handler("right_out");});

}
