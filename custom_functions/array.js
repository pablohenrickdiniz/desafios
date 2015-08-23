Array.prototype.suffle = function(){
    var self = this;
    var size = self.length;
    for(var i = 0; i < size;i++){
        var rand_index = Math.floor(Math.random()*size);
        var tmp = self[i];
        self[i] = self[rand_index];
        self[rand_index] = tmp;
    }
};

Array.prototype.contains = function(obj){
    return this.indexOf(obj) != -1;
};

