$(document).bind('DOMNodeInserted', function(e) {
    var element = e.target;
    var imgs = $(element).find('img.lazy');
    $(imgs).lazyload({
        effect:'fadeIn'
    });
});


$(document).ready(function(){
    var jogo = new Jogo();
    jogo.setElement('#jogo');
    jogo.carregar('baralhos/arte.json',function(){
        this.iniciar();
    });

    $('.baralho-link').click(function(){
        var confirm = window.confirm('Tem certeza que deseja iniciar uma nova partida?');
        if(confirm){
            $('#modal-jogo').modal('hide');
            var json = $(this).attr('json');
            jogo.carregar(json,function(){
                this.iniciar('#jogo');
            });
        }
    });
});



