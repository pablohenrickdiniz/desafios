function Jogo() {
    var self = this;
    self.dificuldade = 4;
    self.matrizCartao = null;
    self.baralho = null;
}

Jogo.prototype.iniciar = function (element) {
    var self = this;
    var baralho = self.baralho;
    self.matrizCartao.render(element,{altura:baralho.altura,largura:baralho.largura});
};

Jogo.prototype.carregar = function (url, callback) {
    var self = this;
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        success: function (baralho) {
            self.matrizCartao = new MatrizCartao(self.dificuldade + 1, self.dificuldade +1 );
            self.baralho = new Baralho(baralho);
            var max = (self.dificuldade+1) * (self.dificuldade + 1);
            var count = 0;
            var pares = self.baralho.getPares();
            pares.forEach(function(par){
                if(count < max-1){
                    self.matrizCartao.add(par.cartaoA);
                    self.matrizCartao.add(par.cartaoB);
                    count+=2;
                }
            });
            //self.matrizCartao.suffle();
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
