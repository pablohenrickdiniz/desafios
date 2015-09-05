define(function(){
    //construtor linhas,colunas
    var matriz = function(rows,cols){
        var self = this;
        self.matriz = [];
        self.rows = rows;
        self.cols = cols;
    };

    //verifica se a posição i,j está alinhado entre si,ej e ei, ej na vertical, na horizontal ou na diagonal
    matriz.inline = function(si,sj,ei,ej,i,j){
        var max_i = Math.max(si,ei);
        var max_j = Math.max(sj,ej);
        var min_i = Math.min(si,ei);
        var min_j = Math.min(sj,ej);


        var interval = i >= min_i && i <= max_i && j >= min_j && j <= max_j;
        var same = (si == ei && ei == i) || (sj == ej && ej == j);
        var diff = (Math.abs(si-i) == Math.abs(sj - j)) && (Math.abs(ei-i) == Math.abs(ej-j));

        if(interval){
            if(same || diff){
                return true;
            }
        }
        return false;
    };

    //obtém valor da posição x,y
    matriz.prototype.get = function(x,y){
        var self = this;
        if(self.matriz[x] == undefined){
            self.matriz[x] = [];
        }
        return self.matriz[x][y];
    };

    //altera o vakir da posição x,y com val
    matriz.prototype.set = function(x,y,val){
        var self = this;
        if(self.matriz[x] == undefined){
            self.matriz[x] = [];
        }
        self.matriz[x][y] = val;
    };

    //percorre os indices da posição xa,ya até a posição xb,yb na horizontal, vertical, e diagonal se estiverem alinhados
    matriz.prototype.forLine = function(xa,ya,xb,yb,func){

        if(matriz.inline(xa,ya,xb,yb,xa,ya)){
            var val;
            var result;
            var ja;
            var jb;
            var ia;
            var ib;

            var diff_x = xa-xb;
            var diff_y = ya-yb;
            var size_x = Math.abs(diff_x);
            var size_y = Math.abs(diff_y);
            var ix = diff_x < 0?1:diff_x > 0?-1:0;
            var iy = diff_y < 0?1:diff_y > 0?-1:0;
            var count_x = 0;
            var count_y = 0;
            var i = xa;
            var j = ya;

            while(count_x <= size_x || count_y <= size_y){
                val = this.get(i,j);
                result = func(val,[i,j],this);
                if(result != undefined){
                    break;
                }
                i+=ix;
                j+=iy;
                count_x++;
                count_y++;
            }
        }
    };

    //percorre todos os índices da matriz
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
                afterRow(x);
            }
        }
    };

    //percorre todos os índices da matriz aleatoriamente
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




