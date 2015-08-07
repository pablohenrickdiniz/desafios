function Cartao(options) {
    var self = this;
    self.elemento = null;
    self.frontImage = null;
    self.backImage = null;
    self.bloqueado = false;
    self.instanceCount = 1;
    self.audio = new AudioPlayer();
    if(options != undefined){
        self.id = options.id;
        self.titulo = options.titulo;
        self.image = options.imagem;
        self.par = options.par;
    }

}

Cartao.prototype.clone = function(){
    var self = this;
    var cartao = new Cartao();
    cartao.id = self.id;
    cartao.titulo = self.titulo;
    cartao.image = self.image;
    cartao.par = self.par;
    cartao.instanceCount = self.instanceCount+1;
    return cartao;
};

Cartao.prototype.onclick = function() {
    var self = this;
    if(!self.bloqueado){
        if(self.jogo != null) {
            self.jogo.selecionarCartao(self);
        }
    }
};

Cartao.prototype.destroy = function(){
    var self = this;
    self.audio.destroy();
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
        $(self.frontImage).attr('data-original',self.image);
        $(self.frontImage).addClass('front-image lazy');
    }
    return self.frontImage;
};

Cartao.prototype.getBackImage = function(){
    
    var self = this;
    if(self.backImage == null){
        self.backImage = document.createElement('img');
        $(self.backImage).attr('data-original',self.fundo);
        $(self.backImage).addClass('back-image lazy');
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
        self.audio.play(self.somViraCarta);
        $(self.getElemento()).addClass('back');
    }
};

Cartao.prototype.toFront = function(){
    
    var self = this;
    if($(self.getElemento()).hasClass('back')){
        self.audio.play(self.somViraCarta);
        $(self.getElemento()).removeClass('back');
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
    self.audio.play(self.somViraCarta);
};
