$(document).ready(function(){
    var baralhos = [
        {
            url:'../baralhos/animais.json',
            titulo:'Animais e os seus gêneros'
        },
        {
            url:'../baralhos/arte.json',
            titulo:'História da Arte'
        },
        {
            url:'../baralhos/frutas.json',
            titulo:'Frutas e Legumes'
        }
    ];


    React.render(
        <Jogo dificuldade={2} baralhoUrl="../baralhos/frutas.json"/>,
        document.getElementById('jogo-container')
    );

    $("#novo-jogo").click(function(){
        React.render(
            <Jogo pausar={true}/>,
            document.getElementById('jogo-container')
        );
        React.render(
            <NovoJogo baralhos={baralhos} open={true} onClose={function(){
                React.render(
                    <Jogo pausar={false}/>,
                    document.getElementById('jogo-container')
                );
            }}/>,
            document.getElementById('novo-jogo-container')
        );
    });

    $("#opcoes").click(function(){
        React.render(
            <Jogo pausar={true}/>,
            document.getElementById('jogo-container')
        );
        React.render(
            <Opcoes open={true} onClose={function(){
                React.render(
                    <Jogo pausar={true}/>,
                    document.getElementById('jogo-container')
                );
            }}/>,
            document.getElementById('opcoes-container')
        );
    });
});
