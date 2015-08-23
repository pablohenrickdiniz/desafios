define(function(){
    var matriz = function(rows,cols){
        var self = this;
        self.matriz = [];
        self.rows = rows;
        self.cols = cols;
    };

    matriz.prototype.get = function(x,y){
        var self = this;
        if(self.matriz[x] == undefined){
            self.matriz[x] = [];
        }
        return self.matriz[x][y];
    };

    matriz.prototype.set = function(x,y,val){
        var self = this;
        if(self.matriz[x] == undefined){
            self.matriz[x] = [];
        }
        self.matriz[x][y] = val;
    };

    matriz.prototype.forEach = function(func,afterRow){
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

    matriz.prototype.randomForEach = function(func){
        var self = this;
        var keys = Object.keys(self.matriz).suffle();
        for(var i = 0; i < keys.length;i++){
            var x = keys[i];
            var keys_b = Object.keys(x).suffle();
            for(var j =0; j < keys_b.length;j++){
                var y = keys_b[j];
                var result = func(self.get(x,y),[x,y],self.matriz);
                if(result != undefined){
                    break;
                }
            }
        }
    };
    return matriz;
});




