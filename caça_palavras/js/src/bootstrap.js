requirejs(['../lib/config','js/config'],function(){
    requirejs(['Jogo','react'],function(Jogo,React){
        var event_controller = {
            jogo:null,
            capture:function(jogo){
                event_controller.jogo = jogo;
            }
        };

        $(document).ready(function(){
            React.render(
                <Jogo capture={event_controller.capture}/>,
                document.getElementById('novo-jogo-container')
            );
        });

        $("#novo-jogo").click(function(){
            event_controller.jogo.novoJogo();
        });
    });
});