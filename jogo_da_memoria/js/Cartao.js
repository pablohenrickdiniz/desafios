function Cartao(options) {
    var self = this;
    self.id = options["id"];
    self.titulo = options["titulo"];
    self.image = options["imagem"];
    self.par = options["par"];
    self.altura = parseInt(options["altura"]);
    self.largura = parseInt(options["largura"]);
    self.matriz = null;
    self.initialize();
}

Cartao.prototype.initialize = function(){
    var self = this;
    self.elemento = document.createElement('div');
    $(self.elemento).css('background-image', "url('"+self.image+"')");
    $(self.elemento).addClass('cartao');
    $(self.elemento).click(function () {
        self.girar();
    });
    if(_.isNumber(self.largura)){
        $(self.elemento).width(self.largura);
    }
    if(_.isNumber(self.altura)){
        $(self.elemento).height(self.altura);
    }
};

Cartao.prototype.clone = function(){
    var self = this;
    var options = {
        id:self.id,
        titulo:self.titulo,
        imagem:self.image,
        par:self,
        altura:self.altura,
        largura:self.largura
    };

    var cartao = new Cartao(options);
    return cartao;
};

Cartao.prototype.setAltura = function(altura){
    var self = this;
    self.altura = altura;
    $(self.elemento).height(altura);
};

Cartao.prototype.setLargura = function(largura){
    var self = this;
    self.largura = largura;
    $(self.elemento).width(largura);
};

Cartao.prototype.setPar = function (cartao) {
    var self = this;
    self.par = cartao;
};

Cartao.prototype.setParentMatriz = function(matriz){
    this.matriz = matriz;
};

Cartao.prototype.setImage = function (url) {
    var self = this;
    $(self.elemento).css('background-image', 'url(' + url + ')');
};

Cartao.prototype.girar = function () {
    var self = this;
    if ($(self.elemento).hasClass('back')) {
        $(self.elemento).removeClass('back');
    }
    else {
        $(self.elemento).addClass('back');
    }
};
