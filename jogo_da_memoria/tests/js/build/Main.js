$(document).ready(function(){
    _Audio = new AudioPlayer();
    var baralhos = [
        {
            url:'baralhos/animais.json',
            titulo:'Animais e os seus gêneros'
        },
        {
            url:'baralhos/arte.json',
            titulo:'História da Arte'
        },
        {
            url:'baralhos/frutas.json',
            titulo:'Frutas e Legumes'
        }
    ];

/*
    React.render(
        <Jogo dificuldade={2} baralhoUrl="baralhos/frutas.json"/>,
        document.getElementById('jogo-container')
    );*/


    var continuar = function(){
        React.render(
            React.createElement(Jogo, {pausado: false}),
            document.getElementById('jogo-container')
        );
    };

    function pausar(){
        React.render(
            React.createElement(Jogo, {pausado: true}),
            document.getElementById('jogo-container')
        );
    }

    $("#novo-jogo").click(function(){
        pausar();
        React.render(
            React.createElement(NovoJogo, {baralhos: baralhos, open: true, onClose: continuar}),
            document.getElementById('novo-jogo-container')
        );
    });

    $("#opcoes").click(function(){
        pausar();
        React.render(
            React.createElement(Opcoes, {open: true, onClose: continuar}),
            document.getElementById('opcoes-container')
        );
    });


    var instrucoes = "As regras do jogo são as mesmas de um Jogo da Memória tradicional: vire duas cartas por vez, " +
        "e tente encontrar os pares de imagens. O jogo possui no máximo, quatro níveis de dificuldades, " +
        "e para cada um você terá que encontrar pares de um número maior de cartas, a pontuação final é determinada pela quantidade" +
        "de tentativas.";

    $("#instrucoes").click(function(){
        pausar();
        React.render(
            React.createElement(Modal, {title: "Instruções", open: true, footer: false, onClose: continuar}, 
                React.createElement("h4", null, 
                    instrucoes
                )
            ),
            document.getElementById('instrucoes-container')
        );
    });
});

