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
                this.iniciar();
            });
        }
    });

    $('#opcoes,#modal-jogo').on('shown.bs.modal', function (e) {
        jogo.pausar();
    });

    $('#opcoes,#modal-jogo').on('hidden.bs.modal', function (e) {
        jogo.continuar();
    });

    $(document).on('contextmenu',function(e){
        //e.preventDefault();
    });

    Keys.allowOnly([KEY_PF5])

    $('#confirmar-opcao').click(function(){
        var dificuldade = $('input[name=dificuldade]:checked').val();
        dificuldade = parseInt(dificuldade);
        console.log(dificuldade);
        console.log(jogo.dificuldade);
        if(jogo.dificuldade != dificuldade){
            jogo.dificuldade = dificuldade;
            var confirm = window.confirm('Deseja abandonar a partida atual?');
            if(confirm){
                jogo.iniciar();
            }
        }
        $("#opcoes").modal('hide');
    });

    $('#confirmar-jogo').click(function(){
        $('#completo').modal('hide');
    });

    $('#completo').on('hidden.bs.modal',function(e){
        jogo.reiniciarJogo();
    });
});




