function MatrizCartao(rows, cols) {
    var self = this;
    self.matriz = [];
    self.rows = rows;
    self.cols = cols;
}

MatrizCartao.prototype.addSuffle = function (cartao) {
    if (!(cartao instanceof Cartao) && !(cartao instanceof Object)) {
        console.error('cartao deve ser uma instância de Cartao');
    }
    else {
        var self = this;
        var x = Math.floor(Math.random() * self.rows);
        var row = 0;

        var free = false;
        for (row = x; row < self.rows; row++) {
            if (Object.keys(self.get(row)).length < self.cols) {
                free = true;
                x = row;
                break;
            }
        }

        if (!free) {
            for (row = 0; row < x; row++) {
                if (Object.keys(self.get(row)).length < self.cols) {
                    free = true;
                    x = row;
                    break;
                }
            }
        }

        if (free) {
            self.get(x).push(cartao);
            cartao.setParentMatriz(self);
        }
        else {
            console.error('A matriz de cartões não possui espaços!');
        }
    }
};

MatrizCartao.prototype.initialize = function(){
    var self = this;
    for (var x = 0; x < self.rows; x++) {
        self.matriz[x] = [];
        for (var y = 0; y < self.cols; y++) {
            self.matriz[x][y] = null;
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
            if (self.matriz[x][y] == undefined && self.matriz[x][y] != null) {
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


MatrizCartao.prototype.suffle = function () {
    var self = this;
    for (var x = 0; x < self.rows; x++) {
        for (var y = 0; y < self.cols; y++) {
            var index_x = Math.floor(Math.random() * self.rows);
            var index_y = Math.floor(Math.random() * self.cols);
            var tmp = self.get(index_x, index_y);
            self.set(index_x, index_x, self.get(x, y));
            self.set(x, y, tmp);
        }
    }
};

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