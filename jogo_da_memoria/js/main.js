$(document).bind('DOMNodeInserted', function(e) {
    var element = e.target;
    var imgs = $(element).find('img.lazy');
    $(imgs).lazyload({
        effect:'fadeIn'
    });
});


$(document).ready(function(){
    var jogo = new Jogo();
    jogo.carregar('baralhos/arte.json',function(){
        this.iniciar("#jogo");
    });
});


