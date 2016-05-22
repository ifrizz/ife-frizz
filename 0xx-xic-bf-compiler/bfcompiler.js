function brainfxxk(input){
    var cells = [];
    for (var i=0; i<3000; ++i) cells[i] = 0;
    var output = "", ptr = 0, loopStk = [];
    for (var i=0; i<input.length; ++i) {
        switch(input.charAt(i)) {
        case '>': ptr++; break;
        case '<': ptr--; break;
        case '+': cells[ptr]++; if (cells[ptr] >= 256) cells[ptr] = 0; break;
        case '-': cells[ptr]--; if (cells[ptr] < 0) cells[ptr] = 255; break;
        case '[': if (cells[ptr] == 0) while (input.charAt(i) != ']') ++i; else loopStk.push(i); break;
        case ']': if (cells[ptr] == 0) loopStk.pop(); else i = loopStk[loopStk.length-1]; break;
        case '.': output += String.fromCharCode(cells[ptr]); break;
        default: break;
        }
        if (ptr < 0 || ptr >= 3000) return "out of memory";
    }
    return output;
}
