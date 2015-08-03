function MatrizCartao(rows, cols) {
    var self = this;
    self.matriz = [];
    self.rows = rows;
    self.cols = cols;
}

MatrizCartao.prototype.add = function (cartao) {
    var self = this;
    for(var x = 0;x < self.rows;x++){
        if(self.get(x).length < self.rows){
            self.get(x).push(cartao);
            break;
        }
    }
};


MatrizCartao.prototype.get = function (x, y) {
    var self = this;
    if (x != undefined && x < self.rows && x >= 0) {

        if (self.matriz[x] == undefined) {
            self.matriz[x] = [];
        }

        if (y == undefined) {
            return self.matriz[x]
        }
        else if (y < self.cols && y >= 0) {
            if(self.matriz[x][y] == undefined && self.matriz[x][y] != null){
                self.matriz[x][y] = null;
            }
            return self.matriz[x][y];
        }
    }

    return null;
};

MatrizCartao.prototype.set = function (x, y, cartao) {
    var self = this;
    if (x < self.rows && y < self.cols && x >= 0 && y >= 0) {
        if (self.matriz[x] == undefined) {
            self.matriz[x] = [];
        }

        self.matriz[x][y] = cartao;
    }
};

/*
MatrizCartao.prototype.suffle = function () {
    var self = this;
    for (var x = 0; x < self.rows; x++) {
        for (var y = 0; y < self.cols; y++) {
            var index_x = Math.floor(Math.random() * self.rows);
            var row = self.get(index_x,x);
            var index_y = Math.floor(Math.random() * index_x.length);
        }
    }
};*/

MatrizCartao.prototype.render = function (element,opcoes) {
    $(element).empty();
    var self = this;
    for (var x = 0; x < self.rows; x++) {
        for (var y = 0; y < self.cols; y++) {
            var slot = document.createElement('div');
            slot.className = 'slot';
            $(slot).width(opcoes.largura);
            $(slot).height(opcoes.altura);
            $(element).append(slot);
            var cartao = self.get(x, y);
            if (cartao != null) {
                $(slot).append(cartao.elemento);
            }
        }
        var clear = document.createElement('div');
        clear.className = 'clearfix';
        $(element).append(clear);
    }
};