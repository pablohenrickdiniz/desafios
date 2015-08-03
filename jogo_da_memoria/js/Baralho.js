function Baralho(options) {
    var self = this;
    self.titulo = options["titulo"];
    self.imagem = options["imagem-fundo"];
    self.altura = options["altura"];
    self.largura = options["largura"];
    self.cartoes = {};
    if (options["cartoes"] instanceof Array) {
        var cartoes = options["cartoes"];
        for (var i = 0; i < cartoes.length; i++) {
            var cartao = new Cartao(cartoes[i]);
            cartao.setAltura(self.altura);
            cartao.setLargura(self.largura);
            self.cartoes[cartao.id] = cartao;
        }
    }
    self.carregarPares();
}

Baralho.prototype.carregarPares = function () {
    var self = this;
    Object.forEach(self.cartoes, function (cartao, key) {
        var par = self.getCartaoById(cartao.par);
        if (par != null) {
            cartao.setPar(par);
        }
        else {
            var clone = cartao.clone();
            cartao.setPar(cartao.clone());
        }
    });
};

Baralho.prototype.getCartoes = function () {
    return this.cartoes;
};

Baralho.prototype.getPares = function () {
    var self = this;
    var pares = [];
    var cartoes = _.clone(self.cartoes);
    Object.forEach(cartoes, function (val, key, obj) {
        pares.push({cartaoA: val, cartaoB: val.par});
        delete obj[key];
        delete obj[val.par.id];
    });
    return pares;
};

Baralho.prototype.getCartaoById = function (id) {
    var self = this;
    var cartao = Object.forEach(self.cartoes, function (cartao) {
        if (cartao.id == id) {
            return cartao;
        }
    });
    return cartao;
};