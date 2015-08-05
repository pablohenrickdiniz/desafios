function Cartao(options) {
    var self = this;
    self.id = options["id"];
    self.titulo = options["titulo"];
    self.image = options["imagem"];
    self.fundo = options["fundo"];
    self.par = options["par"];
    self.matriz = null;
    self.elemento = null;
    self.frontImage = null;
    self.backImage = null;
    self.bloqueado = false;
    self.baralho = options["baralho"];
}

Cartao.prototype.setBaralho = function(baralho) {
    var self = this;
    self.baralho = baralho;
};

Cartao.prototype.getElemento = function() {
    var self = this;
    if(self.elemento == null){
        var self = this;
        self.elemento = document.createElement('div');
        $(self.elemento).addClass('cartao back');
        $(self.elemento).click(function () {
            if(!self.bloqueado){
                if(self.baralho.jogo != null) {
                    self.baralho.jogo.selecionarCartao(self);
                }
            }
        });
        $(self.elemento).append(self.getFrontImage(),self.getBackImage());
    }
    return self.elemento;
};

Cartao.prototype.getFrontImage = function(){
    var self = this;
    if(self.frontImage == null){
        self.frontImage = document.createElement('img');
        $(self.frontImage).attr('src',self.image);
        $(self.frontImage).addClass('front-image');
    }
    return self.frontImage;
};

Cartao.prototype.getBackImage = function(){
    var self = this;
    if(self.backImage == null){
        self.backImage = document.createElement('img');
        $(self.backImage).attr('src',self.fundo);
        $(self.backImage).addClass('back-image');
    }
    return self.backImage;
};

Cartao.prototype.clone = function(){
    var self = this;
    var options = {
        id:self.id,
        titulo:self.titulo,
        imagem:self.image,
        par:self,
        fundo:self.fundo,
        baralho:self.baralho
    };

    var cartao = new Cartao(options);
    return cartao;
};

Cartao.prototype.setPar = function (cartao) {
    var self = this;
    self.par = cartao;
};

Cartao.prototype.setImage = function (url) {
    var self = this;
    self.image = url;
};

Cartao.prototype.toBack = function(){
    var self = this;
    if(!$(self.getElemento()).hasClass('back')){
        $(self.getElemento()).addClass('back')
    }
};

Cartao.prototype.toFront = function(){
    var self = this;
    if($(self.getElemento()).hasClass('back')){
        $(self.getElemento()).removeClass('back')
    }
};

Cartao.prototype.girar = function () {
    var self = this;
    if ($(self.getElemento()).hasClass('back')) {
        $(self.getElemento()).removeClass('back');
    }
    else {
        $(self.getElemento()).addClass('back');
    }
};
