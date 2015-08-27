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
            var val  = self.get(x,y);
            var index = [x,y];
            var result = func(val,index,self.matriz);
            if(result != undefined){
                break;
            }
        }
        if(typeof afterRow == 'function'){
            afterRow();
        }
    }
};


Matriz.prototype.map = function(func){
    var self = this;
    var matriz = new Matriz(self.rows,self.cols);
    for(var x = 0; x < self.rows;x++){
        for(var y = 0; y < self.cols;y++){
            var result = func(self.get(x,y),[x,y],self.matriz);
            matriz.set(x,y,result);
        }
    }
    return matriz;
};

Matriz.prototype.suffle = function(){
    var self = this;
    var rows = self.rows;
    var cols = self.cols;
    for(var i = 0; i < rows;i++){
        for(var j = 0; j < cols;j++){
            var x = Math.floor(Math.random()*rows);
            var y = Math.floor(Math.random()*cols);
            var tmp = self.get(x,y);
            var val = self.get(i,j);
            self.set(x,y,val);
            self.set(i,j,tmp);
        }
    }
};

Matriz.prototype.recursiveFor = function(i, j,callback,onComplete,time){
    var self = this;
    i = i == undefined ? 0 : i;
    j = j == undefined ? 0 : j;
    if (j == self.cols) {
        j = 0;
        i++;
    }

    if (i < self.rows) {
        setTimeout(function(){
            callback(self.get(i,j),[i,j],self);
            self.recursiveFor(i,j+1,callback,onComplete,time)
        },time);
    }
    else {
        onComplete(self);
    }
};


