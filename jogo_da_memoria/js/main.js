$(document).ready(function(){
    var jogo = new Jogo();
    jogo.carregar('baralhos/animais.json',function(){
        this.iniciar("#jogo");
    });
});

