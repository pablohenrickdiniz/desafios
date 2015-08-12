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
        React.createElement(Jogo, {dificuldade: 2, baralhoUrl: "../baralhos/frutas.json"}),
        document.getElementById('jogo-container')
    );

    $("#novo-jogo").click(function(){
        React.render(
            React.createElement(Jogo, {pausar: true}),
            document.getElementById('jogo-container')
        );
        React.render(
            React.createElement(NovoJogo, {baralhos: baralhos, open: true, onClose: function(){
                React.render(
                    React.createElement(Jogo, {pausar: false}),
                    document.getElementById('jogo-container')
                );
            }}),
            document.getElementById('novo-jogo-container')
        );
    });

    $("#opcoes").click(function(){
        React.render(
            React.createElement(Jogo, {pausar: true}),
            document.getElementById('jogo-container')
        );
        React.render(
            React.createElement(Opcoes, {open: true, onClose: function(){
                React.render(
                    React.createElement(Jogo, {pausar: true}),
                    document.getElementById('jogo-container')
                );
            }}),
            document.getElementById('opcoes-container')
        );
    });
});
