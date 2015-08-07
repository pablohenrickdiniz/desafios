function Baralho(options) {
    var self = this;
    self.titulo = options.titulo;
    self.altura = options.altura;
    self.largura = options.largura;
    self.cartoes = [];
    self.jogo = options.jogo;
    self.sons = options.sons;
    if (options["cartoes"] instanceof Array) {
        var cartoes = options.cartoes;
        for (var i = 0; i < cartoes.length; i++) {
            var cartao = new Cartao(cartoes[i]);
            cartao.jogo = self.jogo;
            cartao.fundo= options.fundo;
            cartao.somViraCarta = options.sons.viraCarta;
            self.cartoes.push(cartao);
        }

        var novos = [];

        self.cartoes.forEach(function(cartao,index){
            if(cartao.instanceCount != 2){
                if (cartao.id == cartao.par || cartao.par == undefined) {
                    var aux = new Cartao(cartoes[index]);
                    aux.jogo = self.jogo;
                    aux.fundo= options.fundo;
                    aux.somViraCarta = options.sons.viraCarta;
                    aux.par = cartao.id;
                    aux.instanceCount = 2;
                    novos.push(aux);
                }
                else{
                    var par = self.getCartaoByIdAndInstanceCount(cartao.par,1);
                    par.instanceCount = 2;
                }
            }
        });

        self.cartoes = self.cartoes.concat(novos);
    }
}

Baralho.prototype.getCartoes = function () {
    return this.cartoes;
};

Baralho.prototype.getPares = function () {
    var self = this;
    var pares = [];
    self.cartoes.forEach(function(cartao,index){
        if(cartao.instanceCount == 1){
            var id = cartao.par != undefined?cartao.par:cartao.id;
            var clone = self.getCartaoByIdAndInstanceCount(id,2);
            if(clone != null){
                pares.push({cartaoA:cartao,cartaoB:clone});
            }
        }
    });
    return pares;
};

Baralho.prototype.getCartaoByIdAndInstanceCount = function(id,instanceCount){
    var self = this;
    var size = self.cartoes.length;
    for(var i = 0; i < size;i++){
        var cartao  = self.cartoes[i];
        if(cartao.id == id && cartao.instanceCount == instanceCount){
            return cartao;
        }
    }
    return null;
};

