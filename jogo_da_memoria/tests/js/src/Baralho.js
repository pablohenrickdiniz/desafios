function Baralho(options) {
    var self = this;
    self.titulo = options.titulo;
    self.altura = parseInt(options.altura);
    self.largura = parseInt(options.largura);
    self.cartoes = [];
    self.jogo = options.jogo;
    self.sons = options.sons;
    if (options["cartoes"] instanceof Array) {
        var cartoes = options.cartoes;
        for (var i = 0; i < cartoes.length; i++){
            var cartao = cartoes[i];
            cartao.fundo= options.fundo;
            cartao.somViraCarta = options.sons.viraCarta;
            cartao.color = options.fontColor;
            cartao.instanceCount = 1;
            cartao.virado = false;
            cartao.bloqueado = false;
            self.cartoes.push(cartao);
        }

        var novos = [];

        self.cartoes.forEach(function(cartao,index){
            if(cartao.instanceCount != 2){
                if (cartao.id == cartao.par || cartao.par == undefined) {
                    var aux = _.clone(cartoes[index]);
                    aux.fundo= options.fundo;
                    aux.somViraCarta = options.sons.viraCarta;
                    aux.par = cartao.id;
                    aux.color = options.fontColor;
                    aux.virado = false;
                    aux.bloqueado = false;
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


Baralho.prototype.getMaxDificuldade = function(){
    var self = this;
    var dificuldade_max_baralho = Math.ceil(Math.ceil(Math.sqrt(self.cartoes.length))/2);
    return dificuldade_max_baralho;
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

