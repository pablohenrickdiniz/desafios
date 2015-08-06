$(document).ready(function(){
    var jogo = new Jogo();
    jogo.carregar('baralhos/arte.json',function(){
        this.iniciar("#jogo");
    });
});

