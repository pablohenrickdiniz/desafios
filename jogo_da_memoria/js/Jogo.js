function Jogo() {
    var self = this;
    self.dificuldade = 4;
    self.matrizCartao = null;
    self.baralho = null;
}

Jogo.prototype.iniciar = function (element) {
    var self = this;
    var baralho = self.baralho;
    self.render(element, baralho);
};

Jogo.prototype.carregar = function (url, callback) {
    var self = this;
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        success: function (baralho) {
            self.matrizCartao = math.zeros(self.dificuldade + 1, self.dificuldade + 1);
            self.baralho = new Baralho(baralho);
            var max = (self.dificuldade + 1) * (self.dificuldade + 1);
            var count = 0;
            var pares = self.baralho.getPares();
            pares.forEach(function (par) {
                if (count < max - 1) {
                    self.insert(par.cartaoA);
                    self.insert(par.cartaoB);
                    count += 2;
                }
            });
            self.suffleMatrix();
            callback.apply(self);
        },
        error: function () {
            console.error('Verifique se a resposta está no formato json');
        }
    });
};

Jogo.prototype.loadCartoes = function (baralho, jogo) {
    var pares = jogo.pares == undefined ? [] : jogo.pares;
};


Jogo.prototype.insert = function (cartao) {
    var position = this.getMatrixFreePosition();
    var self = this;
    if (position != null) {
        self.matrizCartao = math.subset(self.matrizCartao, math.index(position[0], position[1]), cartao);
    }
};

Jogo.prototype.getMatrixFreePosition = function () {
    var index = null;
    var self = this;

    var rows = self.matrizCartao['_size'][0];
    var cols = self.matrizCartao['_size'][1];

    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var cartao = math.subset(self.matrizCartao, math.index(x, y));
            if (cartao == 0) {
                index = [x, y];
                break;
            }
        }
    }

    return index;
};

Jogo.prototype.suffleMatrix = function () {
    var self = this;
    var rows = self.matrizCartao['_size'][0];
    var cols = self.matrizCartao['_size'][1];


    var matriz = self.matrizCartao;
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var rand_x = parseInt(Math.floor(Math.random() * rows));
            var rand_y = parseInt(Math.floor(Math.random() * cols));
            var cartao = math.subset(matriz, math.index(x, y));
            matriz = math.subset(matriz, math.index(x,y),math.subset(matriz,math.index(rand_x,rand_y)));
            matriz = math.subset(matriz,math.index(rand_x,rand_y),cartao);
        }
    }
    self.matrizCartao = matriz;
};

Jogo.prototype.countCartoes = function () {
    var count = 0;
    var self = this;
    self.matrizCartao.forEach(function (value) {
        if (value != 0) {
            count++;
        }
    });
    return count;
};

Jogo.prototype.render = function (element, opcoes) {
    $(element).empty();
    var self = this;

    var rows = self.matrizCartao['_size'][0];
    var cols = self.matrizCartao['_size'][1];

    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < cols; y++) {
            var slot = document.createElement('div');
            slot.className = 'slot';
            $(slot).width(opcoes.largura);
            $(slot).height(opcoes.altura);
            $(element).append(slot);
            var cartao = math.subset(self.matrizCartao, math.index(x, y));
            if (cartao != null) {
                $(slot).append(cartao.elemento);
            }
        }
        var clear = document.createElement('div');
        clear.className = 'clearfix';
        $(element).append(clear);
    }
};