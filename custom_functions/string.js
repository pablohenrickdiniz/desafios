String.prototype.map = function(func) {
    var size = this.length;
    var map = [];
    for (var i = 0; i < size; i++) {
        map[i] = func(this.charAt(i), i, map);
    }
    return map;
};

String.prototype.forEach = function(func){
    for(var i = 0; i < this.length;i++){
        var result = func(this.charAt(i),i,this);
        if(result != undefined){
            break;
        }
    }
};


