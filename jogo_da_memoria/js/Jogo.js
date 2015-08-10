function Jogo() {
    var self = this;
    self.dificuldade = 2;
    self.audio = new AudioPlayer();
    self.baralho = null;
    self.element = null;
}

Jogo.prototype.initialize = function () {
    console.log('jogo initialize...');
    var self = this;
    self.cartao = null;
    self.ocupado = false;
    self.inicio = null;
    self.tempo = null;
    self.matriz = null;
    self.pausado = false;
    self.somViraCarta = null;
    if (self.baralho != null) {
        self.baralho.initialize();
    }
};

Jogo.prototype.setElement = function (element) {
    this.element = element;
};

Jogo.prototype.selecionarCartao = function (cartao) {
    var self = this;
    if (!self.ocupado) {
        self.ocupado = true;
        if (self.cartao == null) {
            self.cartao = cartao;
            cartao.toFront();
            console.log('passo primeira carta');
            setTimeout(function () {
                self.ocupado = false;
            }, 500);
        }
        else if (cartao != self.cartao) {
            cartao.toFront();
            setTimeout(function () {
                if (self.cartao.par == cartao.id || cartao.id == self.cartao.id) {
                    console.log('passo sucesso');
                    self.audio.play(self.baralho.sons.parEncontrado);
                    cartao.bloqueado = true;
                    self.cartao.bloqueado = true;
                    self.cartao = null;
                    cartao.toFront();
                    if (self.isCompleto()) {
                        self.pausar();
                        setTimeout(function () {
                            $('#completo').modal();
                        }, 1000);
                    }
                }
                else {
                    console.log('passo falha');
                    self.cartao.toBack();
                    setTimeout(function () {
                        cartao.toBack();
                    }, 200);
                    self.cartao = null;
                }
            }, 1000);
            setTimeout(function () {
                self.ocupado = false;
            }, 1000);
        }
        else {
            console.log('passo mesma carta!');
            self.ocupado = false;
        }
    }
};

Jogo.prototype.reiniciarJogo = function () {
    var self = this;
    self.cartao = null;
    self.ocupado = false;
    self.inicio = null;
    self.tempo = null;
    self.pausado = true;
    var count = 1;
    self.matriz.forEach(function (cartao, index) {
        if(cartao instanceof  Cartao){
            cartao.bloqueado = false;
            setTimeout(function () {
                cartao.toBack();
            }, 100 * count);
        }
        count++;
    });
    count+=10;
    setTimeout(function(){
        self.suffleAux();
    },count*100);

};


Jogo.prototype.suffleAux = function (i, j) {
    i = i == undefined ? 0 : i;
    j = j == undefined ? 0 : j;
    var self = this;
    if (j == self.matriz.cols) {
        j = 0;
        i++;
    }
    console.log(i,j);
    if (i < self.matriz.rows) {
        var rand_i = Math.floor(Math.random() * self.matriz.rows);
        var rand_j = Math.floor(Math.random() * self.matriz.cols);
        var cartaoA = self.matriz.get(rand_i, rand_j);
        var cartaoB = self.matriz.get(i, j);
        if (cartaoA instanceof Cartao && cartaoB instanceof Cartao) {
            var left_a = $(cartaoA.slot).position().left;
            var top_a = $(cartaoA.slot).position().top;
            var left_b = $(cartaoB.slot).position().left;
            var top_b = $(cartaoB.slot).position().top;

            $(cartaoA.slot).animate({
                left: left_b,
                top: top_b
            },200);

            $(cartaoB.slot).animate({
                left: left_a,
                top: top_a
            },200,function(){
                self.suffleAux(i,j+1);
            });
        }
        else{
            self.suffleAux(i,j+1);
        }
    }
    else{
        self.continuar();
    }
};


Jogo.prototype.isCompleto = function () {
    var self = this;
    for (var i = 0; i < self.matriz.rows; i++) {
        for (var j = 0; j < self.matriz.cols; j++) {
            var cartao = self.matriz.get(i, j);
            if (cartao instanceof Cartao) {
                if (cartao.isBack()) {
                    return false;
                }
            }
        }
    }
    return true;
};

Jogo.prototype.iniciar = function () {
    var self = this;
    self.initialize();
    self.carregarMatriz();
    self.render(self.element, self.baralho);
    self.inicio = moment();
    self.tempo = moment('0000-01-01 00:00:00');
    self.pausar();
    self.setTempo('00:00:00');
    self.continuar();
};

Jogo.prototype.continuar = function () {
    var self = this;
    if (self.pausado) {
        self.contador = setInterval(function () {
            if(self.tempo == null){
                self.tempo = moment('0000-01-01 00:00:00');
            }
            self.tempo.add(1, 'seconds');
            self.setTempo(self.tempo.format('HH:mm:ss'));
        }, 1000);
        self.pausado = false;
    }
};

Jogo.prototype.pausar = function () {
    var self = this;
    if (!self.pausado) {
        clearInterval(self.contador);
        self.pausado = true;
    }
};

Jogo.prototype.setTempo = function (tempo) {
    $('.tempo').find('i').html(tempo);
};


Jogo.prototype.carregarMatriz = function () {
    var self = this;
    self.matriz = new Matriz(self.dificuldade * 2, self.dificuldade * 2);
    var max = self.dificuldade * 2 * self.dificuldade * 2;
    var count = 0;
    var pares = self.baralho.getPares();
    pares.suffle();
    pares.forEach(function (par) {
        if (count < max - 1) {
            self.insert(par.cartaoA);
            self.insert(par.cartaoB);
            count += 2;
        }
    });
    self.matriz.suffle();
};

Jogo.prototype.carregar = function (url, callback) {
    var self = this;
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        success: function (baralho) {
            baralho.jogo = self;
            self.baralho = new Baralho(baralho);
            callback.apply(self);
        },
        error: function () {
            console.error('Verifique se a resposta está no formato json');
        }
    });
};


Jogo.prototype.insert = function (cartao) {
    var self = this;
    var position = self.getMatrixFreePosition();

    if (position != null) {
        self.matriz.set(position[0], position[1], cartao);
    }
};

Jogo.prototype.getMatrixFreePosition = function () {
    var self = this;
    var index = null;
    self.matriz.forEach(function (cartao, aux) {
        if (cartao == undefined) {
            index = aux;
            return true;
        }
    });
    return index;
};

Jogo.prototype.render = function (element, opcoes) {
    $(element).empty();
    var self = this;
    var largura = self.baralho.largura;
    var altura = self.baralho.altura;
    $(element).height((altura * self.matriz.rows) + 10);
    $(element).width((largura * self.matriz.cols) + 10);

    self.matriz.forEach(function (cartao, index) {
        var slot = document.createElement('div');
        slot.className = 'slot';
        $(slot).width(opcoes.largura);
        $(slot).height(opcoes.altura);
        $(slot).css('left', (largura * index[1]) + 'px');
        $(slot).css('top', (altura * index[0]) + 'px');
        $(element).append(slot);
        if (cartao != undefined) {
            $(slot).append(cartao.getElemento());
            cartao.slot = slot;
        }
    }, function () {
        var clear = document.createElement('div');
        clear.className = 'clearfix';
        $(element).append(clear);
    });
};