function Matriz(rows,cols){
    var self = this;
    self.matriz = [];
    self.rows = rows;
    self.cols = cols;
}

Matriz.prototype.get = function(x,y){
    var self = this;
    if(self.matriz[x] == undefined){
        self.matriz[x] = [];
    }
    return self.matriz[x][y];
};

Matriz.prototype.set = function(x,y,val){
    var self = this;
    if(self.matriz[x] == undefined){
        self.matriz[x] = [];
    }
    self.matriz[x][y] = val;
};

Matriz.prototype.forEach = function(func,afterRow){
    var self = this;
    for(var x = 0; x < self.rows;x++){
        for(var y = 0; y < self.cols;y++){
            var result = func(self.get(x,y),[x,y],self.matriz);
            if(result != undefined){
                break;
            }
        }
        if(typeof afterRow == 'function'){
            afterRow();
        }
    }
};

Matriz.prototype.suffle = function(){
    var self = this;
    self.forEach(function(cartao,index){
        var x = Math.floor(Math.random()*self.rows);
        var y = Math.floor(Math.random()*self.cols);
        var tmp = self.get(x,y);
        self.set(x,y,cartao);
        self.set(index[0],index[1],tmp);
    });
};


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