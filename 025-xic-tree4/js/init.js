function addDomNode (parent, type, name, alias) {
    // div
    var div = document.createElement("div");
    div.className = type + (type=="star" ? " list-folder close" : " list-folder");
    parent.appendChild(div);

    // span
    var span = document.createElement("span");
    span.className = "list-title";
    span.innerHTML = name;
    div.appendChild(span);
    span.addEventListener('click', function(event){ toggleFold(div) });

    if (!alias) return div;

    // alias
    var aspan = document.createElement("span");
    aspan.innerHTML = alias;
    span.appendChild(aspan);
    return div;
}

function addDomItem (parent, strings) {
    var div = document.createElement("div");
    div.className = "list-item";
    parent.appendChild(div);

    // add descriptions >w<
    strings.forEach( function(item){
        var span = document.createElement("span");
        span.innerHTML = item;
        div.appendChild(span);
    });
    return div;
}

function init () {
    var list = document.getElementById("list-container");

    // traverse data
    for (var season of data) { // traverse seasons
        var ss = addDomNode(list, "season", season.name.toUpperCase());
        for (var cons of season.cons) { // travers constellations
            var c = addDomNode(ss, "constellation", cons.name, cons.alias.toUpperCase());
            for (var star of cons.stars) { // travers stars
                var s = addDomNode(c, "star", star.name, star.alias);
                addDomItem(s, star.info);
            }
        }
    }

    var trie = new SuffixTrie();

    var input = "Sells sea shells by the sea shore";
    input = input.split(" ");
    for (var i in input) {
        trie.add(input[i].toLowerCase(), input[i].toLowerCase());
    }
    console.log(trie.get("ell"));
}
