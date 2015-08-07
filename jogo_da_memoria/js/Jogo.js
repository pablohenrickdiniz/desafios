function Jogo() {
    var self = this;
    self.dificuldade = 4;
    self.baralho = null;
    self.cartao = null;
    self.ocupado = false;
    self.matriz = new Matriz(self.dificuldade+1,self.dificuldade+1);
    self.audio = new AudioPlayer('#game-audio');
}

Jogo.prototype.selecionarCartao = function (cartao) {

    var self = this;
    if(!self.ocupado){
        self.ocupado = true;
        if (self.cartao == null) {
            self.cartao = cartao;
            cartao.toFront();
            console.log('passo primeira carta');
            setTimeout(function(){
                self.ocupado = false;
            },500);
        }
        else if (cartao != self.cartao){
            cartao.toFront();
            setTimeout(function () {
                if (self.cartao.par == cartao.id || cartao.id == self.cartao.id) {
                    console.log('passo sucesso');
                    self.audio.play('sons/109662__grunz__success.wav');
                    cartao.bloqueado = true;
                    self.cartao.bloqueado = true;
                    self.cartao = null
                    cartao.toFront();
                    setTimeout(function(){
                        cartao.toFront();
                    },250);
                }
                else {
                    console.log('passo falha');
                    self.cartao.toBack();
                    setTimeout(function(){
                        cartao.toBack();
                    },500);
                    self.cartao = null;
                }
            }, 1000);
            setTimeout(function(){
                self.ocupado = false;
            },1000);
        }
        else {
            console.log('passo mesma carta!');
            self.ocupado = false;
        }
    }
};

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
            baralho.jogo  = self;
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
            self.matriz.suffle();
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
        self.matriz.set(position[0],position[1],cartao);
    }
};

Jogo.prototype.getMatrixFreePosition = function () {
    var self = this;
    var index = null;
    self.matriz.forEach(function(cartao,aux){
        if(cartao == undefined){
            index = aux;
            return true;
        }
    });;
    return index;
};

Jogo.prototype.render = function (element, opcoes) {
    $(element).empty();
    var self = this;
    var largura = self.baralho.largura;
    var altura = self.baralho.altura;
    $(element).height((altura*self.matriz.rows)+10);
    $(element).width((largura*self.matriz.cols)+10);

    self.matriz.forEach(function(cartao,index){
        var slot = document.createElement('div');
        slot.className = 'slot';
        $(slot).width(opcoes.largura);
        $(slot).height(opcoes.altura);
        $(slot).css('left',(largura*index[1])+'px');
        $(slot).css('top',(altura*index[0])+'px');
        $(element).append(slot);
        if (cartao != undefined) {
            $(slot).append(cartao.getElemento());
        }
    },function(){
        var clear = document.createElement('div');
        clear.className = 'clearfix';
        $(element).append(clear);
    });
};