/*
    又一个splice魔幻用法wwwwww
    A[x] = A.splice(y, 1, A[x])[0]
*/

// k->left = 2*k, k->right = 2*k+1, k->parent = k/2
// compare(o1, o2): -1: o1<o2, 0: o1==o2, 1: o1>o2

var PriorityQueue = function(Compare) {

    var arr = ['#'];

    return {
        enqueue: enqueue,
        dequeue: dequeue,
        size: function() { return arr.length - 1; },
        empty: function() { return arr.length <= 1; }
    }

    function enqueue(item) {
        var k = arr.length;
        arr.push(item);
        while(k > 1) {
            var parent = k >> 1;
            if (Compare(arr[k], arr[parent]) >= 0) break;
            swap(arr, k, parent);
            k = parent;
        }
    }

    function dequeue() {
        swap(arr, 1, arr.length-1);
        var min = arr.pop();
        var k = 1;
        while(k * 2 < arr.length) {
            var child = arr[k*2+1] ? (Compare(arr[k*2], arr[k*2+1]) < 0 ? k * 2 : k * 2 + 1) : k * 2;
            if (Compare(arr[k], arr[child]) <= 0) break;
            swap(arr, k, child);
            k = child
        }
        return min;
    }

    function swap(array, a, b) {
        array[a] = array.splice(b, 1, array[a])[0];
    }
}
