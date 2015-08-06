function Cartao(options) {
    var self = this;
    self.id = options.id;
    self.titulo = options.titulo;
    self.image = options.imagem;
    self.fundo = options.fundo;
    self.par = options.par;
    self.matriz = null;
    self.elemento = null;
    self.frontImage = null;
    self.backImage = null;
    self.bloqueado = false;
    self.jogo = options.jogo;
    self.instanceCount = 1;
}

Cartao.prototype.onclick = function() {
    
    var self = this;
    if(!self.bloqueado){
        if(self.jogo != null) {
            self.jogo.selecionarCartao(self);
        }
    }
};


Cartao.prototype.getElemento = function() {
    
    var self = this;
    if(self.elemento == null){
        self.elemento = document.createElement('div');
        $(self.elemento).addClass('cartao back');
        $(self.elemento).click(function(){
            self.onclick();
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
