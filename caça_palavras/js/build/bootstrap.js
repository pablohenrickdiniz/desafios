requirejs(['../lib/config','js/config'],function(){
    requirejs(['Jogo','react','keys'],function(Jogo,React,Keys){
        var event_controller = {
            jogo:null,
            capture:function(jogo){
                event_controller.jogo = jogo;
            }
        };

        $(document).ready(function(){
            React.render(
                React.createElement(Jogo, {capture: event_controller.capture}),
                document.getElementById('novo-jogo-container')
            );
        });

        $("#novo-jogo").click(function(){
            event_controller.jogo.novoJogo();
        });

        Keys.denyAll();
        Keys.allow(
            Keys.KEY_ESC,
            Keys.KEY_PF5
        );

        $(document).on('keydown',function(e){
            if(e.which == Keys.KEY_ESC){
                event_controller.jogo.refs.tabela.unselectState();
            }
        });

        $(document).on('mousedown',function(e){
            if(e.which == 3){
                event_controller.jogo.refs.tabela.unselectState();
            }
        });


        $(document).on('contextmenu',function(e){
            e.preventDefault();
        });
    });
});